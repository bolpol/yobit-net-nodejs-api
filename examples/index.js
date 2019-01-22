const api = new YobitApi();

api.info().then(console.log);
api.ticker({pair: "ltc", market: "btc"}).then(console.log);
api.depth({pair: "ltc", market: "btc", limit: 10}).then(console.log);
api.trades({pair: "ltc", market: "btc", limit: 10}).then(console.log);
api.tickerMultiplyQuery({pairs: ["ltc", "nmc"], markets: ["btc", "doge"], ignore_invalid: false}).then(console.log);