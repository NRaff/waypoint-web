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

# append --name to add migration name
# append --create-only to create the file only for modification
.PHONY migrate-dev: 
migrate-dev:
	dotenv -e .env.local -- npx prisma migrate dev $(FLAGS)

.PHONY prisma-ui:
prisma-ui:
	dotenv -e .env.local -- npx prisma studio

.PHONY prisma-types:
prisma-types:
	npx prisma generate

