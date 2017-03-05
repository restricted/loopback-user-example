module.exports = function (User) {

  /**
   * Get /user/example
   *
   * # curl http://localhost:3000/api/user/example
   *
   * @param cb
   * @returns {*}
   */
  User.example = function (cb) {

    /** Access current logined user */
    var user = User.app.user;

    /** EXAMPLE: Access another models */
    var accessToken = User.app.models.accessToken;

    return cb(null, {user: user});

  };

  User.remoteMethod(
    'example',
    {
      description: "Get user",
      accepts: {arg: 'id', type: 'String'},
      http: {verb: 'GET'},
      returns: {arg: 'result', type: 'Object'}
    }
  );


};
