<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

This parser receives the path or url of a EML file (email) and retrieves the json file within it.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Use and API Docs
By default, the api runs on http://localhost:3000.

While running, you can access the documentation in following route http://localhost:3000/api

## Postman Collection
A postman collection is in the root of the proyect as a json file. You can import it in postman to test the api.

## Proyect structure
```
project
│   README.md
│   package.json
│   EmailParser.postman_collection.json
│
└───src
│   │   app.module.ts
│   │   main.ts
│   │
│   └───parser
│   │   │   parser.controller.ts
│   │   │   parser.module.ts
│   │   │   parser.service.ts
│   │   └───dto
│   │   │   │   email.dto.ts
│   │   └───entities
│   │   │   │   attachment.entity.ts
│   │
│   └───utils
│   │   │   email-parser.util.ts
│   │   │   file-service.util.ts
│   │   │   index.ts
```

- parser.controller: exposes the endpoints for the api.

- parser.service: has the logic for each task used by the parser.controller.
- utils: classes with static methods used in different places of the proyect.
- package.json: basic configuration for proyect (node version, nest version, dependencies, scripts for running, etc.)
- EmailParser.postman_collection.json: Postman collection to test the api endpoints.