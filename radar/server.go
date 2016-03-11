package radar

import (
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/rs/cors"
)

func NewServer(dbStr string, bind string, js []byte, css []byte) (*Server, error) {

	db, err := gorm.Open("mysql", dbStr)
	if err != nil {
		return nil, err
	}
	db.SingularTable(true)

	repo := &MarkerRepo{db}

	return &Server{
		bind:     bind,
		assets:   &AssetResource{js: js, css: css},
		resource: &MarkerResource{repo},
		repo:     repo,
	}, nil
}

type Server struct {
	bind     string
	assets   *AssetResource
	resource *MarkerResource
	repo     *MarkerRepo
}

func (s *Server) Migrate() error {
	return s.repo.Migrate()
}
func (s *Server) Run() {
	r := mux.NewRouter()

	r.HandleFunc("/api/marker", s.resource.addMarker).Methods("POST")
	r.HandleFunc("/api/marker", s.resource.findAllMarkers).Methods("GET")
	r.HandleFunc("/api/marker/{id}", s.resource.getMarker).Methods("GET")
	r.HandleFunc("/api/marker/{id}", s.resource.saveMarker).Methods("PUT")
	r.HandleFunc("/api/marker/{id}", s.resource.deleteMarker).Methods("DELETE")

	r.HandleFunc("/assets/app.js", s.assets.GetJs).Methods("GET")
	r.HandleFunc("/assets/style.css", s.assets.GetCss).Methods("GET")

	http.Handle("/", r)

	serveMux := http.NewServeMux()
	serveMux.Handle("/", r)
	handler := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "DELETE", "PUT"},
	}).Handler(serveMux)

	loggedRouter := handlers.LoggingHandler(os.Stdout, handler)
	http.ListenAndServe(s.bind, loggedRouter)

}
