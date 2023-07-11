const bcrypt = require('bcrypt');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      memberId: {
        type: String,
        required: true,
        unique: true
      },
      pw1: {
        type: String,
        required: true
      },
      pw2: {
        type: String,
        required: true
      },
      email: {
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
    
      bcrypt.hash(user.pw1, salt, (err, hash) => {  // create Hash
        if (err) return next(err);
        user.pw1 = hash;  // save Hash
        user.pw2 = hash;
        next();
      });
    });
  });

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Member = mongoose.model("member", schema);
  return Member;
};