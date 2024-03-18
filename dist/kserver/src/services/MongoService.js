"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function mongoConnect() {
    let uri = process.env['MONGO_TEST_URI'] || '';
    if (uri.length > 0) {
        mongoose_1.default.connect(uri).then(() => {
            console.log('Connected to MongoDB');
        })
            .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
    }
    else {
        console.log('empty mongo URI');
    }
}
exports.mongoConnect = mongoConnect;
// mongoose.connection.close()
