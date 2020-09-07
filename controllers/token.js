'use stric'
const jwt = require('jsonwebtoken');

module.exports = {

    getPayload: function(req) {
        var payload = null;


        if (req.headers && req.headers.authorization) {
            var token = req.headers.authorization.split(' ')[1];

            try {
                payload = jwt.decode(token);

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