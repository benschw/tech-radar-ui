VERSION=$(shell git describe --tags)


clean:
	rm -rf closure
	rm -rf node_modules
	rm -rf bower_components
	rm -rf build

deps:
	mkdir closure
	git clone https://github.com/google/closure-library.git closure/closure-library
	git clone https://github.com/google/closure-compiler.git closure/closure-compiler
	bower install
	npm install

build:
	grunt build

package:
	mkdir -p build/pkg/latest build/pkg/release
	tar czf build/tech-radar-ui.tar.gz dist
	cp build/tech-radar-ui.tar.gz build/pkg/latest/tech-radar-ui_latest.tar.gz
	cp build/tech-radar-ui.tar.gz build/pkg/release/tech-radar-ui_$(VERSION).tar.gz



.PHONY: build
