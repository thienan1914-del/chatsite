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

// --- AI Chat với GPT4All local ---
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userMessage");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<div><b>Bạn:</b> ${message}</div>`;
  input.value = "";

  try {
    // Gọi GPT4All local server (Python/Node) trên localhost:5000
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    const reply = data.reply || "Xin lỗi, AI không trả lời được.";
    chatBox.innerHTML += `<div><b>AI:</b> ${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<div><b>AI:</b> Lỗi khi kết nối server GPT4All.</div>`;
    console.error(err);
  }
});

// --- Lưu bài viết Firebase (Ẩn danh) ---
document.getElementById('post').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('postTitle').value.trim();
  const content = document.getElementById('postContent').value.trim();

  const postData = {
    title,
    content,
    author: 'Ẩn danh',
    timestamp: Date.now()
  };

  database.ref('posts').push(postData)
    .then(() => {
      alert('Đăng bài thành công!');
      e.target.reset();
      loadPosts();
    })
    .catch(error => alert(error.message));
});

// --- Hiển thị bài viết ---
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

// --- Phím nhấn nháy ---
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  let elementId = null;

  if (key === 'w') elementId = 'keyW';
  if (key === 'a') elementId = 'keyA';
  if (key === 's') elementId = 'keyS';
  if (key === 'd') elementId = 'keyD';
  if (event.code === 'Space') elementId = 'keySpace';

  if (elementId) {
    const el = document.getElementById(elementId);
    if (el) el.classList.add('active');
  }
});

document.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();
  let elementId = null;

  if (key === 'w') elementId = 'keyW';
  if (key === 'a') elementId = 'keyA';
  if (key === 's') elementId = 'keyS';
  if (key === 'd') elementId = 'keyD';
  if (event.code === 'Space') elementId = 'keySpace';

  if (elementId) {
    const el = document.getElementById(elementId);
    if (el) el.classList.remove('active');
  }
});

// --- Tải bài khi mở trang ---
loadPosts();
