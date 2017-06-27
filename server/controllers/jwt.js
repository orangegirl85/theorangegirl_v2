const jwt = require('jwt-simple');
const moment = require('moment');

module.exports =  (user, res) => {
    let payload = {
        sub: user.id,
        exp: moment().add(10, 'days').unix()
    }

    const token = jwt.encode(payload, "shhh..");

    let user1 = user;
    delete user1.password;

    res.status(200).send({
        user: user1,
        token: token
    });
}