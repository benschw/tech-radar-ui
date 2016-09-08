

js-clean:
	rm -rf closure
	rm -rf node_modules
	rm -rf bower_components

js-deps:
	mkdir closure
	git clone https://github.com/google/closure-library.git closure/closure-library
	git clone https://github.com/google/closure-compiler.git closure/closure-compiler
	bower install
	npm install

js-build:
	grunt build

go-clean: 
	rm -f tech-radar

go-deps:
	go get -u github.com/jteeuwen/go-bindata/...

go-build:
	go-bindata -o assets.go dist/
	go build


deps: js-deps go-deps

clean: js-clean go-clean

build: js-build go-build


ci: clean deps build

run:
	BIND="0.0.0.0:8000" DB="root:@tcp(localhost:3306)/techradar?charset=utf8&parseTime=True" ./tech-radar-ui migrate
	BIND="0.0.0.0:8000" DB="root:@tcp(localhost:3306)/techradar?charset=utf8&parseTime=True" ./tech-radar-ui
