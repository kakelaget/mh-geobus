const fastify = require('fastify')({ logger: true });

fastify.get('/test', async (request, response) => {
    response.type("application/json").code(200);
    return { hello: ", world" };
});

fastify.listen(3000, (err, _) => {
    if (err) throw err;
})
