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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuthor = void 0;
const models_1 = require("../models");
const functions_1 = require("../utils/functions");
const bcrypt = __importStar(require("bcrypt"));
let loginAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.email || req.query.email;
    let password = req.body.password || req.query.password;
    //validate login details
    let valid_details = (0, functions_1.validateLoginDetails)(email, password);
    //if the details are not valid
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }
    //check if user is in the database
    let old_author = yield models_1.Author.findOne({ email });
    //if user doesn't exist
    if (!old_author) {
        return res.status(400).json({ message: "A user with that email does not exist." });
    }
    //compare passwords
    let is_password_correct = yield bcrypt.compare(password, old_author.password);
    if (!is_password_correct) {
        return res.status(400).json({ message: "Incorrect password" });
    }
    //if there are no errors
    //create and access token
    let author_id = old_author.toObject()._id.toString();
    let token = (0, functions_1.createJWT)({ email: email, admin: old_author.admin, author_id });
    return res.json({ token });
});
exports.loginAuthor = loginAuthor;
