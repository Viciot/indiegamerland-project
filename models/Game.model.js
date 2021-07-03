const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
  username: {type: String, unique: true},
  password: {type: String, required: [true, "Password is required"]},
  email: {type: String, match: [ /^\S+@\S+\.\S+$/ , "Please input a valid email"], lowercase: true},
  playedGames: [{ type: Schema.Types.ObjectId, ref: "Game", default: []}]
  }
);

const User = model("User", userSchema);

// Game model{name, genre, ???}

module.exports = Game;