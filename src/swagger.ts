import swaggerAutogen from 'swagger-autogen';
import path from 'path';


let api_host: string = process.env.ApiHost!;
let api_scheme: string = process.env.Scheme!;

const doc = {
    info: {
        title: 'Just a Journal',
        "swagger": "2.0",
        description: 'A public API to manage your blogs'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    // host: 'just-a-journal.onrender.com',
    // schemes: ['https'],
    definitions: {
        registerUser: {
            $name: "your full name",
            $email: "email@example.com",
            $password: "helloworld"
        },
        updateUser: {
            name: "your full name",
            email: "email@example.com",
        },
        addPost: {
            $title: "Title of the post",
            $content: "The content of the post"
        },
        updatePost: {
            title: "Title of the post",
            content: "The content of the post"
        },
        addComment: {
            $content: "The comment"
        },
        updateComment: {
            $content: "The comment",
        },
        addCategory: {
            $name: "Name of the category"
        },
        updateCategory: {
            $name: "Name of the category"
        },
        addTag: {
            $name: "Name of the category"
        },
        updateTag: {
            $name: "Name of the category"
        },
        loginUser: {
            $email: "email@example.com",
            $password: "helloworld"
        },
        tags: ["medicine", "technology", "economics"],

    },
    securityDefinitions: {
        oAuthGithub: {
            type: 'oauth2',
            authorizationUrl: 'just-a-journal.onrender.com/oauth/github',
            flow: 'implicit',

        },
        apiKeyAuth: {
            type: "apiKey",
            name: "authorization",
            in: "header",
            description: "The token for authentication"
        }
    }
};

const outputFile = path.join('swagger.json');
const endpointsFiles = [

    path.join(__dirname, 'routes/login'),
    path.join(__dirname, 'routes/register'),
    path.join(__dirname, 'routes/authors'),
    path.join(__dirname, 'routes/posts'),
    path.join(__dirname, 'routes/comments'),
    path.join(__dirname, 'routes/tags'),
    path.join(__dirname, 'routes/categories')


];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc);