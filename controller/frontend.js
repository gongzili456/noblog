var crypto = require('crypto');
var Post = require('../models/post');
var User = require('../models/user');
var ObjectId = require('mongodb').ObjectID;

//format user array to json, key is user _id
function handle(p, u){
    function parseUsers(users){
        var json_user = {};
        for(var i in users){
            var u = users[i];
            json_user[u._id] = {
                name : u.name,
                email : u.email,
                bio : u.bio,
                website : u.website,
                image : u.image,
                cover : u.cover
            };
        }
        return json_user;
    }
    var j_u = parseUsers(u);
    var posts = [];
    for(var i in p){
        var po = p[i];
        posts.push({
            id: po._id,
            title : po.title,
            url : po.slug,
            content : po.html,
            published_at : po.published_at,
            author : j_u[po.author_id]
        })
    }

    return posts;
}
var frontendCrtl = {


    content : function(req, res){
        var path = req.path;

        var ps = path.split('/');

        console.log('ps:', ps);

        var link = ps[1];

        Post.getBySlug(link, function(err, post){
            User.getById(post.author_id, function(err, user){
                if(err){}
                var ps = handle([post], [user]);
                res.render('page', {
                    title : ps[0].title,
                    posts : ps
                });
            });
        });
    },

    //
    index : function(req, res){


        //搜寻所有博客文章，按时间排序
        //携带用户信息
        Post.findAll(function (err, posts) {


            var p_author_id = [], uhash = {};
            for(var i = 0, len = posts.length; i < len; ++i){
                if(!uhash[posts[i].author_id]){
                    uhash[posts[i].author_id] = true;
                    p_author_id.push(posts[i].author_id);
                }
            }
            var o_ids = [];
            for(var i in p_author_id){
                o_ids.push(new ObjectId(p_author_id[i]));
            }
            User.getByIds(o_ids, function(err, users){
                if(err){req.flash('error', 'unknown error')}
                var ps = handle(posts, users);
                var session_user = req.session.user;
                res.render('index', {
                    title : 'index',
                    posts : ps,
                    user : {
                        name : session_user.name,
                        email : session_user.email,
                        bio : session_user.bio,
                        website : session_user.website,
                        image : session_user.image,
                        cover : session_user.cover
                    }
                });
            });
        });



    }

};

module.exports = frontendCrtl;