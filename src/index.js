
const { MessageEmbed, WebhookClient } = require('discord.js');

const Magicland = require('./structures/EventEmitter');

const magicland = new Magicland({
    refreshRate: 1, // seconds
    trackAllArticles: false,
    trackNews: true,
});

const webhook = new WebhookClient({
    url: 'https://discord.com/api/webhooks/911195276507770880/EGmvsSncs1cNxwiS8ag154KMkR_MTXlkpFSKk4z5WMwr7zru6JRb115zep0wyb1jBDZs'
});



(async () => {

    // const { result: data } = await magicland.api.raw('Url.get', 'https://www.magicland.se/produkter/rea/hemligt-paket-kortlekar')
    // const { result: article } = await magicland.api.raw('Article.get', data.article);

    const prices = [];
    magicland.on('news', async article => {
        const { specialOffer, regular, current } = article.price;
        if (specialOffer) {
            prices.push({
                name: 'Special Offer',
                value: `~~${Math.round(regular.SEK)}kr~~ ${Math.round(specialOffer.SEK)}kr`,
                inline: true
            });
        } else {
            prices.push({
                name: 'Price',
                value: `${Math.round(current.SEK)}kr`,
                inline: true
            });
        }

        const description = article?.description.sv.replace(/<[^>]*>/g, '').trim();
        const amountInStock = article.stock?.message?.sv.replace('I lager: ', '');

        const embed = new MessageEmbed()
            .setColor('WHITE')
            .setAuthor({ name: 'Daemon Services' })
            .setTitle(article.name.sv)
            .setURL(article.url.sv)
            .setThumbnail(article.images[0])
            .setDescription(description ? description : 'No description')
            .addFields(prices)
            .addField('Is buyable', `${article.isBuyable ? `Yes, in stock: ${amountInStock}` : 'No'}`, true)
            .addField('Article Id', `${article.uid}`, true)

        await webhook.send({
            embeds: [embed]
        });
    });

    magicland.on('ach', console.log);

    magicland.timer.startTimer();

})();