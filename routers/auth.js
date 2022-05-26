const express = require("express")
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admins = require('../model/admin');


//Sign up
router.post('/registration', async (req, res) => {
    const { name, email, phone, password } = req.body;

    let doctor = await Admins.findOne({ email: email })

    if (doctor) {
        return res.status(422).json({ message: "Also Register with that Email" });
    }

    const NewDoctor = new Admins({ name, email, phone, password });
    const salt = await bcrypt.genSalt(10);//generate a key 
    NewDoctor.password = await bcrypt.hash(NewDoctor.password, salt);
    result = await NewDoctor.save();
    NewDoctor.save().then(() => {
        res.status(201).json({ message: "Admin REgister" });
    }).catch((err) => {
        res.status(500).json({ message: "Admin Not REgister" });

    })
        .catch(err => console.log(message = "Admin Not REgister"))



})

//Sign In

router.post('/Login', async (req, res) => {
    const { email, password } = req.body;


    let user = await Admins.findOne({ email: email })

    if (!user) {
        return res.status(404).json("User Not Register");
    }
    else {
        const pass = await bcrypt.compare(req.body.password, user.password);
        if (pass) {
            const token = user.generateAuthToken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 50000),
                httpOnly: true
            });
            res.header('x-auth-token', token).send({ token: token, name: user.name, userType: user.userType, email: user.email })

        }
        else {
            res.status(400).send("wrong password");

        }

    }



})


module.exports = router;