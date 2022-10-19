"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let api_host = process.env.ApiHost;
let api_scheme = process.env.Scheme;
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
const outputFile = path_1.default.join('swagger.json');
const endpointsFiles = [
    path_1.default.join(__dirname, 'routes/login.ts'),
    path_1.default.join(__dirname, 'routes/register.ts'),
    path_1.default.join(__dirname, 'routes/authors.ts'),
    path_1.default.join(__dirname, 'routes/posts.ts'),
    path_1.default.join(__dirname, 'routes/comments.ts'),
    path_1.default.join(__dirname, 'routes/tags.ts'),
    path_1.default.join(__dirname, 'routes/categories.ts')
];
/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc);
