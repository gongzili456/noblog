
var admin = require('../controller/admin')

module.exports = function (app) {
    /* GET home page. */
    app.get('/', function(req, res) {
        res.render('index', { title: 'Express' });
    });

    app.get('/admin', admin.index);
    app.get('/admin/signup', admin.signup);
    app.post('/admin/signup', admin.doSignup);

    app.get('/admin/signin', admin.signin);
    app.post('/admin/signin', admin.doSignin);

    app.get('/admin/signout', admin.signout);

    app.get('/admin/content', admin.content);


    app.get('/admin/editor', admin.toCreate);
    app.post('/admin/editor', admin.createPost);

    app.get('/admin/editor/:post_id', admin.toUpdatePost);
    app.post('/admin/editor/:post_id', admin.doUpdatePost);
}