async function getUser() {
  try {
    const res = await axios.get("/users");
    const users = res.data;
    const list = document.getElementById("list");
    list.innerHTML = "";
    console.log(Object.keys(users));
    Object.keys(users).map(function (key) {
      const userDiv = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = users[key];
      const edit = document.createElement("button");
      edit.textContent = "수정";
      edit.addEventListener("click", async () => {
        const name = prompt("바꿀 이름을 입력하세요.");
        if (!name) {
          return alert("이름을 반드시 입력하셔야 합니다.");
        }
        try {
          await axios.put("/user/" + key, { name });
          getUser();
        } catch (err) {
          console.log(err);
        }
      });
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        try {
          await axios.delete("/user/" + key);
          getUser();
        } catch (err) {
          console.log(err);
        }
      });
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
    });
  } catch (err) {
    console.log(err);
  }
}

window.onload = getUser;

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    return alert("이름을 입력하세요.");
  }
  try {
    await axios.post("/user", { name });
    getUser();
  } catch (err) {
    console.log(err);
  }
  e.target.username.value = "";
});
