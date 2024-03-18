"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InformationRoutes_1 = __importDefault(require("./InformationRoutes"));
const router = express_1.default.Router();
router.use('/info/**', InformationRoutes_1.default);
exports.default = router;
