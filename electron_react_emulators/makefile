start-backend:
	@echo "Starting Python servers..."
	python3 backend/controller_monitor.py & python3 backend/USB_monitor.py &

start-frontend:
	@echo "Starting frontend..."
	cd frontend && npm run dev

start: start-backend start-frontend