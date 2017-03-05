/**
 * User middleware
 *
 * @returns {Function}
 */
module.exports = function () {

  return function (req, res, next) {

    var app = req.app;

    /** Ensure user not exists in app, avoid race condition */
    app.user = false;

    app.models.accessToken.findForRequest(req, {model: app.models.accessToken}, function (err, token) {
      if (err) {
        return next(err);
      }
      req.accessToken = token || null;
      if (!req.accessToken) return next();

      app.models.User.findById(req.accessToken.userId, function (err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).send();
        }

        user = user.toJSON();
        app.user = user;
        next();
      });
    });
  };
};
