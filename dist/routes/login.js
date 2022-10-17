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
router.route("/")
    .get(index_1.loginAuthor);
