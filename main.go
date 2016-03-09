package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func GetJavascript(res http.ResponseWriter, req *http.Request) {
	data, err := Asset("dist/app.js")
	if err != nil {
		panic(err)
	}
	res.Header().Set("Content-Type", "application/javascript")
	res.Write(data)
}
func GetCss(res http.ResponseWriter, req *http.Request) {
	data, err := Asset("dist/style.css")
	if err != nil {
		panic(err)
	}
	res.Header().Set("Content-Type", "text/css")
	res.Write(data)
}

func main() {
	m := []*Marker{}
	for i := 0; i < 5; i++ {
		m = append(m, &Marker{Id: i, Title: fmt.Sprintf("New %d", i), Deg: rand.Intn(90), Mag: rand.Intn(100)})
	}
	resource := &MarkerResource{&MarkerRepo{m}}

	r := mux.NewRouter()

	r.HandleFunc("/api/marker", resource.addMarker).Methods("POST")
	r.HandleFunc("/api/marker", resource.findAllMarkers).Methods("GET")
	r.HandleFunc("/api/marker/{id}", resource.getMarker).Methods("GET")
	r.HandleFunc("/api/marker/{id}", resource.saveMarker).Methods("PUT")
	r.HandleFunc("/api/marker/{id}", resource.deleteMarker).Methods("DELETE")

	r.HandleFunc("/assets/app.js", GetJavascript).Methods("GET")
	r.HandleFunc("/assets/style.css", GetCss).Methods("GET")

	http.Handle("/", r)

	serveMux := http.NewServeMux()
	serveMux.Handle("/", r)
	handler := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "DELETE", "PUT"},
	}).Handler(serveMux)

	loggedRouter := handlers.LoggingHandler(os.Stdout, handler)
	http.ListenAndServe(":8000", loggedRouter)
}
