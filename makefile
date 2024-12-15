# Variables

Bold := \033[1m
Green := \033[32m
Reset := \033[0m

# Targets

help:
	@echo "\nAvailable Commands:"
	@echo ""
	@echo "  $(Bold)$(Green)install$(Reset)    install dependencies."
	@echo ""

install:
	npm install --save-exact
