const { EventEmitter } = require('events');

const Requests = require('./Requests');

const Timer = require('./Timer');


module.exports = class MagicLand extends EventEmitter {
    constructor(config) {
        super();

        Object.keys(config).forEach(key => this[key] = config[key]);
        
        this.api = new Requests(this);
        this.timer = new Timer(this);
    }
}