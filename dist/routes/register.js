"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/index");
let router = express_1.default.Router();
exports.registerRoutes = router;
router.route("/authors/register")
    .post((req, res) => {
    /*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Register a new author'
    #swagger.parameters['obj'] = {
                   in: 'body',
                   description: '<p>If the registration process is successful, an access token is returned.
                   You can use this token to access various endpoints of the API.
                   The token expires in 24 hours.</p>',
                   schema: { $ref: '#/definitions/registerUser' }
           }

           */
    (0, index_1.registerAuthor)(req, res);
});
