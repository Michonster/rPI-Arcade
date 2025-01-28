start-controller-monitor:
	@echo "Starting controller monitor server..."
	python3 backend/controller_monitor.py 

start-usb-monitor:
	@echo "Starting USB monitor server..."
	python3 backend/USB_monitor.py 

start-backend: 
	make -j 2 start-controller-monitor start-usb-monitor

start-frontend:
	@echo "Starting frontend..."
	cd frontend && npm run dev

start: start-controller-monitor start-usb-monitor start-frontend
