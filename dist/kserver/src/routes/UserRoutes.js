"use strict";
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
const express_1 = __importDefault(require("express"));
const UserManager_1 = require("../services/UserManager");
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email } = req.body;
    let result = yield (0, UserManager_1.registerUser)({ first_name: String(first_name), last_name: String(last_name), email: String(email) });
    let responseData = result ? { status: 200, message: 'Confirmation Sent' } : { status: 401, message: 'Registration Failed' };
    res.status(200).json(responseData);
}));
// router.get('/activate')
// router.post('/activate')
// router.post('/reset')
exports.default = router;
