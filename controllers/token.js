'use stric'
const jwt = require('jsonwebtoken');

module.exports = {

    getPayload: function(req) {
        var payload = null;


        if (req.headers && req.headers.authorization) {
            var token = req.headers.authorization.split(' ')[1];
            console.log('token');
            console.log(token);
            // try {
            //     payload = jwt.verify();
            //     console.log('after verify');
            //     console.log(payload);
            //     if (!payload) {
            //         return payload;
            //     }
            // } catch {
            //     return payload;
            //     // return res.status(500).send({ message: "No es pot usar aquest token getUserByToken()" });
            // }
            try {
                payload = jwt.decode(token);
                console.log(payload.user._id);
                if (!payload) {
                    return payload;
                } else {
                    return payload.user._id;
                }
            } catch {
                return payload;
                // return res.status(500).send({ message: "No es pot usar aquest token getUserByToken()" });
            }
            // payload = jwt.decode(token);



        } else {
            return payload;
        }
    },

};