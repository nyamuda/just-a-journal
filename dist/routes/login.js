"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
exports.loginRoutes = router;
const index_1 = require("../controllers/index");
router.route("/authors/login")
    .post((req, res) => {
    /*
     #swagger.tags = ['Authors']
    #swagger.summary = 'Login an author'


    #swagger.parameters['obj'] = {
                   in: 'body',
                   description: '<p>If the login process is successful, an access token is returned.
                   You can use this token to access various endpoints of the API.
                   The token expires in 24 hours.</p>',
                   schema: { $ref: '#/definitions/loginUser' }
           }
    
   */
    (0, index_1.loginAuthor)(req, res);
});
