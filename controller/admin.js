var crypto = require('crypto');
var markdown = require('markdown').markdown;
var User = require('../models/user');
var Post = require('../models/post');
var adminCtrl = {
    index : function(req, res){
        console.log('session user: ', req.session.user);
        if(req.session.user === undefined || req.session.user === null){
            return res.redirect('/admin/signin');
        }else{
            return res.redirect('/admin/content');
        }
    },
    signin : function(req, res){
        res.render('admin/signin', {
            title: 'Sign In',
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    },
    doSignin :function(req, res){
        var email = req.body.email,
            password = req.body.password;

        var md5 = crypto.createHash('md5');

        User.get(email, function (err, user) {
            if(err){

            }
            if(!user){
                req.flash('error', email + 'is not exist');
                return res.redirect('signin');
            }
            if(user.password !== md5.update(password).digest('hex')){
                req.flash('error', 'email or password is error');
                return res.redirect('signin');
            }

            req.session.user = user;
            req.flash('success', 'sign in success');
            return res.redirect('content');
        });
    },
    signout : function(req, res){
        req.session.user = null;
        return res.redirect('signin');
    },
    signup : function(req, res){
        res.render('admin/signup', {
            title: 'Sign Up',
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    },
    doSignup : function(req, res){
        var name = req.body.name,
            email = req.body.email,
            password = req.body.password;

        console.log(name, '\n', email, '\n', password)

        var md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');

        console.log('password hex: ', password);

        var _user = new User({
            name : name,
            email : email,
            password : password
        });

        User.get(email, function(err, user){
            if(err){
                console.log('unknown error');
            }
            if(user){
                console.log( email, 'is exist');
                req.flash('error', email + 'is exist');
                return res.redirect('signup');
            }
            _user.save(function(err, user){
                if(err){
                    console.log( email, 'unknown error');
                    req.flash('error', 'unknown error');
                    return res.redirect('signup');
                }
                req.session.user = user;
                req.flash('success', 'sign up success');
                return res.redirect('/admin');
            });
        })

    },
    content : function(req, res){

        Post.findAll(function(err, postlist){
            res.render('admin/posts',{
                title : "Content list",
                posts : postlist
            });
        });

    },


    toCreate : function(req, res){
        res.render('admin/editor', {
            title: 'editor',
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    },
    createPost : function(req, res){
        var title = req.body.title,
            content = req.body.content;

        var user = req.session.user;

        var _post = new Post({
            title : title,
            markdown : content,
            html : markdown.toHTML(content),
            published_by : user._id,
            create_by : user._id,
            author_id : user._id

//            slug : ''//url
//            status : 'published'

        });

        _post.save(function(err, post){
            if(err){
                req.flash('error', 'unknown error!');
                return res.redirect('editor');
            }
            req.flash('success', 'save success');
            return res.redirect('editor');
        });
    }


};

module.exports = adminCtrl;
