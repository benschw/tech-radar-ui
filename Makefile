NAME=ui-demo

LOCAL_DEV_PORT=8000
LOCAL_DEV_IMAGE=bv/js


clean-localdev:
	@ID=$$(docker ps | grep "$(NAME)" | awk '{ print $$1 }') && \
		if test "$$ID" != ""; then docker kill $$ID; fi
	@ID=$$(docker ps -a | grep "$(NAME)" | awk '{ print $$1 }') && \
		if test "$$ID" != ""; then docker rm $$ID; fi

run: clean-localdev docker-build
	docker run -p $(LOCAL_DEV_PORT):80 -v $(CURDIR)/:/var/www/ --name $(NAME) $(LOCAL_DEV_IMAGE) 

docker-build:
	docker build -f docker/Dockerfile -t bv/js ./docker/

deps:
	mkdir closure
	wget http://dl.google.com/closure-compiler/compiler-latest.tar.gz \
		-O closure/compiler.tar.gz
	tar xzf closure/compiler.tar.gz -C closure/
	git clone https://github.com/google/closure-library.git closure/closure-library
	git clone https://github.com/google/closure-compiler.git closure/closure-compiler

