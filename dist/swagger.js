"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const path_1 = __importDefault(require("path"));
let api_host = process.env.ApiHost;
let api_scheme = process.env.Scheme;
const doc = {
    info: {
        title: 'Just a Journal',
        "swagger": "2.0",
        description: 'A public API to manage your blogs'
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
const outputFile = path_1.default.join('swagger.json');
const endpointsFiles = [
    path_1.default.join(__dirname, 'routes/login'),
    path_1.default.join(__dirname, 'routes/register'),
    path_1.default.join(__dirname, 'routes/authors'),
    path_1.default.join(__dirname, 'routes/posts'),
    path_1.default.join(__dirname, 'routes/comments'),
    path_1.default.join(__dirname, 'routes/tags'),
    path_1.default.join(__dirname, 'routes/categories')
];
/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc);
