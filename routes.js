const fs = require("fs");

const routeHander = (req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><head><title></title></head><body style='margin-left:40px;margin-top:40px;'>"
    );
    res.write(
      '<form method="POST" action="/message"><input type="text" name="message" /> <button type="submit">ok</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && req.method == "POST") {
    const body = [];
    req.on("data", (data) => {
      body.push(data);
    });

    req.on("end", () => {
      const parserdata = Buffer.concat(body).toString();
      const data = parserdata.split("=")[1].split("+").join(" ");

      fs.writeFile("message.txt", data, () => {
        console.log(data);
      });
    });

    res.statusCode = 302;

    return res.end();
  }
};

module.exports = routeHander;
