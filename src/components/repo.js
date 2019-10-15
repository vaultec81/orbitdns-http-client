const axios = require('axios');
const map = require('interface-datastore').utils.map
const DagCbor = require('ipld-dag-cbor');
const base64url = require('base64url');
const Key = require("interface-datastore").Key;

class datastore {
    constructor(name, options) {
        this.name = name;
        this.options = options;
    }
    /**
     * Read from the file system.
     * @param {Key} key 
     * @returns {Promise<Buffer>}
     */
    async get(key) {
        var url = this.options.url+`/api/v0/repo/${this.name}/get/${key.toString()}`;
        return base64url.toBuffer((await axios.get(url)).data);
    }
    /**
     * Store the given value under the key.
     * @param {Key} key 
     * @param {Buffer} value 
     * @returns {Promise<void>}
     */
    async put(key, value) {
        var url = this.options.url+`/api/v0/repo/${this.name}/put/${key.toString()}`;
        await axios.post(url, {
            value: base64url.encode(value)
        })
    }
    /**
     * Check for the existence of the given key.
     * @param {Key} key 
     * @returns {Promise<Boolean>}
     */
    async has(key) {
        var url = this.options.url+`/api/v0/repo/${this.name}/has/${key.toString()}`;
        var bool = (await axios.get(url)).data;
        return bool;
    }
    /**
     * Delete the record under the given key.
     * @param {Key} key 
     * @returns {Promise<null>}
     */
    async delete(key) {
        var url = this.options.url+`/api/v0/repo/${this.name}/delete/${key.toString()}`;
        await axios.get(url);
    }
    /**
     * Query the store. 
     * @param {Object} q 
     */
    async *query(q) {
        var querybin = base64url.encode(DagCbor.util.serialize(q));
        var url = this.options.url+`/api/v0/repo/${this.name}/query/${querybin}`;
        const response = await axios.get(url);
        var list = DagCbor.util.deserialize(base64url.toBuffer(response.data))
        for(var val of list) {
            yield val;
        }
    }
}
class repo {
    /**
     * Note: IPFS and orbitdb components are currently not supported.
     * @param {*} self 
     */
    constructor(self) {
        this.self = self;
        this.datastore = new datastore("datastore", self.options);
        this.root = new datastore("root", self.options);
        this.keystore = new datastore("keystore", self.options);
    }
}
module.exports = repo;