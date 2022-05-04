test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

lint:
	npx eslint .

gendiff:
	node ./bin/gendiff.js

install:
	npm ci