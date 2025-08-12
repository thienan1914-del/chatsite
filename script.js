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
  const
::contentReference[oaicite:0]{index=0}
 
