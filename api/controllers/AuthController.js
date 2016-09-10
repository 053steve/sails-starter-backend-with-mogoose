/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */
var passport = require('passport');
/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {

    if (error) return res.serverError(error);
    if (!user) return res.unauthorized(null, info && info.code, info && info.message);

    req.session.authenticated = true;
    let data = {
        user: user,
        token: CipherService.createToken(user)
    }
    res.send(data);



}


module.exports = {
    /**
     * Sign up in system
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    signup: function(req, res) {

        User
            .create(_.omit(req.allParams(), 'id'))
            .then(function(user) {

                return {
                    // TODO: replace with new type of cipher service
                    token: CipherService.createToken(user),
                    user: user                    
                };
            })
            .then(function(created) {
                res.ok(created);
            })
            .catch(res.serverError);
    },

    /**
     * Sign in by local strategy in passport
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    signin: function(req, res) {        
        passport.authenticate('local', _onPassportAuth.bind(this, req, res))(req, res);
    },

    // this is used only for session
    logout: function(req, res) {
        req.logout();

        // mark the user as logged out for auth purposes
        req.session.authenticated = false;
        res.redirect('/');
    },

    
    resetpass: function(req, res) {
        var userId = req.param('id');
        User.findOne({
            id: userId
        })
        .then(function(user){
            
            if(CipherService.comparePassword(req.param('oldPassword'), user)){
                User
                .update({
                    id: userId
                }, {
                    password: req.param('newPassword'),
                })
                .then(function(user) {                    
                    return {
                        token: CipherService.createToken(user[0]),
                        user: user,                    
                        isSuccess: true,
                        msg: "User Password Updated"                    
                    };
                })
                .then(function(created) {
                    res.ok(created);
                });
            }else{
                res.badRequest({
                    isSuccess: false,
                    msg: "Sorry The Old Password Doesn't Match"
                })
            }            
        });

        
    },



    // login: function(req, res) {
    //     res.view({
    //         layout: 'layout-back'
    //     });
    // }

};