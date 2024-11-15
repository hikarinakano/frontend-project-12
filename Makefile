lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

deploy:
	git push heroku main

start:
	make start-frontend & make start-backend

build:
	rm -rf frontend/build
	npm run build