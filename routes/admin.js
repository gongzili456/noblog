
var admin = require('../controller/admin')

module.exports = function (app) {
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
}