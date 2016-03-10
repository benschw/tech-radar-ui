package main

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type Marker struct {
	Id      int    `json:"id"`
	Title   string `json:"title"`
	Summary string `json:"summary"`
	Body    string `json:"body"`
	Deg     int    `json:"deg"`
	Mag     int    `json:"mag"`
	New     bool   `json:"new"`
}

type MarkerRepo struct {
	Db      gorm.DB
	markers []*Marker
}

func (r *MarkerRepo) findAllForView(view string) ([]*Marker, error) {

	return r.markers, nil
}
func (r *MarkerRepo) add(marker *Marker) (int, error) {
	marker.Id = len(r.markers)
	r.markers = append(r.markers, marker)
	return marker.Id, nil
}
func (r *MarkerRepo) get(id int) (*Marker, error) {
	for _, m := range r.markers {
		if m.Id == id {
			return m, nil
		}
	}
	return nil, fmt.Errorf("Not Found")
}
func (r *MarkerRepo) save(marker *Marker) error {
	for i, m := range r.markers {
		if m.Id == marker.Id {
			r.markers[i] = marker
			return nil
		}
	}
	return fmt.Errorf("Not Found")
}
func (r *MarkerRepo) del(id int) error {
	n := []*Marker{}
	for _, m := range r.markers {
		if m.Id != id {
			n = append(n, m)
		}
	}
	r.markers = n
	return nil
}
