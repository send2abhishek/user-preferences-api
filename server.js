// import modules
const app = require("./index");
const http = require("http");
const config = require("config");
// create server
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// host server at given port
server.listen(PORT, () => {
  console.log(config.get("App"), PORT);
});

module.exports = server;
