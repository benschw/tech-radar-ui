package radar

import "net/http"

type AssetResource struct {
	js  []byte
	css []byte
}

func (r *AssetResource) GetJs(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/javascript")
	res.Write(r.js)
}
func (r *AssetResource) GetCss(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "text/css")
	res.Write(r.css)
}
