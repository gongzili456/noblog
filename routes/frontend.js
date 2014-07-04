
var fr = require('../controller/frontend');

module.exports = function(app){


    app.get('/', fr.index);
    app.get('*', fr.content);
};