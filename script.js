// --- Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyC5sIo8_htHOwCq2b25d7BYsZoc9TJP3SI",
  authDomain: "chatsite-2ba82.firebaseapp.com",
  databaseURL: "https://chatsite-2ba82-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "chatsite-2ba82",
  storageBucket: "chatsite-2ba82.appspot.com",
  messagingSenderId: "655887521279",
  appId: "1:655887521279:web:0b63a1f9530996a154c3ca"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

// --- Chat AI (Ollama Proxy) ---
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userMessage");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<div><b>Bạn:</b> ${message}</div>`;
  input.value = "";

  try {
    const res = await fetch("http://localhost:4891/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2", // tên model chuẩn
        messages: [{ role: "user", content: message }]
      })
    });

    if (!res.ok) throw new Error("Không kết nối được Ollama server");

    const data = await res.json();
    // Ollama trả về định dạng hơi khác GPT4All
    const reply = data?.completion || data?.choices?.[0]?.message?.content || "Xin lỗi, AI không trả lời được.";

    chatBox.innerHTML += `<div><b>AI:</b> ${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<div><b>AI:</b> Lỗi khi kết nối Ollama server.</div>`;
    console.error("Lỗi Ollama:", err);
  }
});

// --- Đăng bài (có file ảnh) ---
document.getElementById("post").addEventListener("submit", async e => {
  e.preventDefault();
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();
  const file = document.getElementById("postFile").files[0];

  let fileURL = null;

  try {
    if (file) {
      const storageRef = storage.ref("uploads/" + Date.now() + "_" + file.name);
      await storageRef.put(file);
      fileURL = await storageRef.getDownloadURL();
    }

    const postData = {
      title,
      content,
      fileURL,
      author: "Ẩn danh",
      timestamp: Date.now()
    };

    await database.ref("posts").push(postData);

    alert("Đăng bài thành công!");
    e.target.reset();
    loadPosts();
  } catch (error) {
    alert("Lỗi khi đăng bài: " + error.message);
  }
});

// --- Hiển thị bài viết ---
function loadPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  database.ref("posts").orderByChild("timestamp").on("value", snapshot => {
    postsContainer.innerHTML = "";
    snapshot.forEach(childSnapshot => {
      const post = childSnapshot.val();
      postsContainer.appendChild(createPostElement(post));
    });
  });
}

function createPostElement(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    ${post.fileURL ? `<img src="${post.fileURL}" style="max-width:200px; display:block; margin-top:5px;">` : ""}
    <small>Đăng bởi: ${post.author || "Ẩn danh"}</small>
  `;
  return postElement;
}

// --- Phím nhấn nháy ---
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  let elementId = null;

  if (key === "w") elementId = "keyW";
  if (key === "a") elementId = "keyA";
  if (key === "s") elementId = "keyS";
  if (key === "d") elementId = "keyD";
  if (event.code === "Space") elementId = "keySpace";

  if (elementId) {
    const el = document.getElementById(elementId);
    if (el) el.classList.add("active");
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  let elementId = null;

  if (key === "w") elementId = "keyW";
  if (key === "a") elementId = "keyA";
  if (key === "s") elementId = "keyS";
  if (key === "d") elementId = "keyD";
  if (event.code === "Space") elementId = "keySpace";

  if (elementId) {
    const el = document.getElementById(elementId);
    el.classList.remove("active");
  }
});

// --- Tải bài khi mở trang ---
loadPosts();
