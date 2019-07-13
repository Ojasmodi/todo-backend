const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;


    app.get(`${baseUrl}/view/all`,auth.isAuthorized, userController.getAllUser);
    /**
     * @api {get} /api/v1/users/view/all Retrieve All User
     * @apiVersion 1.0.0
     * @apiGroup User
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter)
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "All User Details Found",
            "status": 200,
            "data": [{
                    "createdOn": "2019-05-27T08:32:32.000Z",
                    "mobileNumber": 0,
                    "email": "ojasmodi88@gmail.com",
                    "password": "$2b$10$FfOzzEwPgtWG5otdEHFAaewHeV9j6Xl7LNGcz4QyJr2HoMqcG04iO",
                    "lastName": "modi",
                    "firstName": "ojas",
                    "userId": "SIpbjGUsh"
                }]
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

   app.post(`${baseUrl}/signup`, userController.signUpFunction);
    /**
     * @api {post} /api/v1/users/signup SignUp User
     * @apiVersion 1.0.0
     * @apiGroup User
     *
	 * @apiParam {String} firstName body parameter
	 * @apiParam {String} lastName body parameter
	 * @apiParam {String} email body parameter
     * @apiParam {String} mobileNo body parameter
	 * @apiParam {String} password body parameter
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": "User created",
        "status": 200,
        "data": {
                    "userId": "string",
                    "firstName": "string",
                    "lastName": "tring",
                    "email": "string",
                    "mobileNumber": "number"
                }
            }
        }
    }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
	*/
    app.post(`${baseUrl}/signGoogle`, userController.signUpGoogle);
    /**
     * @api {post} /api/v1/users/signGoogle Login with Google
     * @apiVersion 1.0.0
     * @apiGroup User
     * 
     * 
	 * @apiParam {String} firstName body parameter
	 * @apiParam {String} lastName body parameter
	 * @apiParam {String} email body parameter
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": "Login successful",
        "status": 200,
        "data": {
                    "userId": "string",
                    "firstName": "string",
                    "lastName": "tring",
                    "email": "string",
                    "mobileNumber": "number"
                }
            }
        }
    }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/400,
	    "data": null
	   }
	 */

    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
     * @api {post} /api/v1/users/login login User
     * @apiVersion 1.0.0
     * @apiGroup User
     *
	 * @apiParam {String} email body parameter
	 * @apiParam {String} password body parameter
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Login successful",
            "status": 200,
            "data": {
                "authToken": "string",
                "userId": "string",
                "userDetails": {
                    "userId": "string",
                    "firstName": "string",
                    "lastName": "string",
                    "fullName": "firstName lastName",
                    "email": "string",
                    "mobileNumber": "number"
                }
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.post(`${baseUrl}/resetpass`, userController.changePassword);
     /**
     * @api {post} /api/v1/users/resetpass Reset password
     * @apiVersion 1.0.0
     * @apiGroup User
     *
	 * @apiParam {String} email body parameter
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "A new password has been sent to your registered mailId.",
            "status": 200,
            "data": null
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */
    

    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);
    /**
     * @api {post} /api/v1/users/logout Logout User
     * @apiVersion 1.0.0
     * @apiGroup User
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": "null"
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
	*/

}
