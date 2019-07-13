const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
const UserModel = mongoose.model('User')
const nodeMailerLibrary = require('./../libs/nodemailer')

/* Get all user Details */
let getAllUsers = (req, res) => {
    UserModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all users

let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not meet the requirement', 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                }
                else {
                    resolve(req)
                }
            }
            else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    } // end validate user input details


    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email }).exec((err, retrievedUserDetails) => {
                if (err) {
                    logger.error(err.message, 'userController: createUser', 10)
                    let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                    reject(apiResponse)
                }
                else if (check.isEmpty(retrievedUserDetails)) {
                    console.log(req.body)
                    let newUser = new UserModel({
                        userId: shortid.generate(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName || '',
                        email: req.body.email.toLowerCase(),
                        mobileNumber: req.body.mobileNumber,
                        password: passwordLib.hashpassword(req.body.password),
                        createdOn: time.now()
                    })
                    newUser.save((err, newUser) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: createUser', 10)
                            let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                            reject(apiResponse)
                        } else {
                            let newUserObj = newUser.toObject();
                            delete newUserObj.password;
                            resolve(newUserObj)
                        }
                    })
                }
                else {
                    logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                    let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null);
                    reject(apiResponse);

                }
            })
        })
    }// end create user function

    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })


}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {

    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there")
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userData)=>{
                    if (err) {
                        console.log(err)
                        logger.error('failed to retrieve user details', 'userController:findUser()', 10);
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    }
                    else if (check.isEmpty(userData)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    }
                    else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userData)
                    }
                })
            }
            else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

    // end of findUser function

    let validatePassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, userDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                }
                else if (isMatch) {
                    let retrievedUserDetailsObj = userDetails.toObject();
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                }
                else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }
    //end of validating password

    let generateToken = (userDetails) => {
        console.log("generate token")
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err);
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                }
                else {
                    tokenDetails.userId = userDetails.userId;
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveToken = (tokenDetails) => {
        console.log("save token");
        console.log(tokenDetails)
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req,res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            //res.status(err.status)
            res.send(err)
        })
}
// end of the login function 

/**
 * function to logout user.
 * auth params: userId.
 */
let logout = (req, res) => {
  AuthModel.findOneAndRemove({userId: req.user.userId}, (err, result) => {
    if (err) {
        console.log(err)
        logger.error(err.message, 'user Controller: logout', 10)
        let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
        res.send(apiResponse)
    } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
        res.send(apiResponse)
    } else {
        let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
        res.send(apiResponse)
    }
  })
} // end of the logout function.

let signUpGoogle=(req,res) =>{
    let googleUser = new UserModel({
        userId: shortid.generate(),
        firstName: req.body.firstName,
        lastName: req.body.lastName || '',
        fullName: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email.toLowerCase(),
        createdOn: time.now()
    });


    let createUser = () => {
        return new Promise((resolve, reject) => {
            googleUser.save((err, result) => {
                if (err) {
                    logger.error(`${err}`, "UserController: loginWithGoogle(): createUser()", "high");
                    let apiResponse = (true, "Error while creating user", 500, null);
                    reject(apiResponse);
                } else {
                    let User = result.toObject();
                    delete User.password;
                    delete User._id;
                    delete User.__v;
                    delete User.createdOn;
                    resolve(User);
                }
            });
        });
    } //end of createUser

    let generateToken = (userDetails) => {
        console.log("generate token")
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err);
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                }
                else {
                    tokenDetails.userId = userDetails.userId;
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }// end of generate token


    let saveToken = (tokenDetails) => {
        console.log("save token");
        console.log(tokenDetails)
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }// end of save token 

    //checking if user exists
    UserModel.findOne({email: req.body.email}).lean().exec((err, result) => {
        if(err) {
            logger.error(`${err}`, "UserController: loginWithGoogle(): find User", "high");
            let apiResponse = response.generate(true, "Server Error", 500, null);
            res.send(apiResponse);
        } else if(check.isEmpty(result)) {
            createUser(req, res)
            .then(generateToken)
            .then(saveToken)
            .then((resolve) => {
                let apiResponse = response.generate(false, "Login successful", 200, resolve);
                console.log(apiResponse)
                res.send(apiResponse);
            }).catch((err) => {
                console.log(err)
                res.send(err);
            });
        } else {
            delete result._id;
            delete result.__v;
            delete result.password;
            generateToken(result)
            .then(saveToken)
            .then((resolve) => {
                let apiResponse = response.generate(false, "Login successful", 200, resolve);
                console.log(apiResponse)
                res.send(apiResponse);
            }).catch((err) => {
                console.log(err)
                res.send(err);
            });
        }
    })
}

let changePassword= (req,res)=>{
    UserModel.findOne({ email:req.body.email },(err,result)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: changePassword', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'User with this mail is not registered!', 404, null)
            res.send(apiResponse)
        } else {
            result=result.toObject();
            let newPassword = shortid.generate()
            let hashpassword= passwordLib.hashpassword(newPassword);
            updatePassword(result.email,{'password':hashpassword},(err,data)=>{
                if(err){
                    logger.error(err.message, 'user Controller: changePassword', 10)
                    let apiResponse = response.generate(true, `Error occurred: ${err.message}`, 500, null)
                    res.send(apiResponse)
                }
                else{
                    let data={
                        from: 'issueHub@gmail.com', // sender address
                        to: result.email, // list of receivers
                        subject: "Password recovery ✔", // Subject line
                        html: `<b>Your password request granted.</b><br><p>Login with this password :</p> ${newPassword}`, // html body
                     }
                     //console.log(data);
                     nodeMailerLibrary.sendMailer(data,(err,info)=>{
                        if(err){
                         console.log(err)
                         logger.error(err.message, 'user Controller: changePassword:nodemailer', 10)
                         let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                         res.send(apiResponse)
                        }
                        else{
                         let apiResponse = response.generate(false, 'A new password has been sent to your registered mailId.', 200, null)
                         res.send(apiResponse)
                        }
                     });
                }

            })
        }
    })
}


let getSingleUser = (req, res) => {
    UserModel.findOne({ 'userId': req.params.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser',20)
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user

let updatePassword = (email,options,cb)=>{
    UserModel.update({ 'email': email }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Training Controller:editTrainer', 10)
            cb(err,null)
        } else {
            cb(null,"done");
        }
    });
}


module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout,
    changePassword:changePassword,
    getAllUser:getAllUsers,
    getSingleUser:getSingleUser,
    signUpGoogle:signUpGoogle

}// end exports