const express = require("express");
const app = express();

app.use(express.json());

app.post("/login", (req, res, next) => {
  const { id, pwd } = req.body;
  if (id === "boy941210" && pwd === "qwe123")
    console.log("welcome to Login world!");
});

app.use((req, res, next) => {
  if (req.body.input == "3") {
    console.log("3확인, 첫번째 미들웨어 가동");
    return res.end("발동");
  }
  console.log("적어도 3은 아니네요");
  next();
});

app.use((req, res, next) => {
  if (req.body.input === 5) {
    console.log("5확인, 두번째 미들웨어 가동");
    return res.send("발동");
  }
  console.log("적어도 5도 아니네요");
  next();
});

app.use((req, res, next) => {
  if (req.body.input === 7) {
    console.log("7확인, 세번째 미들웨어 가동");
    return res.send("발동");
  }
  console.log("3,5,7 셋 다 아니네요.");
});

app.set("private_key", 38);

app.get("/", () => {
  console.log("get 방식으로 들어왔스예");
  console.log(JSON.stringify("eqweq"));
});

app.post("/privateKey", (req, res) => {
  res.status(200).json({ "보여?": `${app.get("private_key")}` });
  console.log(Number(`${app.get("private_key")}`) + req.body.input);
});

app.listen(3000, () => console.log("서버가 시작되긴 한 걸까?"));
