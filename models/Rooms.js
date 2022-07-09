const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  id: {
    type: String,
    unique:true,
    required: true,
  },
  name: String,
  users: {
    type: [
      {
        email: {
            type: String,
            required : true
        },
        logedAt: {
          type: Date,
          immutable: true,
          default: () => Date.now(),
        },
      },
    ],
    required: true,
  },
  messages: [
    {
      user: {
        type: String,
      },
      value: {
        type: String,
        required: true,
      },
      sendAt: {
        type: Date,
        required: true,
        default: () => Date.now(),
      },
    },
  ],
  isGroup : {
    type : Boolean,
    default:  false,
  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
  },

});






module.exports = mongoose.model("Room", roomSchema);