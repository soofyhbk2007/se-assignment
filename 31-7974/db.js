var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me';

exports.connect = function(cb) {
    // You do this one
    mongo.connect(dbURL, function(err, db) {
    	if (err)
    		throw err;
    	else {
            DB = db;
            console.log("connected successfully");
            cb(err, db);
    	}
    });
};

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
};
