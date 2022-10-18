.PHONY setup:
setup:
	yarn install

.PHONY watch-dev:
watch-dev:
	npm run dev

.PHONY watch-test:
watch-test:
	npm run test

.PHONY migrate-prod:
migrate-remote:
	npx prisma db push

.PHONY migrate-dev: # append --name to add migration name
migrate-dev:
	dotenv -e .env.local -- npx prisma migrate dev

.PHONY prisma-ui:
prisma-ui:
	dotenv -e .env.local -- npx prisma studio

.PHONY prisma-types:
prisma-types:
	npx prisma generate

