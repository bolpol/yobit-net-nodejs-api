interface ticker {
    pair :string,
    market :string
}

interface depth {
    pair :string,
    market :string,
    limit :number|150
}

interface trades {
    pair :string,
    market :string,
    limit :number|150
}

interface MultiplyQuery {
    pairs :string[],
    markets :string[],
    ignore_invalid :boolean|false
}

class YobitApi {

    private static url:string = 'https://yobit.net/api/3';

    private async get(url) {
        let response = new Promise((resolve, reject) => {
            const https = require('https');
            https.get(url, (resp) => {
                let data:string = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(JSON.parse(data));
                });
            }).on("error", (err) => {
                reject(err);
            });
        });
        return await response;
    }

    private validInput(value:string):string|Error {
        if(value.length <= 6) {
            return value;
        } else {
            throw Error("not valid ticker");
        }
    }

    public async info():Promise<Object> {
        return this.get(YobitApi.url + '/info');
    }

    public async ticker(event :ticker):Promise<Object> {
        return this.get(YobitApi.url + '/ticker/' + this.validInput(event.pair) + '_' + this.validInput(event.market));
    }

    public async depth(event :depth):Promise<Object> {
        return this.get(YobitApi.url + '/depth/' + this.validInput(event.pair) + '_' + this.validInput(event.market) + '?limit=' + event.limit);
    }

    public async trades(event :trades):Promise<Object> {
        return this.get(YobitApi.url + '/trades/' + this.validInput(event.pair) + '_' + this.validInput(event.market) + '?limit=' + event.limit);
    }

    public async tickerMultiplyQuery(event :MultiplyQuery):Promise<Object> {
        let data :string = "";
        for(let i=0; i<event.markets.length; i++) {
            for(let ii=0; ii<event.pairs.length; ii++) {
                if(event.markets.length-1 == i && event.pairs.length-1 == ii) {
                    data += event.pairs[ii] + '_' + event.markets[i]
                } else {
                    data += event.pairs[ii] + '_' + event.markets[i] + "-"
                }
            }
        }
        return this.get(YobitApi.url + '/ticker/' + data + '?ignore_invalid=' + event.ignore_invalid);
    }

    public async depthMultiplyQuery(event :MultiplyQuery):Promise<Object> {
        let data :string = "";
        for(let i=0; i<event.markets.length; i++) {
            for(let ii=0; ii<event.pairs.length; ii++) {
                if(event.markets.length-1 == i && event.pairs.length-1 == ii) {
                    data += event.pairs[ii] + '_' + event.markets[i]
                } else {
                    data += event.pairs[ii] + '_' + event.markets[i] + "-"
                }
            }
        }
        return this.get(YobitApi.url + '/depth/' + data + '?ignore_invalid=' + event.ignore_invalid);
    }

    public async tradeMultiplyQuery(event :MultiplyQuery):Promise<Object> {
        let data :string = "";
        for(let i=0; i<event.markets.length; i++) {
            for(let ii=0; ii<event.pairs.length; ii++) {
                if(event.markets.length-1 == i && event.pairs.length-1 == ii) {
                    data += event.pairs[ii] + '_' + event.markets[i]
                } else {
                    data += event.pairs[ii] + '_' + event.markets[i] + "-"
                }
            }
        }
        return this.get(YobitApi.url + '/trade/' + data + '?ignore_invalid=' + event.ignore_invalid);
    }
}