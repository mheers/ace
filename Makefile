.PHONY : doc build clean dist

pre_build:
	git rev-parse HEAD > .git-ref
	mkdir -p build/src
	mkdir -p build/demo/kitchen-sink
	mkdir -p build/textarea/src
	
	cp -r demo/kitchen-sink/styles.css build/demo/kitchen-sink/styles.css
	cp demo/kitchen-sink/logo.png build/demo/kitchen-sink/logo.png
	cp -r doc/site/images build/textarea

build: pre_build
	./Makefile.dryice.js full
	cp package.json.build build/package.json
	make build-esm

build-esm:
	yarn build:esm

# Minimal build: call Makefile.dryice.js only if our sources changed
basic: build/src/ace.js

build/src/ace.js : ${wildcard lib/*} \
                   ${wildcard lib/*/*} \
                   ${wildcard lib/*/*/*} \
                   ${wildcard lib/*/*/*/*} \
                   ${wildcard lib/*/*/*/*/*} \
                   ${wildcard lib/*/*/*/*/*/*}
	./Makefile.dryice.js

doc:
	cd doc;\
	(test -d node_modules && npm update) || npm install;\
	node build.js

clean:
	rm -rf build
	rm -rf ace-*
	rm -f ace-*.tgz

ace.tgz: build
	mv build ace-`./version.js`/
	cp Readme.md ace-`./version.js`/
	cp LICENSE ace-`./version.js`/
	tar cvfz ace-`./version.js`.tgz ace-`./version.js`/

dist: clean build ace.tgz
