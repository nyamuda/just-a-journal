import swaggerAutogen from 'swagger-autogen';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

let api_host: string = process.env.ApiHost!;
let api_scheme: string = process.env.Scheme!;

const doc = {
    info: {
        title: 'Just a Journal',
        description: 'An API to manage your blogs',
    },
    host: api_host,
    schemes: [api_scheme],
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
            tags: ["medicine", "technology", "economics"],
            summary: "A brief summary of the post",
            status: "publish or draft. The default is 'publish'",
            category: "The category in which the post belongs. The default is 'miscellaneous'",
        },
        updatePost: {
            title: "Title of the post",
            content: "The content of the post",
            tags: ["medicine", "technology", "economics"],
            summary: "A brief summary of the post",
            status: "publish or draft",
            category: "The category in which the post belongs.",
        },
        addComment: {
            $content: "The comment",
            $post_id: 12345
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
            authorizationUrl: 'https://localhost:3000/oauth/github',
            flow: 'implicit',

        }
    }
};

const outputFile = path.join('swagger.json');
const endpointsFiles = [

    path.join(__dirname, 'routes/login.ts'),
    path.join(__dirname, 'routes/register.ts'),
    path.join(__dirname, 'routes/authors.ts'),
    path.join(__dirname, 'routes/posts.ts'),
    path.join(__dirname, 'routes/comments.ts'),
    path.join(__dirname, 'routes/tags.ts'),
    path.join(__dirname, 'routes/categories.ts')


];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc);