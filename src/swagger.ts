import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const doc = {
    info: {
        title: 'Just a Journal',
        description: 'An API to manage your blogs',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    definitions: {
        registerUser: {
            $name: "your full name",
            $email: "email@example.com",
            $password: "helloworld"
        },
        // UpdateQuote: {
        //     quote: "update a quote",
        //     author: "Tatenda Nyamuda"
        // },
        // registerUser: {
        //     name: "John Doe",
        //     email: "email@example.com",
        //     password:"helloworld"
        // },
        loginUser: {
            email: "email@example.com",
            password: "helloworld"
        }
    },
    securityDefinitions: {
        oAuthGithub: {
            type: 'oauth2',
            authorizationUrl: 'https://localhost:3000/oauth/github',
            flow: 'implicit',

        }
    }
};

const outputFile = path.join(__dirname, 'swagger.json');
const endpointsFiles = [

    path.join(__dirname, 'routes/login.ts'),
    path.join(__dirname, 'routes/register.ts'),
    path.join(__dirname, 'routes/authors.ts'),
    // path.join(__dirname, 'routes/posts.ts'),
    // path.join(__dirname, 'routes/comments.ts'),
    // path.join(__dirname, 'routes/tags.ts'),
    // path.join(__dirname, 'routes/categories.ts'),
    // path.join(__dirname, 'routes/oauth.ts')


];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc);