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

// ==========================
// --- AI Chat với GPT4All ---
// ==========================
document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("userMessage").addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage(); // Nhấn Enter để gửi
});

async function sendMessage() {
  const input = document.getElementById("userMessage");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<div><b>Bạn:</b> ${message}</div>`;
  input.value = "";

  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    const reply = data.reply || "Xin lỗi, AI không trả lời được.";
    chatBox.innerHTML += `<div><b>AI:</b> ${reply}</div>`;
  } catch (err) {
    chatBox.innerHTML += `<div><b>AI:</b> Lỗi khi kết nối server GPT4All.</div>`;
    console.error(err);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// ===============================
// --- Lưu và hiển thị bài viết ---
// ===============================
document.getElementById('post').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('postTitle').value.trim();
  const content = document.getElementById('postContent').value.trim();
  if (!title || !content) return alert("Vui lòng nhập đầy đủ tiêu đề và nội dung");

  const postData = {
    title,
    content,
    author: 'Ẩn danh',
    timestamp: Date.now()
  };

  database.ref('posts').push(postData)
    .then(() => {
      e.target.reset();
      loadPosts();
    })
    .catch(error => alert("Lỗi lưu bài: " + error.message));
});

function loadPosts() {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';
  database.ref('posts').orderByChild('timestamp').once('value', snapshot => {
    snapshot.forEach(childSnapshot => {
      const post = childSnapshot.val();
      postsContainer.appendChild(createPostElement(post));
    });
  });
}

function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <small>Đăng bởi: ${post.author || 'Ẩn danh'}</small>
  `;
  return postElement;
}

// ===============================
// --- Hiệu ứng phím WASD + Space ---
// ===============================
const keyMap = {
  w: "keyW",
  a: "keyA",
  s: "keyS",
  d: "keyD",
  " ": "keySpace"
};

document.addEventListener('keydown', e => toggleKey(e, true));
document.addEventListener('keyup', e => toggleKey(e, false));

function toggleKey(event, isActive) {
  const id = keyMap[event.key.toLowerCase()];
  if (id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("active", isActive);
  }
}

// --- Load bài viết khi mở trang ---
loadPosts();
