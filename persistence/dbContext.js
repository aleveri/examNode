var mongoose = require('mongoose');

var context = {};

context.generate = function () {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb+srv://test-admin:29AzPT4qAfndN7fx@seguros-falabella-colombia-xup9t.gcp.mongodb.net/Test?retryWrites=true")
    .then(() => console.log('Db Connection Succesful'))
    .catch((err) => console.error(err));
};

module.exports = context;