const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.readFile("text.json", "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error reading the JSON file");
      } else {
        try {
          const jData = JSON.parse(data);
          const resp = {
            msg: "Data retrieved !!",
            existingData: jData,
          };
          const respData = JSON.stringify(resp);

          fs.appendFile("data.txt", data + "\n", "utf8", (err) => {
            if (err) {
              res.statusCode = 500;
              res.end("Error to file");
            } else {
              res.setHeader("Content-Type", "application/json");
              res.end(respData);
            }
          });
        } catch (err) {
          res.statusCode = 500;
          res.end("Error parsing JSON");
        }
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Data Not found");
  }
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
});
