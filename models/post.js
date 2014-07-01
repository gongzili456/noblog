var mongodb = require('./base');

var post_table_name = 'posts';

function Post(post) {
    this.uuid = post.uuid;
    this.title = post.title;
    this.slug = post.slug;
    this.markdown = post.markdown;
    this.html = post.html;
    this.image = post.image;
    this.featured = post.featured;
    this.page = post.page;
    this.status = post.status;
    this.language = post.language;
    this.meta_title = post.meta_title;
    this.meta_description = post.meta_description;
    this.author_id = post.author_id;
    this.create_at = post.create_at;
    this.create_by = post.create_by;
    this.updated_at = post.updated_at;
    this.updated_by = post.updated_by;
    this.published_at = post.published_at;
    this.published_by = post.published_by;
}

Post.prototype.save = function(callback){
    var _post = {
        uuid : this.uuid,
        title : this.title,
        slug : this.slug,
        markdown : this.markdown,
        html : this.html,
        image : this.image,
        featured : this.featured,
        page : this.page,
        status : this.status,
        language : this.language,
        meta_title : this.meta_title,
        meta_description : this.meta_description,
        author_id : this.author_id,
        create_at : new Date(),
        create_by : this.create_by,
        updated_at : new Date(),
        updated_by : this.updated_by,
        published_at : new Date(),
        published_by : this.published_by
    };
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection(post_table_name, function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.insert(_post, {
                safe : true
            }, function(err, post) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, post[0]);// success, return user
            });
        });
    });
};

Post.getByAuthorId = function(id, callback){
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection(post_table_name, function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.find({
                author_id : id
            }).toArray(function (err, posts) {
                console.log(posts);
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null, posts);
            });
        });
    });
};

Post.findAll = function(callback){
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection(post_table_name, function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            collection.find(query).sort({published_by : -1}).toArray(function (err, posts) {
                //console.log(posts);
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null, posts);
            });
        });
    });
};

module.exports = Post;