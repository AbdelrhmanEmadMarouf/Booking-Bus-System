// app.js
document.getElementById("sendBtn").addEventListener("click", async () => {
const url = document.getElementById("url").value;
const method = document.getElementById("method").value;
const bodyText = document.getElementById("body").value;

let options = {
method: method,
headers: {
"Content-Type": "application/json"
}
};

if (method === "POST") {
options.body = bodyText;
}

try {
const res = await fetch(url, options);
const data = await res.text();
document.getElementById("result").innerText = data;
} catch (err) {
document.getElementById("result").innerText = err;
}
});
