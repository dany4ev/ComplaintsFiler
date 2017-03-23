var fs = require("fs");
//var file = process.env.CLOUD_DIR + "/" + "complaints.db";
var file = "complaints.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
if (!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
    console.log("Created DB file.");
}
db.serialize(function () {
    if (!exists) {
        db.run("CREATE TABLE complaint (thing TEXT)");
    }
});

module.exports = db;