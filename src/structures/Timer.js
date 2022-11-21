const fse = require('fs-extra');

const path = require('path');


module.exports = class Timer {
    constructor(client) {
        this.client = client;

        this.api = this.client.api;

        this.banned = ['Nyheter', 'Alla artiklar']

        this.refreshRate = this.client.refreshRate;
        this.trackAllArticles = this.client.trackAllArticles;
        this.trackNews = this.client.trackNews;
        this.interval = null;
        this.latestNews = null;
        this.latestArticle = null;
        this.latest = null;
        this.timeout = null;
    }

    readConfig() {
        return fse.readJsonSync(
            path.join(require.main.path, 'config.json')
        );
    }

    startTimer() {
        console.log('Timer starting...');
        let config = this.readConfig();
        let counter = 0;
        this.interval = setInterval(async () => {
            if (!this.timeout) {
                if (counter >= 60) { }
                this.timeout = setTimeout(() => {
                    this.client.emit('ach', {
                        time: Date.now(),
                        counter
                    });
                    counter++;
                    clearTimeout(this.timeout);
                    this.timeout = null;
                }, (this.refreshRate * 5) * 1000);
            }
            config = this.readConfig();

            const { result: articleGroups } = await this.api.getArticleGroups();
            if (this.trackAllArticles && config.trackArticles.length > 0) {
                throw new Error('trackAllArticles cannot be enabled if trackArticles array is not empty.');
            }

            if (config.trackArticles.length > 0) {
                for (const articleGroupName of config.trackArticles) {
                    if (this.banned.includes(articleGroupName)) {
                        throw new Error(articleGroupName + ' exists as an event.');
                    }
                    const { uid: groupId } = articleGroups.find(c => c.name.sv == articleGroupName);
                    const { result: articles } = await this.api.getArticleList(groupId);
                    const article = articles[0];
                    if (this.latest == article.uid) {
                        const eventName = articleGroupName.split(/ +/g).join('-').toLowerCase();
                        this.client.emit(eventName, article);
                    }
                    this.latest = article.uid;
                }
            }

            if (this.trackAllArticles) {
                const { result: data } = await this.api.getAllArticles();
                if (!this.latestArticle || this.latestArticle != data[0].uid) {
                    this.latestArticle = data[0].uid;
                    const { result: article } = await this.api.getArticle(data[0].uid);
                    this.client.emit('allArticles', article);
                }
            }

            if (this.trackNews) {
                const { result: data } = await this.api.getArticleNews();
                if (this.latestNews == null || this.latestNews != data[0].uid) {
                    this.latestNews = data[0].uid;

                    const { result: article } = await this.api.getArticle(data[0].uid);
                    this.client.emit('news', article);
                }
            }

        }, this.refreshRate * 1000);
    }
}