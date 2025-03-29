const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'COMP3000 API Documentation',
            version: '1.0.0',
            description: 'API documentation for my COMP3000 project.',
        },
        servers: [
            {
                url: 'http://localhost:9000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;