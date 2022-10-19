"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerRoutes = void 0;
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
exports.swaggerRoutes = router;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
