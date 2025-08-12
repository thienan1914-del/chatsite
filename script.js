// Khởi tạo Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5sIo8_htHOwCq2b25d7BYsZoc9TJP3SI",
  authDomain: "chatsite-2ba82.firebaseapp.com",
  databaseURL: "https://chatsite-2ba82-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "chatsite-2ba82",
  storageBucket: "chatsite-2ba82.appspot.com",
  messagingSenderId: "655887521279",
  appId: "1:655887521279:web:0b63a1f9530996a154c3ca"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

// Thiết lập trạng thái đăng nhập
auth.onAuthStateChanged(user => {
  if (user) {
    localStorage.setItem('currentUser', user.uid);
    showPostForm();
  } else {
    localStorage.removeItem('currentUser');
    showLoginForm();
  }
});

// Hiển thị form đăng bài khi người dùng đã đăng nhập
function showPostForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('postForm').style.display = 'block';
  document.getElementById('logoutBtn').style.display = 'inline-block';
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('registerBtn').style.display = 'none';
}

// Hiển thị form đăng nhập/đăng ký khi người dùng chưa đăng nhập
function showLoginForm() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('postForm').style.display = 'none';
  document.getElementById('logoutBtn').style.display = 'none';
  document.getElementById('loginBtn').style.display = 'inline-block';
  document.getElementById('registerBtn').style.display = 'inline-block';
}

// Đăng ký
document.getElementById('register').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert('Đăng ký thành công!');
      e.target.reset();
    })
    .catch(error => {
      alert(error.message);
    });
});

// Đăng nhập
document.getElementById('login').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert('Đăng nhập thành công!');
      e.target.reset();
    })
    .catch(error => {
      alert(error.message);
    });
});

// Đăng xuất
document.getElementById('logoutBtn').addEventListener('click', () => {
  auth.signOut()
    .then(() => {
      alert('Đăng xuất thành công!');
    })
    .catch(error => {
      alert(error.message);
    });
});

// Chuyển đổi giữa form đăng nhập và đăng ký
document.getElementById('loginBtn').addEventListener('click', () => {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
});
document.getElementById('registerBtn').addEventListener('click', () => {
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
});

// Tạo phần tử bài viết HTML
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

// Tải bài viết từ Firebase Realtime Database
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

