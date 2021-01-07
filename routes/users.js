const { User, validate } = require('../models/user');
const auth = require('../middlewares/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

//Post User
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'boards']));
    const salty = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salty);
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
});

// Get User
router.get('/:id', auth, async (req, res) => {
    const user = await User.findOne({
        _id: req.params.id,
    });
    if (!user) return res.status(404).send('User not found');
    res.send(user);
})

module.exports = router;