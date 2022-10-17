"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        title: 'Just a Journal',
        description: 'An API to manage your blogs',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    definitions: {
        RegisterUser: {
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
const outputFile = './swagger.json';
const endpointsFiles = ['./index.js'];
/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */
(0, swagger_autogen_1.default)(outputFile, endpointsFiles, doc);