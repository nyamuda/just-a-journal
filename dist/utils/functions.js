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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = exports.getGithubUser = exports.getGitHubToken = exports.validateRegisterDetails = exports.validateLoginDetails = void 0;
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
dotenv.config();
let validateLoginDetails = (email, password) => {
    let schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required().min(8)
    });
    let { value, error } = schema.validate({ email, password });
    //if there is a validation error
    if (error) {
        return { error: true, message: error.details[0].message };
    }
    return {
        error: false,
        message: "No errors"
    };
};
exports.validateLoginDetails = validateLoginDetails;
let validateRegisterDetails = (name, email, password) => {
    let schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required().min(8)
    });
    let { value, error } = schema.validate({ name, email, password });
    //if there is a validation error
    if (error) {
        return { error: true, message: error.details[0].message };
    }
    return {
        error: false,
        message: "No errors"
    };
};
exports.validateRegisterDetails = validateRegisterDetails;
let getGitHubToken = (code) => __awaiter(void 0, void 0, void 0, function* () {
    let options = {
        method: "POST",
        url: "https://github.com/login/oauth/access_token",
        data: {
            client_id: `${process.env.ClientID}`,
            client_secret: `${process.env.ClientSecret}`,
            code: code
        },
        headers: {
            "Accept": "application/json"
        }
    };
    let response = yield (0, axios_1.default)(options);
    let responseOK = response && response.status === 200 && response.statusText == "OK";
    if (responseOK) {
        return response.data.access_token;
    }
});
exports.getGitHubToken = getGitHubToken;
let getGithubUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let options = {
        method: "GET",
        url: "https://api.github.com/user",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    let response = yield (0, axios_1.default)(options);
    let responseOK = response && response.status == 200 && response.statusText == "OK";
    if (responseOK) {
        return response.data;
    }
});
exports.getGithubUser = getGithubUser;
let createJWT = (payload) => {
    let SECRET = process.env.SECRET;
    let access_token = jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: "24h" });
    return access_token;
};
exports.createJWT = createJWT;
