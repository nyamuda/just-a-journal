import swaggerAutogen from 'swagger-autogen';
import path from 'path';


let api_host: string = process.env.ApiHost!;
let api_scheme: string = process.env.Scheme!;

const doc = {
    info: {
        title: 'Just a Journal',
        "swagger": "2.0",
        description: '<p>A public API to manage your blogs.</p><p>To gain access to routes that can only be accessed by administrators, use the login information below to obtain the admin access token.</p><code>{"email": "admin@example.com","password": "helloworld"}</code>'
    },
    // host: 'localhost:3000',
    // schemes: ['http'],
    host: 'just-a-journal.onrender.com',
    schemes: ['https'],
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
            $content: "The content of the post",
            tags: ["science", "medicine"],
            summary: "",
            status: "",
            category: ""
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
        }
    },
    securityDefinitions: {
        oAuthGithub: {
            type: 'oauth2',
            authorizationUrl: 'https://just-a-journal.onrender.com/oauth/github',
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