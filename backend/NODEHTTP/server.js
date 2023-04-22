// Require http module (core node module)
const http = require("http");

const todos = [
  { id: 1, text: "Todo One" },
  { id: 2, text: "Todo Two" },
  { id: 3, text: "Todo Three" },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = [];

  req
    // keep pushing onto body until we reach "end"?
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      let status = 404;
      const response = {
        success: false,
        data: null,
        error: null,
      };

      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, text } = JSON.parse(body);

        // simple validation
        if (!id || !text) {
          status = 400;
          response.error = "Please add id and text";
        } else {
          todos.push({ id, text });
          // Success (Created)
          status = 201;
          response.success = true;
          response.data = todos;
        }
      }

      res.writeHead(status, {
        "Content-Type": "application/json",
        "X-Powered-By": "Node.js",
      });

      res.end(JSON.stringify(response));
    });
});

// const server = http.createServer((req, res) => {
//   // res.statusCode = 404;
//   // res.setHeader("Content-Type", "application/json");
//   // // let's you know what kind of server it is
//   // res.setHeader("X-Powered-By", "Node.js");

//   res.writeHead(400, {
//     "Content-Type": "application/json",
//     "X-Powered-By": "Node.js",
//   });

//   let body = [];

//   req
//     .on("data", (chunk) => {
//       body.push(chunk);
//     })
//     .on("end", () => {
//       // body = Buffer.concat(body);
//       body = Buffer.concat(body).toString();
//       console.log(body);
//     });

//   res.end(
//     // have to stringify because we set header content-type to JSON
//     JSON.stringify({
//       success: false,
//       error: "Please add email",
//       data: null,
//     })
//   );
// });

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
