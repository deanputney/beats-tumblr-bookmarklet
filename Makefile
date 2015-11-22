.PHONY: clean build install uninstall

build: 
	./build.py

clean:
	rm bookmarklet-encoded.js
