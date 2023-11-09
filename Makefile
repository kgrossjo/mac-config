.PHONY: karabiner

all: karabiner

karabiner:
	cd karabiner-elements && ./config.sh && ./install.sh
