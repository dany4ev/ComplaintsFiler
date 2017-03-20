var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'complaintsfiler'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/complaintsfiler-development',
    storage: rootPath + '/data/complaintsfiler-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'complaintsfiler'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/complaintsfiler-test',
    storage: rootPath + '/data/complaintsfiler-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'complaintsfiler'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/complaintsfiler-production',
    storage: rootPath + 'data/complaintsfiler-production'
  }
};

module.exports = config[env];
