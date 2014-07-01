var mongodb = require('./base');

var user_table_name = 'users';

function User(user) {
    this.uuid = user.uuid;
    this.name = user.name;
    this.slug = user.slug;
    this.password = user.password;
    this.email = user.email;
    this.image = user.image;
    this.cover = user.cover;
    this.bio = user.bio;
    this.website = user.website;
    this.location = user.location;
    this.status = user.status;
    this.language = user.language;
    this.meta_title = user.meta_title;
    this.meta_description = user.meta_description;
    this.last_login = user.last_login;
    this.create_at = user.create_at;
    this.create_by = user.create_by;
    this.updated_at = user.updated_at;
    this.updated_by = user.updated_by;
}


User.prototype.save = function(callback){

    var user = {
        name : this.name,
        slug : this.slug,
        password : this.password,
        email : this.email,
        image : this.image,
        cover : this.cover,
        bio : this.bio,
        website : this.website,
        location : this.location,
        status : this.status,
        language : this.language,
        meta_title : this.meta_title,
        meta_description : this.meta_description,
        last_login : this.last_login,
        create_at : new Date(),
        create_by : this.create_by,
        updated_at : new Date(),
        updated_by : this.updated_by
    };

    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection(user_table_name, function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.insert(user, {
                safe : true
            }, function(err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user[0]);// success, return user
            });
        });
    });

};

User.get = function(email, callback){
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection(user_table_name, function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                email : email
            }, function(err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user);// success, return user info
            });
        });
    });
};

module.exports = User;
