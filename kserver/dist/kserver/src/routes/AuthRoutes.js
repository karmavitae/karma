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
exports.validateUserPassword = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const MenuBuilder_1 = require("../services/MenuBuilder");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
passport_1.default.use(new passport_local_1.Strategy({ passReqToCallback: true }, validateUserPassword));
passport_1.default.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user._id,
            username: user.first_name + ' ' + user.last_name,
            userType: user.user_type,
        });
    });
});
passport_1.default.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
router.get('/valid', (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('checking auth status', req.isAuthenticated());
        res.status(200).json({ isValid: 'true' });
    }
    else {
        res.status(200).send({ isValid: 'false' });
    }
});
router.post('/login', passport_1.default.authenticate('local', {
    failWithError: true
}), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        // req.login(req.user, function(err: any) { if (err) { return next(err); }});
        res.status(200).json((0, MenuBuilder_1.getMenuItems)(req.user.user_type, req.user.first_name + ' ' + req.user.last_name));
    }
    else {
        res.status(401).json({ message: 'Check your username or password' });
    }
    next();
}), function (err, req, res, next) {
    req.session.destroy((err) => { console.log(err); });
    res.status(400).json({ status: 401, message: err });
    next();
});
router.post('/logout', function (req, res, next) {
    // req.session.destroy(function(err) { if (err) { return next(err); }})
    req.logout(function (err) { if (err) {
        return next(err);
    } });
    res.status(200).json({ isLoggedOut: "true" });
});
function validateUserPassword(req, username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ email: username }, { first_name: 1, last_name: 1, kv_id: 1, status: 1, user_type: 1 });
        if (user) {
            req.user = user;
            console.log("Information extracted: ", user);
            return done(null, user, { message: "Authentication Successful" });
        }
        else {
            return done('the new error', false, { message: "User does not exits" });
        }
    });
}
exports.validateUserPassword = validateUserPassword;
exports.default = router;
