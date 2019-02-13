# Politico

Politico App helps people to vote for their desired candidate, on a certain political offices belonging to a political party. It help also candidates to express their interest when running a certain political office.

[![Build Status](https://travis-ci.org/ericnyirimana/politico.svg?branch=develop)](https://travis-ci.org/ericnyirimana/politico) [![Maintainability](https://api.codeclimate.com/v1/badges/0d9d661f11192d898ad3/maintainability)](https://codeclimate.com/github/ericnyirimana/politico/maintainability) [![Coverage Status](https://coveralls.io/repos/github/ericnyirimana/politico/badge.svg?branch=ch-add-coverage-163939317)](https://coveralls.io/github/ericnyirimana/politico?branch=ch-add-coverage-163939317)

# API ENDPOINTS

- POST https://eric-politico.herokuapp.com/api/v1/parties this endpoint allow an admin to create a political party
- GET https://eric-politico.herokuapp.com/api/v1/parties this allow to get all political parties
- GET https://eric-politico.herokuapp.com/api/v1/parties/<party-id> this allow to fetch specific political party
- DELETE https://eric-politico.herokuapp.com/api/v1/parties/<party-id> this allow to delete a political party
- PATCH https://eric-politico.herokuapp.com/api/v1/parties/<party-id> this allow to update a political
- POST https://eric-politico.herokuapp.com/api/v1/offices this endpoint allow an admin to create a political offices
- GET https://eric-politico.herokuapp.com/api/v1/offices this allow to get all political offices
- GET https://eric-politico.herokuapp.com/api/v1/offices/<office-id> this allow to fetch specific political offices


# DEPOLOYMENT

- https://ericnyirimana.github.io/politico/ ( UI GH-PAGES )
- https://eric-politico.herokuapp.com/ ( HEROKU ENDPOINT HOST)