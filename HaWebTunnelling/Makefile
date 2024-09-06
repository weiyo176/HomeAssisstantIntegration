SVC_DIR = $(HOME)/.config/systemd/user
SVC_FILE = homeassistant-tunnel.service

.PHONY: all
all: install start

.PHONY: init
init:
	@echo "Creating service directory: $(SVC_DIR)"
	@mkdir -p $(SVC_DIR)

.PHONY: install
install: init
	@echo "Installing service file: $(SVC_FILE)"
	@ln -sf $(PWD)/$(SVC_FILE) $(SVC_DIR)/$(SVC_FILE)
	@systemctl --user daemon-reload
	@systemctl --user enable $(SVC_FILE)

.PHONY: start
start:
	@echo "Starting service: $(SVC_FILE)"
	@systemctl --user start $(SVC_FILE)

.PHONY: restart
restart:
	@echo "Restarting service: $(SVC_FILE)"
	@systemctl --user restart $(SVC_FILE)

.PHONY: stop
stop:
	@echo "Stopping service: $(SVC_FILE)"
	@systemctl --user stop $(SVC_FILE)

.PHONY: clean
clean:
	@echo "Removing service file: $(SVC_FILE)"
	@systemctl --user stop $(SVC_FILE) || true
	@systemctl --user disable $(SVC_FILE) || true
	@rm -f $(SVC_DIR)/$(SVC_FILE)
	@systemctl --user daemon-reload
