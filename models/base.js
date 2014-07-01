
var config = require('../config'),
    mongo = require('mongodb').MongoClient,
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

//switch (config.database.client){
//    case 'mongodb' :
//        module.exports = mongo.db('mongodb://'+config.database.connection.host+'27017/'+config.database.connection.database, {native_parser:true});
//        break
//    default :
//        module.exports = mongo.db('mongodb://'+config.database.connection.host+'27017/'+config.database.connection.database, {native_parser:true});
//}


var host = config.database.connection.host,
    database = config.database.connection.database;
module.exports = new Db(database, new Server(host, Connection.DEFAULT_PORT), {safe: true});
