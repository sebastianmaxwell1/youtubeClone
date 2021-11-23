const mongoose = require('mongoose');
const Joi = require('joi');
const { replySchema } = require('./comments');


const userSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    reply: { type: [replySchema], default: [] },
});
const User = mongoose.model('User', userSchema);


function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;