module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        memberId: String,
        pw1: String,
        pw2: String,
        email: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Member = mongoose.model("member", schema);
    return Member;
  };