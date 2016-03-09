

js-clean:
	rm -rf closure
	rm -rf node_modules
	rm -rf bower_components

js-deps:
	mkdir closure
	wget http://dl.google.com/closure-compiler/compiler-latest.tar.gz \
		-O closure/compiler.tar.gz
	tar xzf closure/compiler.tar.gz -C closure/
	git clone https://github.com/google/closure-library.git closure/closure-library
	git clone https://github.com/google/closure-compiler.git closure/closure-compiler
	bower install
	npm install

js-build:
	grunt build

go-clean: 
	rm ui-widget

go-deps:
	go get
	go get -u github.com/jteeuwen/go-bindata/...

go-build:
	go-bindata -o assets.go dist/
	go build


deps: js-deps go-deps

clean: js-clean go-clean

build: js-build go-build


ci: clean deps build
