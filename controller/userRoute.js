const express = require("express");
const User = require("../model/user");
const validation = require("../validation/userValidation");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Router = express();

Router.post('/signup', async (req, res) => {

     const { error } = await validation.signupvalidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const emailuser = await User.findOne({email: req.body.email});
     if(emailuser) return res.status(400).send("email already present");

     const salt = await bcrypt.genSalt(10);
     const hashpass = await bcrypt.hash(req.body.password, salt);

     const user = new User({
         username:req.body.username,
         email:req.body.email,
         password:hashpass,
     })
     await user.save()
     .then((data) => {
         res.status(200).json(data);
     })
     .catch((err) => {
         res.status(404).json(err);
     })
})


Router.post('/signin', async (req, res) => {
     const { error } = await validation.signinvalidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const emailUser = await User.findOne({email: req.body.email});
     if(!emailUser) return res.status(400).send("email doesn't exist");

     const validpass = await bcrypt.compare(req.body.password, emailUser.password);
     if(!validpass) return res.status(400).send("not a valid password");

     const userToken = await jwt.sign({email: req.body.email}, 'vaishnavan');
     res.header('auth', userToken).send(userToken);

})

const validuser = (req, res, next) => {
    var tokendata = req.header('auth');
    req.userToken = tokendata;
    next();
}


Router.get('/getall', validuser, async (req, res) => {

    jwt.verify(req.userToken, 'vaishnavan', async (err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
                await User.find()
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((err) => {
                    res.status(404).json(err);
                })
        }
    })    
})

module.exports = Router;    