# Locations
A fun project that let's you query for some neigborhoods' data, or lookup neigborhood with a distance from an address using [PositionStack's API](https://positionstack.com/ "positionstack's Homepage").

## Installing and Running
Open a terminal at the project's root directory and run
```sh
npm install && npm start
```

Once your server is up and running, it should be accepting requests at http://127.0.0.1:3000

## Endpoints
The server exposes two endpoints.

### within
The within endpoint takes an address and a distance, and returns a list of neigborhoods within the distance to the address.

The within query has the following form:
```
address=<ADDR>&distance=<DISTANCE>
```

For example, for a list of neigborhoods with a distance of `1` from `1600 Pennsylvania Ave NW, Washington DC`, you can use

```sh
curl 'http://127.0.0.1:3000/within?address=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC&distance=1'
```

### neigborhoods
The neigborhoods endpoint return a list of neigborhoods that match given filters, by a given order up to a limited amount of neigborhoods.

```sh
curl 'http://127.0.0.1:3000/neigborhoods?filter\[averageAge,gt\]=20&filter\[averageIncome,lt\]=100000&sort=publicTransportAvailability.asc,averageIncome.desc&limit=10'
```

#### filter
Each filter is a query of the following form:
```
filter[<ATTR>,<OP>]=<VALUE>
```
* You may add several filter queries.

* Accepted operations:    `eq, ne, gt, lt, gte, lte`

* Accepted attributes:    `neigborhood, state, city, averageAge, distanceFromCityCenter, averageIncome, publicTransportAvailability, latitude, longitude`

For example, for a list of neigborhoods with high public transport availability, you can use
```sh
curl 'http://127.0.0.1:3000/neigborhoods?filter\[publicTransportAvailability,eq\]=high'
```

#### sort
The sort query accepts a comma sperated list of point seperated pairs with the following form:
```
sort=<ATTR1>.<ORDER>,<ATTR2>.<ORDER>
```
* Accepted orderings : `asc, desc`
* Accepted attributes:    `neigborhood, state, city, averageAge, distanceFromCityCenter, averageIncome, publicTransportAvailability, latitude, longitude

For example, for a list of neigborhoods ordered by public transport availability in ascending fashion, you can use
```sh
curl 'http://127.0.0.1:3000/neigborhoods?sort=publicTransportAvailability.asc'
```

#### limit
The limit query has the following form:
```
limit=<LIMIT>
```
* Accepted arguments: any integer
For example, for a list of up to 10 neigborhoods , you can use
```sh
curl 'http://127.0.0.1:3000/neigborhoods?limit=10'
```