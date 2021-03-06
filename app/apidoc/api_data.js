define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/friend/getAllFriendList",
    "title": "Get array of friendList",
    "version": "1.0.0",
    "group": "Friend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"All Friend List Found\",\n   \"status\": 200,\n   \"data\": [\n       {\n           \"FriendListId\": \"bZHCnZtY7\",\n           \"createdOn\": \"2019-07-10T16:13:17.569Z\",\n           \"status\": \"friend\",\n           \"user2Name\": \"xyz xyz\",\n           \"user2Id\": \"X5RI-Yxvd\",\n           \"user1Name\": \"abc abcd\",\n           \"user1Id\": \"6rC3xVs-h\"\n       },\n       {\n           \"FriendListId\": \"Hclu6yD7p\",\n           \"createdOn\": \"2019-07-07T16:20:20.872Z\",\n           \"status\": \"request\",\n           \"user2Name\": \"ffhhj\",\n           \"user2Id\": \"EGJXNofn_\",\n           \"user1Name\": \"ugh gvh\",\n           \"user1Id\": \"X5RI-Yxvd\"\n       }\n   ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"Error mesage\",\n        \"status\": 500/404,\n        \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/otherRoutes.js",
    "groupTitle": "Friend",
    "name": "GetApiV1FriendGetallfriendlist"
  },
  {
    "type": "get",
    "url": "/api/v1/list/getAllList/:userId",
    "title": "Get All todo lists",
    "version": "1.0.0",
    "group": "List",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>to be passed as a URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All lists found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5d2ad7550dfd263b54d7e2dd\",\n            \"__v\": 0,\n            \"listModifiedOn\": \"2019-07-07T07:18:29.626Z\",\n            \"listCreatedOn\": \"2019-07-06T07:16:34.342Z\",\n            \"listBelongsTo\": \"X5RI-Yxvd\",\n            \"listModifierName\": \"\",\n            \"listModifierId\": \"\",\n            \"listCreatorName\": \"abc abds\",\n            \"listCreatorId\": \"X5RI-Yxvd\",\n            \"listName\": \"ghhhhh\",\n            \"listId\": \"hHeDtFY_O\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error message\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/otherRoutes.js",
    "groupTitle": "List",
    "name": "GetApiV1ListGetalllistUserid"
  },
  {
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "Retrieve All User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All User Details Found\",\n           \"status\": 200,\n           \"data\": [{\n                   \"createdOn\": \"2019-05-27T08:32:32.000Z\",\n                   \"mobileNumber\": 0,\n                   \"email\": \"ojasmodi88@gmail.com\",\n                   \"password\": \"$2b$10$FfOzzEwPgtWG5otdEHFAaewHeV9j6Xl7LNGcz4QyJr2HoMqcG04iO\",\n                   \"lastName\": \"modi\",\n                   \"firstName\": \"ojas\",\n                   \"userId\": \"SIpbjGUsh\"\n               }]\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "login User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Login successful\",\n           \"status\": 200,\n           \"data\": {\n               \"authToken\": \"string\",\n               \"userId\": \"string\",\n               \"userDetails\": {\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"string\",\n                   \"fullName\": \"firstName lastName\",\n                   \"email\": \"string\",\n                   \"mobileNumber\": \"number\"\n               }\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "Logout User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Logged Out Successfully\",\n           \"status\": 200,\n           \"data\": \"null\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersLogout"
  },
  {
    "type": "post",
    "url": "/api/v1/users/resetpass",
    "title": "Reset password",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"A new password has been sent to your registered mailId.\",\n           \"status\": 200,\n           \"data\": null\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersResetpass"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signGoogle",
    "title": "Login with Google",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"error\": false,\n       \"message\": \"Login successful\",\n       \"status\": 200,\n       \"data\": {\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"tring\",\n                   \"email\": \"string\",\n                   \"mobileNumber\": \"number\"\n               }\n           }\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/400,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersSigngoogle"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "SignUp User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobileNo",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"error\": false,\n       \"message\": \"User created\",\n       \"status\": 200,\n       \"data\": {\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"tring\",\n                   \"email\": \"string\",\n                   \"mobileNumber\": \"number\"\n               }\n           }\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersSignup"
  },
  {
    "type": "get",
    "url": "/api/v1/item/getAllItems",
    "title": "Get All tems with their subitems",
    "version": "1.0.0",
    "group": "item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Items Found and Listed\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5d2ad75b0dfd263b54d7e2de\",\n            \"__v\": 0,\n            \"subItems\": [\n                {\n                    \"subItemId\": \"WqqfYvsNE\",\n                    \"subItemName\": \"mmm\",\n                    \"parentItemId\": \"q23rURnpu\",\n                    \"subItemBelongsTo\": \"X5RI-Yxvd\",\n                    \"subItemCreatorId\": \"X5RI-Yxvd\",\n                    \"subItemCreatorName\": \"sdf ghj\",\n                    \"subItemCreatedOn\": \"2019-07-04T05:18:56.000Z\",\n                    \"subItemModifiedOn\": \"2019-07-03T07:12:42.005Z\",\n                    \"subItemModifierId\": \"X5RI-Yxvd\",\n                    \"subItemModifierName\": \"abcd abcd\",\n                    \"subItemDone\": \"done\",\n                    \"_id\": \"5d2ad7830dfd263b54d7e2e3\"\n                },\n            ],\n            \"itemDone\": \"open\",\n            \"itemBelongsTo\": \"X5RI-Yxvd\",\n            \"itemModifierName\": \"\",\n            \"itemModifierId\": \"\",\n            \"itemModifiedOn\": \"2019-07-06T12:07:10.000Z\",\n            \"itemCreatedOn\": \"2019-07-04T11:18:29.621Z\",\n            \"itemCreatorName\": \"dfg hjk\",\n            \"itemCreatorId\": \"X5RI-Yxvd\",\n            \"itemName\": \"oo\",\n            \"itemId\": \"q23rURnpu\",\n            \"listId\": \"hHeDtFY_O\"\n        },\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error message\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/otherRoutes.js",
    "groupTitle": "item",
    "name": "GetApiV1ItemGetallitems"
  }
] });
