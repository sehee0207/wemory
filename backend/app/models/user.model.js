const bcrypt = require('bcrypt');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String
      },
      salt: {
        type: String
      }
    },
    { timestamps: true }
  );

  schema.pre('save', function(next) {
    const user = this;
    const saltFactor = 10;
    bcrypt.genSalt(saltFactor, (err, salt) => { // create salt
      if (err) return next(err);
      user.salt = salt;
    
      bcrypt.hash(user.password, salt, (err, hash) => {  // create Hash
        if (err) return next(err);
        user.password = hash;  // save Hash
        next();
      });
    });
  });

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};