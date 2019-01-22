var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var YobitApi = /** @class */ (function () {
    function YobitApi() {
    }
    YobitApi.prototype.get = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = new Promise(function (resolve, reject) {
                            var https = require('https');
                            https.get(url, function (resp) {
                                var data = '';
                                resp.on('data', function (chunk) {
                                    data += chunk;
                                });
                                resp.on('end', function () {
                                    resolve(JSON.parse(data));
                                });
                            }).on("error", function (err) {
                                reject(err);
                            });
                        });
                        return [4 /*yield*/, response];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    YobitApi.prototype.validInput = function (value) {
        if (value.length <= 6) {
            return value;
        }
        else {
            throw Error("not valid ticker");
        }
    };
    YobitApi.prototype.info = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get(YobitApi.url + '/info')];
            });
        });
    };
    YobitApi.prototype.ticker = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get(YobitApi.url + '/ticker/' + this.validInput(event.pair) + '_' + this.validInput(event.market))];
            });
        });
    };
    YobitApi.prototype.depth = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get(YobitApi.url + '/depth/' + this.validInput(event.pair) + '_' + this.validInput(event.market) + '?limit=' + event.limit)];
            });
        });
    };
    YobitApi.prototype.trades = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get(YobitApi.url + '/trades/' + this.validInput(event.pair) + '_' + this.validInput(event.market) + '?limit=' + event.limit)];
            });
        });
    };
    YobitApi.prototype.tickerMultiplyQuery = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var data, i, ii;
            return __generator(this, function (_a) {
                data = "";
                for (i = 0; i < event.markets.length; i++) {
                    for (ii = 0; ii < event.pairs.length; ii++) {
                        if (event.markets.length - 1 == i && event.pairs.length - 1 == ii) {
                            data += event.pairs[ii] + '_' + event.markets[i];
                        }
                        else {
                            data += event.pairs[ii] + '_' + event.markets[i] + "-";
                        }
                    }
                }
                return [2 /*return*/, this.get(YobitApi.url + '/ticker/' + data + '?ignore_invalid=' + event.ignore_invalid)];
            });
        });
    };
    YobitApi.prototype.depthMultiplyQuery = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var data, i, ii;
            return __generator(this, function (_a) {
                data = "";
                for (i = 0; i < event.markets.length; i++) {
                    for (ii = 0; ii < event.pairs.length; ii++) {
                        if (event.markets.length - 1 == i && event.pairs.length - 1 == ii) {
                            data += event.pairs[ii] + '_' + event.markets[i];
                        }
                        else {
                            data += event.pairs[ii] + '_' + event.markets[i] + "-";
                        }
                    }
                }
                return [2 /*return*/, this.get(YobitApi.url + '/depth/' + data + '?ignore_invalid=' + event.ignore_invalid)];
            });
        });
    };
    YobitApi.prototype.tradeMultiplyQuery = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var data, i, ii;
            return __generator(this, function (_a) {
                data = "";
                for (i = 0; i < event.markets.length; i++) {
                    for (ii = 0; ii < event.pairs.length; ii++) {
                        if (event.markets.length - 1 == i && event.pairs.length - 1 == ii) {
                            data += event.pairs[ii] + '_' + event.markets[i];
                        }
                        else {
                            data += event.pairs[ii] + '_' + event.markets[i] + "-";
                        }
                    }
                }
                return [2 /*return*/, this.get(YobitApi.url + '/trade/' + data + '?ignore_invalid=' + event.ignore_invalid)];
            });
        });
    };
    YobitApi.url = 'https://yobit.net/api/3';
    return YobitApi;
}());
//# sourceMappingURL=index.js.map