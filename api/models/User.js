let findOrCreate = require('mongoose-findorcreate')
const User = {


    schema: {
        username: String,
        email: String,
        password: String,
        firstname: String,
        lastname: String,        
        phone_num: String,
        mobile_num: String,
        role: {type: String, enum: ['ADMIN', 'USER']},
        billing_address1: String,
        billing_address2: String,
        city: String,
        region: String,
        country: String,
        zipcode: String,
    },

    constructSchema: function(schemaDefinedAbove, sails) {
        // e.g. we might want to pass in a second argument to the schema constructor
        

        var newSchema = new sails.mongoose.Schema(schemaDefinedAbove, {
            autoIndex: false,
            collection: 'user'
        });

        newSchema.plugin(findOrCreate);

        newSchema.pre('save', function(next) {                        
            CipherService.hashPassword(this);
            next();
        })

        newSchema.pre('update', function(next) {
            CipherService.hashPassword(this);
            next();
        })

        // Or we might want to define an instance method:
        // newSchema.method('meow', function() {
        //     console.log('meeeeeoooooooooooow');
        // });

        // // Or a static ("class") method:
        // newSchema.static('findByName', function(name, callback) {
        //     return this.find({
        //         name: name
        //     }, callback);
        // });

        // Regardless, you must return the instantiated Schema instance.
        return newSchema;
    }


};

module.exports = User;