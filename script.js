// Khởi tạo Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5sIo8_htHOwCq2b25d7BYsZoc9TJP3SI",
  authDomain: "chatsite-2ba82.firebaseapp.com",
  databaseURL: "https://chatsite-2ba82-default-rtdb.firebaseio.com",
  projectId: "chatsite-2ba82",
  storageBucket: "chatsite-2ba82.appspot.com",
  messagingSenderId: "655887521279",
  appId: "1:655887521279:web:0b63a1f9530996a154c3ca"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
  // Load users và currentUser từ localStorage (đăng nhập đăng ký vẫn localStorage)
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const currentUser = localStorage.getItem('currentUser');

  function showPostForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('postForm').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'inline-block';
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('registerBtn').style.display = 'none';
  }

  function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('postForm').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'inline-block';
    document.getElementById('registerBtn').style.display = 'inline-block';
  }

  if (currentUser) {
    showPostForm();
  } else {
    showLoginForm();
  }

  // Đăng ký
  document.getElementById('register').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    if (users[username]) {
      alert('Tài khoản đã tồn tại!');
      return;
    }
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Đăng ký thành công!');
    e.target.reset();
  });

  // Đăng nhập
  document.getElementById('login').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (users[username] === password) {
      localStorage.setItem('currentUser', username);
      alert('Đăng nhập thành công!');
      showPostForm();
    } else {
      alert('Sai tài khoản hoặc mật khẩu!');
    }
  });

  // Đăng xuất
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.reload();
  });

  // Nút chuyển form đăng nhập/đăng ký
  document.getElementById('loginBtn').addEventListener('click', () => {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
  });
  document.getElementById('registerBtn').addEventListener('click', () => {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
  });

  // Tạo post HTML
  function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    const imgTag = post.image ? `<img src="${post.image}" alt="Hình ảnh" style="max-width: 300px;">` : '';
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      ${imgTag}
      <hr>
      <small>Đăng bởi: ${post.author}</small>
    `;
    return postDiv;
  }

  // Load posts từ Firebase realtime
  function loadPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    database.ref('posts').on('value', snapshot => {
      postsContainer.innerHTML = ''; // xóa cũ
      const posts = snapshot.val();
      if (posts) {
        Object.values(posts).forEach(post => {
          postsContainer.appendChild(createPostElement(post));
        });
      }
    });
  }
  loadPosts();

  // Xử lý đăng bài
  document.getElementById('post').addEventListener('submit', e => {
    e.preventDefault();

    if (!localStorage.getItem('currentUser')) {
      alert('Bạn cần đăng nhập để đăng bài.');
      return;
    }

    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    const file = document.getElementById('postFile').files[0];
    const author = localStorage.getItem('currentUser');

    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const newPost = {
          title,
          content,
          image: event.target.result,
          author
        };
        database.ref('posts').push(newPost).then(() => {
          alert('Đăng bài thành công!');
          e.target.reset();
        });
      };
      reader.readAsDataURL(file);
    } else {
      const newPost = {
        title,
        content,
        image: '',
        author
      };
      database.ref('posts').push(newPost).then(() => {
        alert('Đăng bài thành công!');
        e.target.reset();
      });
    }
  });

  // Hiệu ứng LED cho các phím
  const keys = document.querySelectorAll('.key');
  const colors = ['#FF3C38', '#38FF8A', '#3C83FF', '#FFD138', '#FF38E0', '#38FFF7'];

  keys.forEach(key => {
    key.addEventListener('click', () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      key.style.backgroundColor = randomColor;
      key.style.color = '#121212';
      key.style.boxShadow = `0 0 15px ${randomColor}`;
      setTimeout(() => {
        key.style.backgroundColor = '';
        key.style.color = '';
        key.style.boxShadow = '';
      }, 1000);
    });
  });
});
