const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const linksDevFilePath = path.resolve(__dirname, "links.dev.txt");
const linksProdFilePath = path.resolve(__dirname, "links.prod.txt");

const isProd = process.env.NODE_ENV === "production";

const linksFilePath = isProd ? linksProdFilePath : linksDevFilePath;

async function getLinkFromAlias(alias) {
  const linksFile = await fs.readFile(linksFilePath, "utf-8");
  const links = linksFile
    .split("\n")
    .map((row) => row.split(" "))
    .reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {});
  return links[alias];
}

const server = http.createServer((req, res) => {
  const alias = req.url.slice(1);
  console.log(alias);

  getLinkFromAlias(alias).then((longLink) => {
    if (!longLink) {
      res.statusCode = 404;
      return res.end("Not found");
    } else {
      if (isProd) {
        res.writeHead(302, { Location: encodeURI(longLink) });
        res.end();
      } else {
        console.log(longLink);
        return res.end(longLink);
      }
    }
  });
});

server.listen(3000, () => console.log(process.env.NODE_ENV));
