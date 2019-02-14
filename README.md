# Politico

Politico App helps people to vote for their desired candidate, on a certain political offices belonging to a political party. It help also candidates to express their interest when running a certain political office.

[![Build Status](https://travis-ci.org/ericnyirimana/politico.svg?branch=develop)](https://travis-ci.org/ericnyirimana/politico) [![Maintainability](https://api.codeclimate.com/v1/badges/0d9d661f11192d898ad3/maintainability)](https://codeclimate.com/github/ericnyirimana/politico/maintainability) [![Coverage Status](https://coveralls.io/repos/github/ericnyirimana/politico/badge.svg?branch=ch-add-coverage-163939317)](https://coveralls.io/github/ericnyirimana/politico?branch=ch-add-coverage-163939317)


# Documentation Content

* [UI](#ui)
    * [Tools used](#ui-tools-used)
    * [Product](#ui-product)

* [API](#api)
    * [Tools Used](#api-tools-used)
    * [Endpoints](#endpoints)
    * [Responses](#responses)
    * [Product](#api-product)
* [Getting started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installing](#installing)
    * [Run the server](#run-the-server)
    * [Run the test](#run-the-test)

* [Contributors](#contributors)
* [Copyright](#copyright)

## UI

This section provides guidelines on Politico UI, the tools used for building it and also the final presentation of the product.


### UI Tools used

    HTML
    CSS
    Javascript

### UI Product
[Politico App UI](https://ericnyirimana.github.io/politico/)


## API

This section provides guidelines and enpoints for Politico APIs, that are used for sending and receiving information used in and by the Politico.


### API Tools used

#### Language

```
Javascript
```

#### Server Environment

```
 NodeJS (Run-time environment for running JS codes)
 ```

#### Framework

```
 Express
 ```

#### Testing Framework

```
 Mocha, Chai
 ```

#### Style Guide

```
Airbnb
```

#### Continuous Integration

```
Travis CI
```

#### Maintainability

```
Code Climate
```

#### Test Coverage

```
nyc
```

#### Deployment

```
Heroku
```

### Endpoints

| Enpoint | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index |
| /api/v1/parties | POST | Create a political party |
| /api/v1/parties | GET | Get political parties |
| /api/v1/parties/<party-id> | GET | Get specific party |
| /api/v1/parties/<party-id> | DELETE | Delete a party |
| /api/v1/parties/<party-id> | PATCH | Update a party |
| /api/v1/offices | POST | Create a political office |
| /api/v1/offices | GET | Get all offices |
| /api/v1/offices/<office-id> | GET | Get a specific office |

### Responses

#### On success

>{ "status": 200, "data": [ { ... }] }
​
#### On error

>{ "status": 400, "error": "relevant-error-message" }
​

The status codes above are provided as samples, and by no way specify that all success
reponses should have ​ 200​​ or all error responses should have ​ 400.

### API Product

[Politico API (Hosted on Heroku)](https://eric-politico.herokuapp.com)

## Getting started

These instructions will get you a copy of the project up and running on your local machine or server for development and testing purposes. Here are deployment notes on how to deploy the project on a live system.


### Prerequisites

To install the software on your local machine or server, you need first to clone the repository or download the zip file and once this is set up you are going to need to install NodeJS.


### Installing

The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

#### Run the server

```
> npm start
```

#### Run the test

```
> npm test
```

## Contributors

- NYIRIMANA Eric


## Copyright

&copy; NYIRIMANA Eric, Developer
