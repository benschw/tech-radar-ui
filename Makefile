all: clean deps build

clean:
	rm -rf closure
	rm -rf node_modules
	rm -rf bower_components

deps:
	mkdir closure
	git clone https://github.com/google/closure-library.git closure/closure-library
	git clone https://github.com/google/closure-compiler.git closure/closure-compiler
	bower install
	npm install

build:
	grunt build


.PHONY: build
