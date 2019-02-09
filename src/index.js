const fastify = require('fastify')({ logger: true });

const paginate = require('./utils/pagination');
const { getRealtime } = require('./handlers/et');
const { getGeoPosition } = require('./handlers/geo');

fastify.register(require('fastify-cors'), {
    origin: [
        /localhost:?(\d{3,5})?/,
        /(.*).sklirg.io/,
        /(.*).amazonaws.com/,
        "ruterna.no",
    ],
});

fastify.get('/test', async (request, response) => {
    response.type("application/json").code(200);
    return { hello: ", world" };
});

fastify.get('/geotest', async (request, response) => {
    const { lineRef } = request.query;

    let data;
    try {
        data = (await getGeoPosition(lineRef))[0];
    } catch (err) {
        response.type("application/json").code(500);
        return {
            error: err.message,
            message: "Something went wrong while parsing XML from Siri",
        };
    }
    response.type("application/json").code(200);
    return { data };
});

fastify.get('/realtimetest', async (request, response) => {
    const { lineRef } = request.query;

    try {
        const data = await getRealtime(lineRef);
        response.type("application/json").code(200);
        return { data };
    } catch (err) {
        response.type("application/json").code(500);
        return {
            error: err.message,
            message: "Something went wrong while parsing XML from Siri",
        };
    }
});

fastify.get('/geopos', async (request, response) => {
    let { lineRef, num, skip } = request.query;

    try {
        data = await getGeoPosition(lineRef);
        response.type("application/json").code(200);
        return paginate(data, num, skip);
    } catch (err) {
        response.type("application/json").code(500);
        return {
            error: err.message,
            message: "Something went wrong while parsing XML from Siri",
        };
    }
});

fastify.listen(3000, '0.0.0.0', (err, _) => {
    if (err) throw err;
})
