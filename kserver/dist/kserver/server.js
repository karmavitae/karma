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
const InformationRoutes_1 = __importDefault(require("./src/routes/InformationRoutes"));
const UserRoutes_1 = __importDefault(require("./src/routes/UserRoutes"));
const AuthRoutes_1 = __importDefault(require("./src/routes/AuthRoutes"));
const ObjectRoutes_1 = __importDefault(require("./src/routes/ObjectRoutes"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const server = (0, express_1.default)();
const port = process.env['PORT'] || 4000;
const buildFiles = process.env['STATIC_FILES'] || '';
const uri = process.env['MONGO_TEST_URI'] || '';
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
mongoose_1.default.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
const store = new MongoDBStore({ uri: uri, collection: 'sessions' });
store.on('error', (error) => { console.log(`MongodbStore Error: ${error}`); });
server.use(express_1.default.json());
server.use(passport_1.default.initialize());
server.use((0, express_session_1.default)({
    secret: 'ddlj',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Session duration in milliseconds (e.g., 1 day)
    }
}));
server.use(passport_1.default.session());
server.use(passport_1.default.authenticate('session'));
server.use((req, res, next) => {
    res.locals['isAuthenticated'] = req.isAuthenticated();
    console.log('Session data: ', req.session, req.user);
    console.log('user data: ', req.user);
    console.log("Authentication status: ", req.isAuthenticated());
    next();
});
server.use('/info', InformationRoutes_1.default);
server.use('/auth', AuthRoutes_1.default);
server.use('/user', UserRoutes_1.default);
server.use('/obj', ObjectRoutes_1.default);
server.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendFile(path_1.default.join(buildFiles + '/index.html'));
}));
server.get('*.*', express_1.default.static(buildFiles, {
    maxAge: '1y'
}));
server.get('*', (req, res) => {
    res.sendFile(path_1.default.join(buildFiles + '/index.html'));
});
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
