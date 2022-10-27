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
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/index");
let router = express_1.default.Router();
exports.categoryRoutes = router;
const middleware = __importStar(require("../utils/middleware"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
router.route("/categories")
    .get(middleware.ensureLogin, (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Get all the categories'
    // #swagger.security = [{"apiKeyAuth": []}]
    (0, index_1.getAllCategories)(req, res);
})
    .post(middleware.ensureAdmin, (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Add a category'
    // #swagger.security = [{"apiKeyAuth": []}]
    // #swagger.description ='<p> Only admins have the authority to add a category.</p>'
    /*
   #swagger.parameters['obj'] = {
                 in: 'body',
                 schema: { $ref: '#/definitions/addCategory' }
         }
  
  
  */
    (0, index_1.addCategory)(req, res);
});
router.route("/categories/:categoryId")
    .get(middleware.ensureLogin, (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.security = [{"apiKeyAuth": []}]
    // #swagger.summary = 'Get a category by id'
    (0, index_1.getCategoryById)(req, res);
})
    .put(middleware.ensureAdmin, (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Update an existing category'
    // #swagger.security = [{"apiKeyAuth": []}]
    // #swagger.description ='<p><span style="color:red"><b>Note:</b></span> Only admins have the authority to update existing categories.</p>'
    /*
   #swagger.parameters['obj'] = {
                 in: 'body',
                 schema: { $ref: '#/definitions/updateCategory' }
         }
  
  
  */
    (0, index_1.updateCategoryById)(req, res);
})
    .delete(middleware.ensureAdmin, (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Delete a category'
    // #swagger.security = [{"apiKeyAuth": []}]
    // #swagger.description ='<p><span style="color:red"><b>Note:</b></span> Only admins have the authority to delete a category.</p>'
    (0, index_1.deleteCategoryById)(req, res);
});
