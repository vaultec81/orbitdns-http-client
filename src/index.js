const components = require('./components');
const reusedComponents = require("orbitdns/src/core/components");
const multiaddr = require('multiaddr');

class Client {
    constructor(hostOrMultiaddr, port, options) {


        this.options = { url: "http://127.0.0.1:6001" };

        this.config = new components.config(this);
        this.repo = new components.repo(this);
        this.db = new components.db(this.options);

        //Reused components.
        this.domain = new reusedComponents.domain(this);
        this.key = new reusedComponents.key(this);
        this.root = new reusedComponents.root(this);
    }
}
module.exports = Client;