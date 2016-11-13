module.exports = function(app) {
  if (process.env.NODE_ENV !== 'prod' &&
      process.env.NODE_ENV !== 'production') {

    // execute once
    app.dataSources.mysql.automigrate(['User', 'Role', 'ACL', 'RoleMapping', 'AccessToken'], function(err) {
      if (err) throw err;
    });
    
  }
};
