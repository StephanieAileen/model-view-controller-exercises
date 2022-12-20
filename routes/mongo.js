var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://mongodbserver:jHH0HVSuX4AbNEAMh8KJUpYxixmDkToqzTN4gGnciot8xorsZSdLwjFtzEjWFmnqEWZ2gO2ZIl9yACDbOjDUeg==@mongodbserver.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodbserver@", function (err, db) {
  db.close();
});