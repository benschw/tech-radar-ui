package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/benschw/opin-go/rest"
)

type MarkerResource struct {
	repo *MarkerRepo
}

func (r *MarkerResource) addMarker(res http.ResponseWriter, req *http.Request) {
	var marker Marker
	if err := rest.Bind(req, &marker); err != nil {
		log.Print(err)
		rest.SetBadRequestResponse(res)
		return
	}

	id, err := r.repo.add(&marker)
	if err != nil {
		log.Print(err)
		rest.SetBadRequestResponse(res)
		return
	}

	if err := rest.SetCreatedResponse(res, marker, fmt.Sprintf("api/marker/%d", id)); err != nil {
		rest.SetInternalServerErrorResponse(res, err)
		return
	}
}

func (r *MarkerResource) findAllMarkers(res http.ResponseWriter, req *http.Request) {
	view := req.FormValue("view")

	markers, err := r.repo.findAllForView(view)
	if err != nil {
		log.Print(err)
		rest.SetBadRequestResponse(res)
		return
	}

	if err := rest.SetOKResponse(res, markers); err != nil {
		rest.SetInternalServerErrorResponse(res, err)
		return
	}
}
func (r *MarkerResource) getMarker(res http.ResponseWriter, req *http.Request) {
	id, err := rest.PathInt(req, "id")
	if err != nil {
		log.Print(err)
		rest.SetBadRequestResponse(res)
		return
	}
	marker, err := r.repo.get(id)
	if err != nil {
		log.Print(err)
		rest.SetBadRequestResponse(res)
		return
	}

	if err := rest.SetOKResponse(res, marker); err != nil {
		rest.SetInternalServerErrorResponse(res, err)
		return
	}
}
func (r *MarkerResource) saveMarker(res http.ResponseWriter, req *http.Request) {
	id, err := rest.PathInt(req, "id")
	if err != nil {
		log.Print(err)
		rest.SetBadRequestResponse(res)
		return
	}

	var marker Marker
	if err := rest.Bind(req, &marker); err != nil {
		log.Print(err)
		rest.SetBadRequestResponse(res)
		return
	}
	marker.Id = id

	if err := r.repo.save(&marker); err != nil {
		log.Print(err)
		rest.SetBadRequestResponse(res)
		return
	}
	if err := rest.SetOKResponse(res, marker); err != nil {
		rest.SetInternalServerErrorResponse(res, err)
		return
	}
}
func (r *MarkerResource) deleteMarker(res http.ResponseWriter, req *http.Request) {
	id, err := rest.PathInt(req, "id")
	if err != nil {
		log.Print(err)
		rest.SetBadRequestResponse(res)
		return
	}
	if err := r.repo.del(id); err != nil {
		log.Print(err)
		rest.SetBadRequestResponse(res)
		return
	}
	if err := rest.SetNoContentResponse(res); err != nil {
		rest.SetInternalServerErrorResponse(res, err)
		return
	}
}
