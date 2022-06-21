# serverless-node-template
Template to build customizable, flexible and well documented APIs with Node.js and Express.

[//]: # ([![linting: pylint]&#40;https://img.shields.io/badge/linting-pylint-yellowgreen&#41;]&#40;https://github.com/PyCQA/pylint&#41;)

[//]: # ([![PEP8]&#40;https://img.shields.io/badge/code%20style-pep8-orange.svg&#41;]&#40;https://www.python.org/dev/peps/pep-0008/&#41;)

[//]: # ([![Quality Gate Status]&#40;#&#41;)

[//]: # ([![Coverage]&#40;#&#41;)

[//]: # ([![Reliability Rating]&#40;#&#41;)

## Service Architecture
Diagrams of the project architecture and others.

More details [here](#).

### Cloud Architecture
Example of the architecture that runs on AWS Cloud.

[//]: # (![Service-Arch]&#40;docs/ecs-service-arch.png&#41;)

### Docker Architecture
Example of the architecture that runs with docker.

[//]: # (![Docker-Service-Arch]&#40;docs/ecs-docker-service-arch.png&#41;)

## Routes of the service

Lista od routes:
```
GET / - Root
GET /docs - Swagger docs
GET /alive - Health Check
GET /v1/product - Product List
POST /v1/product - Product Create
DELETE /v1/product/<uuid> - Soft Product Delete
GET /v1/product/<uuid> - Product Get
PATCH /v1/product/<uuid> - Soft Product Update
PUT /v1/product/<uuid> - Complete Product Update
```

# Prerequisites
- docker
- docker-compose
- node
- express
- typescript
- jest
- mocks
- yarn

## Features
- Projects Guidelines (Best practices)
- Docker Management (Docker-Compose)
- Localstack
- MySQL
- Redis
- OpenApi (Swagger)
- GitHub Actions
- Tests (Unit, Component, and Integration)
- Coverage Reports
- Code formatter (Prettier)
- Lint (ESlint)
- Standard commits (Commitizen)
- Standard files setup (Editorconfig)
- REST (RESTful & HATEOS)
- CodeQuality (Sonar)
- Database Migrations (Sequelize)

## Kong configuration
Configure Kong API Gateway to work with API Gateway compatibility.

## Installation
### Installing AWS CLI
Docs:
https://docs.aws.amazon.com/en/cli/latest/userguide/install-cliv2.html

Execute the follow command:
```bash
apt install awscli
```
Execute the follow command:
```bash
aws configure
```

### Creating the Docker network
Execute the follow command:
```bash
./scripts/docker/create-network.sh
```

### Running locally
To install the modules, execute the follow command:
```bash
yarn install
```
#### Executing only the HTTP framework
Execute the follow command:
```bash
yarn run start:dev
```
### Executing by Docker
To build execute the follow command:
```bash
./scripts/runenv.sh --build
```

Execute the follow command:
```bash
./scripts/runenv.sh
```

### Recovering the environment in error cases
Execute the follow command:
```bash
./scripts/fixenv.sh
```

## Information about automation scripts
The following describes the use of automation scripts.
These kebab case scripts help the developer in general tasks.

### General scripts
Kebab case scripts to help the developer with general tasks.

### General scripts
Kebab case scripts to help the developer with general tasks.

| Script                      | Description                                                                          | Context           |
|-----------------------------|--------------------------------------------------------------------------------------|-------------------|
| boot.sh                     | Starts the application while the container is running                                | Local boot        |
| boot-db.sh                  | Starts data to database                                                              | Local boot        |
| boot-queues.sh              | Start application queues in localstack                                               | Local boot        |
| boot-validate-connection.sh | Check if localstack is ready to connect                                              | Local boot        |
| commit.sh                   | Run the communitarization tool to commit the message                                 | Local development |
| fixenv.sh                   | In some cases where the network is deleted, you can correct the container references | Local install     |
| pre-commit-config.sh        | Script to prepare the local environment to run pre-commit tools                      | Local development |
| preenv.sh                   | Script to run pre-build commands                                                     | Local boot        |
| runenv.sh                   | Script to start the project locally                                                  | Local development |
| testenv.sh                  | Script to run the environment focusing on component tests                            | Local development |

### Docker scripts
Scripts that facilitate tasks for docker context;
### Localstack scripts
Scripts that help execute commands on Localstack resources such as S3, SQS, Lambda, etc.
## Samples
See the project samples in this folder [here](samples).

## Running tests
To run the unit tests for the project, you can run the following command:

[//]: # (First you need to install the testing requirements:)

[//]: # ( ```bash)

[//]: # ( yarn run test)

[//]: # ( ```)

### Unitary tests:
Running the tests:
 ```bash
yarn run test
 ```

[//]: # (Running a specific file:)

[//]: # ( ```bash)

[//]: # (yarn run test)

[//]: # ( ```)

### Component tests:
Start the docker containers:
 ```bash
./scripts/testenv.sh
```

Running the tests:
 ```bash
yarn run test:component
```

[//]: # (Running a specific file:)

[//]: # ( ```bash)

[//]: # (yarn run test:component)

[//]: # ( ```)
### Integration tests:
Copy the `env/integration.env.example` file to
`env/integration.env` and edit with the staging parameters.

Running the tests:
 ```bash
yarn run test:integration
```

[//]: # (Running a specific file:)

[//]: # (```bash)

[//]: # (yarn run test:integration)

[//]: # (```)

### End-2-End tests:
Running the tests:
```bash
yarn run test:e2e
 ```

### All tests:
Running the tests:
```bash
yarn run test:all
 ```

## Generating coverage reports
To run the coverage tests, you can run the following commands:

### Unit Test Coverage:
Run the follow command:
```bash
yarn run test:cov
```

### Component Test Coverage:
Start the docker containers:
```bash
./scripts/testenv.sh
```

Run the follow command:
```bash
yarn run test:component-cov
```

### Integration test coverage:

Copy the `env/integration.env.example` file to
`env/integration.env` and edit with the staging parameters.

Run the follow command:
```bash
yarn run test:integration-cov
```
> Note: The result can be found in the `target/*` folder.

## License
See the license: [LICENSE.md](LICENSE.md).

## Contribution
* Anderson de Oliveira Contreira [andersoncontreira](https://github.com/andersoncontreira)

## Lint
To run the lint in the project's source code, run the following command:
```bash
yarn run lint
```

[//]: # (Or:)

[//]: # ()
[//]: # (```bash)

[//]: # (yarn run lint)

[//]: # (```)

## Code Format
To run the code formation  on the project's source code, run the following command:
```bash
yarn run format
```

[//]: # (Or:)

[//]: # ()
[//]: # (```bash)

[//]: # (yarn run format)

[//]: # (```)

## Pre-commit
To install pre-commit execute the follow command:
```bash
./scripts/pre-commit-config.sh
```

## Build
To execute the build of the project execute the follow command:
```bash
yarn run build
```
## Guidelines
To execute the guidelines validation of the project execute the follow command:
```bash
./scripts/guidelines-checker.py
```
