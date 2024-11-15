lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build