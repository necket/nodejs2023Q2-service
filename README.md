# Home Library Service

## Running application

Prepare:

1. Start docker on your machine.
2. Create `.env` file in root directory based on `.env.example` (you simply can make a copy)

To start app run:

```
make dev
```

To close app (and remove all containers) run:

```
make down
```

**NOTE** If you don't have `make` installed you can use:

- to start app `docker compose up --build`
- to stop app `docker compose down `

## Testing (App should running, you can use separate terminal window for tests)

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
