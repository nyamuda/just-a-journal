import swaggerAutogen from 'swagger-autogen';
import path from 'path';
import { string } from 'joi';

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
            name: "Name of the category"
        },
        addTag: {
            $name: "Name of the category"
        },
        updateTag: {
            $name: "Name of the category"
        },
        // registerUser: {
        //     name: "John Doe",
        //     email: "email@example.com",
        //     password:"helloworld"
        // },
        loginUser: {
            $email: "email@example.com",
            $password: "helloworld"
        },
        tags: ["medicine", "technology", "economics"],
        statuses: {

            "name": "status",
            "in": "query",
            "description": "Status values that need to be considered for filter",
            "required": false,
            "explode": true,
            "schema": {
                "type": "string",
                "default": "available",
                "enum": [
                    "available",
                    "pending",
                    "sold"
                ]
            }
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
    path.join(__dirname, 'routes/posts.ts')
    // path.join(__dirname, 'routes/comments.ts'),
    // path.join(__dirname, 'routes/tags.ts'),
    // path.join(__dirname, 'routes/categories.ts'),
    // path.join(__dirname, 'routes/oauth.ts')


];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc);