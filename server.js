// const express = require("express");
//const PORT = process.env.PORT || 3019;
// const app = express();

const CLI = require("./lib/interactions.js");

function init() {
  CLI.promptUser();
}

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   CLI.promptUser();
// });

init();
