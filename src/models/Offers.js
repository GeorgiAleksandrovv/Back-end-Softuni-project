const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  name: { type: String, require: true, minLength: 10, },
  type: { type: String, require: true, minLength: 2, },
  production: { type: Number, require: true, validate:{
    validator:function (value){
      return value >= 1900 && value <= 2023;
    },
    message:`Value must be between 1900 and 2023`
  } },
  exploitation: { type: Number, require: true, minLength: 0 },
  damages: { type: String, require: true, minLength: 10, },
  image: { type: String, require: true, match: [/^(https?:\/\/)/] },
  price: { type: Number, require: true, minLength: 0 },
  description: { type: String, require: true, minLength: 10, maxLength: 200 },
  owner: {
    type: mongoose.Types.ObjectId,
    ref:"User",
  },
  buyers: [{
    type: mongoose.Types.ObjectId,
    ref:"User",
    require: true,
  }],
});

const offer = mongoose.model("offer", offerSchema);
module.exports = offer;
