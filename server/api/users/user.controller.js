const responseHandler = require('../helpers/helperFunction')
const User = require('../users/user.service');
const { validationResult } = require('express-validator');

const getUsers = (req, res) => {
    try {
        const { id } = req.params;

        User.retrieve({
            'action': id ? 'one' : 'all',
            'id': id ? id : null
        }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
    }
};

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(responseHandler(false, 400, errors.array()[0].msg, null));
    }
    try {
        // Register user in the database
        await User.register(new User(req.body), (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(true, 500, 'Server Error', null));
    }
};

module.exports =  {
    getUsers,
    register
};