const Constants = require('./utils/Constants');

const Payloads = require('./utils/Payloads');

const axios = require('axios');


module.exports = class Requests {
    constructor() {
        this._request = axios.default.create({
            baseURL: Constants.defaults.PROTOCOL + Constants.defaults.BASE_URL,
            headers: {
                'User-Agent': Constants.headers.USER_AGENT
            }
        });
    }

    async raw(method, params) {
        return new Promise(async (resolve, reject) => {
            const payload = Payloads[method];
            if (!payload) {
                return reject(`${method} was not valid`);
            }

            const response = await this._request.post('/backend/jsonrpc/v1', payload(params), {
                params: Constants.defaults.PARAMS
            }).catch(O_o => { });

            if (!response) {
                return reject(response);
            }

            return resolve(response.data);
        });
    }

    async getArticleNews(limit = 3) {
        return new Promise(async (resolve, reject) => {
            const payload = Payloads['Article.list'];

            const response = await this._request.post('/backend/jsonrpc/v1', payload({
                filters: {
                    "/news": true
                },
                limit,
                descending: true,
                sort: "created"
            }), {
                params: Constants.defaults.PARAMS
            }).catch(O_o => { });

            if (!response) {
                return reject(response);
            }

            return resolve(response.data);
        });
    }

    async getAllArticles(limit = 1) {
        return new Promise(async (resolve, reject) => {
            const payload = Payloads['Article.list'];

            const response = await this._request.post('/backend/jsonrpc/v1', payload({
                limit,
                descending: true,
                sort: "changed"
            }), {
                params: Constants.defaults.PARAMS
            }).catch(O_o => { });

            if (!response) {
                return reject(response);
            }

            return resolve(response.data);
        });
    }

    async getArticleGroups() {
        return new Promise(async (resolve, reject) => {
            const payload = Payloads['Articlegroup.list'];

            const response = await this._request.post('/backend/jsonrpc/v1', payload({
                filters: {
                    '/parent': null,
                    hiddenInMenu: false
                }
            }), {
                params: Constants.defaults.PARAMS
            }).catch(O_o => { });

            if (!response) {
                return reject(response);
            }

            return resolve(response.data);
        });
    }

    async getArticle(uid) {
        return new Promise(async (resolve, reject) => {
            const payload = Payloads['Article.get'];

            const response = await this._request.post('/backend/jsonrpc/v1', payload(uid), {
                params: Constants.defaults.PARAMS
            }).catch(O_o => { });

            if (!response) {
                return reject(response);
            }

            return resolve(response.data);
        });
    }

    async getArticleList(groupId) {
        return new Promise(async (resolve, reject) => {
            const payload = Payloads['Article.list'];
            console.log(groupId);

            const response = await this._request.post('/backend/jsonrpc/v1', payload({
                filters: {
                    "/showInArticlegroups": {
                        containsAny: [
                            groupId
                        ]
                    }
                },
                limit: 1,
                descending: true,
                sort: "numSold"
            }), {
                params: Constants.defaults.PARAMS
            }).catch(O_o => { });

            if (!response) {
                return reject(response);
            }

            return resolve(response.data);
        });
    }
}