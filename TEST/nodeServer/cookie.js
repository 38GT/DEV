const http = require("http");
http
  .createServer((req, res) => {
    console.log("__________요청 도착!, 주소: " + req.url + "__________");
    console.log("응답 전 cookie: " + req.headers.cookie);
    console.log("쿠키 세팅 전");
    res.writeHead(200, {
      "Set-Cookie": "mycookie=test",
      "Content-Type": "text/html; charset=utf-8",
    });
    console.log("쿠키 세팅 후");
    res.end("쿠키 값: " + req.headers.cookie);
    console.log(" 응답 후 cookie: " + req.headers.cookie);
    console.log("__________응답 완료!, 주소: " + req.url + "__________");
  })
  .listen(8083, () => {
    console.log("8083번 포트에서 대기중");
  });
