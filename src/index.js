const fastify = require('fastify')({ logger: true });

const { getGeoPosition } = require('./handlers/geo');

fastify.get('/test', async (request, response) => {
    response.type("application/json").code(200);
    return { hello: ", world" };
});

fastify.get('/geotest', async (request, response) => {
    const { lineRef } = request.query;

    let data;
    try {
        data = await getGeoPosition(lineRef);
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

fastify.listen(3000, '0.0.0.0', (err, _) => {
    if (err) throw err;
})
