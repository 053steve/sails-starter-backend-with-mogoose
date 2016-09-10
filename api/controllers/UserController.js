const UserController = {

    list(req, res) {
        User.find({}, (err, users) => {
            res.ok(users);
        });
    },

    create(req, res) {
        User.create(req.allParams(), (err, user) => {
            if (err) {
                return res.send(err);
            }
            return res.ok(user);
        });
    },

    findById(req, res) {        
        User.findById(req.param('id'), function (err, found) {
            if (err) return res.send(err);
            res.send(found);
        });
    },

    update(req, res) {
        User.findByIdAndUpdate(req.param('id'), {
            $set: req.allParams()
        }, (err, updatedUser) => {
            if (err) return res.send(err);
            res.send(updatedUser);
        });
    },

    delete(req, res) {
        User.findByIdAndRemove(req.param('id'), (err, deletedUser) => {
            if(err){
                return res.send(err);
            }
            return res.ok(deletedUser);

        });
    },



    dashboard(req, res) {
        res.send('You are logged in');
    },

};

module.exports = UserController;