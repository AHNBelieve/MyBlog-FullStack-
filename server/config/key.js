if (process.env.NODE_ENV === "production") {
  console.log(process.env);
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
