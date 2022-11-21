const Constants = require('./Constants');

module.exports['Url.get'] = (params) => {
    return {
        id: 0,
        jsonrpc: Constants.defaults.API_VERSION,
        method: 'Url.get',
        params: [params]
    }
}

module.exports['Article.get'] = (params) => {
    return {
        id: 0,
        jsonrpc: Constants.defaults.API_VERSION,
        method: 'Article.get',
        params: [
            params,
            {
                name: 'sv',
                pageTitle: 'sv',
                deliveryInfo: 'sv',
                description: 'sv',
                images: true,
                uid: true,
                isBuyable: true,
                price: true,
                showPricesIncludingVat: true,
                stock: true,
                url: true,
                weight: true,
                quantityInfo: true
            },
        ]
    }
}

module.exports['Article.list'] = (params) => {
    return {
        id: 0,
        jsonrpc: Constants.defaults.API_VERSION,
        method: 'Article.list',
        params: [
            {
                introductionText: 'sv',
                hasChoices: true,
                isBuyable: true,
                priceInquiryRequired: true,
                presentationOnly: true,
                quantityInfo: true,
                type: true,
                uid: true,
                name: 'sv',
                pricing: true,
                url: 'sv',
                images: true,
                unit: true,
                articlegroup: true,
                news: true,
                showPricesIncludingVat: true
            },
            params
        ]
    }
}

module.exports['Articlegroup.list'] = (params) => {
    return {
        id: 0,
        jsonrpc: Constants.defaults.API_VERSION,
        method: 'Articlegroup.list',
        params: [
            {
                children: true,
                name: 'sv',
                parent: true,
                uid: true,
                url: 'sv'
            },
            params
        ]
    }
}