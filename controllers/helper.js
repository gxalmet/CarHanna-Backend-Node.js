'use stric'
const bcrypt = require('bcryptjs');

const helper = {};

helper.encryptPassword = async(password) => {

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    return hash;
};

helper.matchPassword = async(password, savedpassword) => {

    const res = await bcrypt.compare(savedpassword, password);


    return res;
};

module.exports = helper;