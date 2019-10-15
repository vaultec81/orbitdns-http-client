const client = require(".");
const Key = require("interface-datastore").Key;
var ctl = new client();

ctl.repo.datastore.put(new Key("ds"), Buffer.from("sdsdaa"));
(async () => {
    var bool = await ctl.repo.datastore.has(new Key("d"));
    console.log(await ctl.domain.listRecords("example.ygg"));
    console.log((await ctl.repo.datastore.get(new Key("ds"))).toString())
    for await (let val of ctl.repo.datastore.query({})) {
        console.log(val)
    }
})();
