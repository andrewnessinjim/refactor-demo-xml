# Makefile for automating local development environment with ephemeral Docker setup

.PHONY: up frontend backend start stop clean

# Start the entire development environment
start: clean up

clean:
	docker compose down -v --remove-orphans

# Start Docker services
up:
	docker compose up -d

frontend:
	cd frontend && npm run dev

backend:
	cd backend && npm start
