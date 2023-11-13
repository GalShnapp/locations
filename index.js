import Fastify from 'fastify'
import initDB from "./db/init.mjs";
import filterBreakdown from './requests/filter.mjs';
import sortBreakdown from './requests/sort.mjs';
import limitBreakdown from './requests/limit.mjs';
import { Neigborhood } from './db/models.mjs';
import getGeoLocationFromAddress from './location/locationsAPIConnector.mjs';
import getNeigborhoodwithRadiousFromDistance from './requests/within.mjs';
import http from 'http'

const fastify = Fastify({
    logger: true
})

fastify.get('/neigborhoods', async function handler(request, reply) {
    const queryWhere = filterBreakdown(request.query)

    const queryOrder = sortBreakdown(request.query)

    const queryLimit = limitBreakdown(request.query)

    const queryParams = {
        ...queryWhere,
        ...queryOrder,
        ...queryLimit,
        attributes: [
            "neigborhood",
            "state",
            "city",
            "averageAge",
            "distanceFromCityCenter",
            "averageIncome",
            "publicTransportAvailability",
            "latitude",
            "longitude"
        ]
    }

    console.log(queryParams)
    const response = await Neigborhood.findAndCountAll(queryParams);
    return response.rows

})

fastify.get('/within', async function handler(request, reply) {
    const {address, distance} = request.query;
    const pos = await getGeoLocationFromAddress(address);
    const foo = await getNeigborhoodwithRadiousFromDistance(pos, distance)

    return foo[0]
})

fastify.setErrorHandler(function (error, request, reply) {
    reply
        .status(error.statusCode || 500)
        .send({
            error: http.STATUS_CODES[error.statusCode || 500],
            message: error.message,
            statusCode: error.statusCode || 500,
            arg: error.arg ?? null
        })
})

try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}

await initDB();



