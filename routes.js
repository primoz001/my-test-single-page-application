const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }

  if (url === "/users" && method === "GET") {
    req.on("data", (chunk) => {
      console.log(chunk);
    });

    return req
      .on("end", () => {
        const existingUsers = JSON.parse(localStorage.getItem("users"));
        if (existingUsers) {
          res.statusCode = 200;
          res.write(JSON.stringify(existingUsers));
        }
        return res.end();
      })
      .on("error", (err) => {
        res.statusCode = 500;
        throw err;
      });
  }
  if (url === "/signup" && (method === "OPTIONS" || method === "POST")) {
    let data = '';
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    return req
      .on("end", () => {
        let existingUsers = [];
        const users = JSON.parse(localStorage.getItem("users"));
        if (users) {
          existingUsers = users;
        }
        existingUsers.push(JSON.parse(data));
        localStorage.setItem('users', JSON.stringify(existingUsers));
        res.statusCode = 200;
        res.write(JSON.stringify(data));
        return res.end();
      })
      .on("error", (err) => {
        res.statusCode = 500;
        throw err;
      });
  }
};

module.exports = requestHandler;
