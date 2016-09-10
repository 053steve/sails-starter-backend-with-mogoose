const db_init = {
    createRootUser(cb) {
        console.log('Boot Root Starting');
        const root = {
            title: 'MR',
            firstname: 'Steve',
            lastname: 'Suranant',
            email: '053steve@gmail.com',
            password: 'hello1234!',
            role: 'ADMIN',
            phone_num: '+66946246699',
            billing_address1: '17 Ratchamankala Soi.1',
            billing_address2: 'T.Prasing',
            city: 'Muang',
            region: 'Chiangmai',
            country: 'Thailand',
            zipcode: '50200'            
        };
        
        User
            .findOrCreate({
                email: root.email
            }, {
                title: root.title,
                firstname: root.firstname,
                lastname: root.lastname,
                email: root.email,
                password: root.password,
                phone_num: root.phone_num,
                billing_address1: root.billing_address1,
                billing_address2: root.billing_address2,
                city: root.city,
                region: root.region,
                country: root.country,
                zipcode: root.zipcode,
                role: root.role
            }, (err, user) => {

                CipherService.createToken(user)
                console.log('Boot Root Success!');


            });
    },

};

module.exports = db_init;