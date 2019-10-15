const axios = require('axios');
const DagCbor = require('ipld-dag-cbor');
const base64url = require('base64url');

/**
 * OrbitDNS docstore API
 */
class db {
    constructor(options) {
        this.options = options;
    }
    async get(key) {
        var url = this.options.url+`/api/v0/db/get/${key}`;
        var data = (await axios.get(url)).data;

        return DagCbor.util.deserialize(base64url.toBuffer(data));
    }
    async put(value) {
        var url = this.options.url+`/api/v0/db/put/`;
        return (await axios.post(url, {
            value: base64url.encode(DagCbor.util.serialize(value))
        })).data;
    }
    async del(key) {
        var url = this.options.url+`/api/v0/db/del/${key}`;
        return (await axios.get(url)).data;
    }
    query() {
        
        throw `Not implemented`;
    }
}
module.exports = db;