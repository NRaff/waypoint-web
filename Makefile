.PHONY setup:
setup:
	yarn install

.PHONY watch-dev:
watch-dev:
	npm run dev

.PHONY watch-test:
watch-test:
	npm run test