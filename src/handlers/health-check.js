
/**
 * Health Check
 */
const healthCheckHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`healthCheckHandler only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    return {
        statusCode: 200
    };
}

module.exports = {
    healthCheckHandler
}
