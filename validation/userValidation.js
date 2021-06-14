const joi = require('joi');

const signupvalidation = (data) => {

    const schema = joi.object({
        username:joi.string().required().min(3),
        email:joi.string().required().email(),
        password:joi.string().required().min(5),
    })

    return schema.validate(data);
}

const signinvalidation = (data) => {
    const schema = joi.object({
        email:joi.string().required().email(),
        password:joi.string().required().min(5),
    })
    return schema.validate(data);
}

module.exports = {
    signinvalidation,
    signupvalidation
}