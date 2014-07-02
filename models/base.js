
var config = require('../config'),
    mongodb = require('mongodb'),
    poolModule = require('generic-pool');


var host = config.database.connection.host,
    database = config.database.connection.database;

var pool = poolModule.Pool({
    name : 'mongodb',
    create : function(callback){
        var server_options = {'auto_reconnect' : false, poolSize : 1, safe: true};
        var db_options={w:-1};
        var mongodb_server = new mongodb.Server(host, 27017, server_options );
        var db = new mongodb.Db(database, mongodb_server, db_options);
        db.open(function(err, db){
            if(err)return callback(err);
            callback(null, db);
        });
    },
    destroy  : function(db) { db.close(); },
    max      : 10,//根据应用的可能最高并发数设置
    idleTimeoutMillis : 30000,
    log : false
});

module.exports = pool;
