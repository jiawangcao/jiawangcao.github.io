.PHONY: help dev build clean install

help:
	@echo "Available commands:"
	@echo "  make dev      - Install dependencies and start development server"
	@echo "  make build    - Build for production"
	@echo "  make clean    - Remove node_modules and build artifacts"
	@echo "  make install  - Install dependencies only"

dev: install
	npm run dev

build: install
	npm run build

install:
	npm install

clean:
	rm -rf node_modules dist
