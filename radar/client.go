package radar

import (
	"fmt"
	"net/http"

	"github.com/benschw/opin-go/rest"
)

func NewClient(host string) *Client {
	return &Client{Host: host}
}

type Client struct {
	Host string
}

func (c *Client) Add(marker *Marker) (Marker, error) {
	var respMarker Marker
	url := fmt.Sprintf("%s/api/marker", c.Host)

	r, err := rest.MakeRequest("POST", url, marker)
	if err != nil {
		return respMarker, err
	}

	err = rest.ProcessResponseEntity(r, &respMarker, http.StatusCreated)
	return respMarker, err
}

func (c *Client) Find(id int) (Marker, error) {
	var respMarker Marker
	url := fmt.Sprintf("%s/api/marker/%d", c.Host, id)

	r, err := rest.MakeRequest("GET", url, nil)
	if err != nil {
		return respMarker, err
	}

	err = rest.ProcessResponseEntity(r, &respMarker, http.StatusOK)
	return respMarker, err

}

func (c *Client) FindAllForQuadrant(view string) ([]Marker, error) {
	var respMarkers []Marker
	url := fmt.Sprintf("%s/api/marker?view=%s", c.Host, view)

	r, err := rest.MakeRequest("GET", url, nil)
	if err != nil {
		return respMarkers, err
	}
	err = rest.ProcessResponseEntity(r, &respMarkers, http.StatusOK)
	return respMarkers, err
}

func (c *Client) Save(marker *Marker) (Marker, error) {
	var respMarker Marker
	url := fmt.Sprintf("%s/api/marker/%d", c.Host, marker.Id)

	r, err := rest.MakeRequest("PUT", url, marker)
	if err != nil {
		return respMarker, err
	}
	err = rest.ProcessResponseEntity(r, &respMarker, http.StatusOK)
	return respMarker, err
}

func (c *Client) Delete(id int) error {
	url := fmt.Sprintf("%s/api/marker/%d", c.Host, id)

	r, err := rest.MakeRequest("DELETE", url, nil)
	if err != nil {
		return err
	}

	return rest.ProcessResponseEntity(r, nil, http.StatusNoContent)
}
