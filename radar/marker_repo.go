package radar

import (
	"errors"

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

var (
	ErrNotFound    = errors.New("Marker Not Found")
	ErrBadQuadrant = errors.New("Quadrant not valid")
)

type MarkerRepo struct {
	Db *gorm.DB
}

func (r *MarkerRepo) Migrate() error {
	// this shouldn't ever go back to varchar, it should stick after it is made text
	r.Db.AutoMigrate(&Marker{})
	r.Db.Model(&Marker{}).ModifyColumn("body", "text")
	return nil
}

func (r *MarkerRepo) findAllForView(view string) ([]*Marker, error) {
	var markers []*Marker

	switch view {
	case "tr":
		r.Db.Where("Deg > 0 AND Deg <= 90").Find(&markers)
		return markers, nil
	case "tl":
		r.Db.Where("Deg > 90 AND Deg <= 180").Find(&markers)
		return markers, nil
	case "bl":
		r.Db.Where("Deg > 180 AND Deg <= 270").Find(&markers)
		return markers, nil
	case "br":
		r.Db.Where("Deg > 270 AND Deg <= 360").Find(&markers)
		return markers, nil
	}
	return markers, ErrBadQuadrant
}
func (r *MarkerRepo) add(marker *Marker) (*Marker, error) {
	marker.Id = 0
	r.Db.Save(marker)
	return marker, nil
}
func (r *MarkerRepo) get(id int) (*Marker, error) {
	var found Marker
	if r.Db.First(&found, id).RecordNotFound() {
		return nil, ErrNotFound
	}
	return &found, nil
}
func (r *MarkerRepo) save(marker *Marker) (*Marker, error) {
	if _, err := r.get(marker.Id); err != nil {
		return nil, err
	}
	r.Db.Save(marker)
	return marker, nil
}
func (r *MarkerRepo) del(id int) error {
	found, err := r.get(id)
	if err != nil {
		return err
	}
	r.Db.Delete(found)
	return nil
}
