document.addEventListener('DOMContentLoaded', function () {
  // Lưu tài khoản khi đăng ký
  document.getElementById('register').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
      alert('Tài khoản đã tồn tại!');
      return;
    }
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Đăng ký thành công!');
    this.reset();
  });

  // Xử lý đăng nhập
  document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
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

  // Hiện/ẩn form theo trạng thái đăng nhập
  function showPostForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('postForm').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'inline-block';
  }
  if (localStorage.getItem('currentUser')) {
    showPostForm();
  }

  // Nút bật form đăng nhập/đăng ký
  document.getElementById('loginBtn').onclick = () => {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
  };
  document.getElementById('registerBtn').onclick = () => {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
  };

  // Hiển thị bài đăng đã lưu
  function displayPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        ${post.image}
      `;
      postsContainer.appendChild(postDiv);
    });
  }
  displayPosts();

  // Xử lý đăng bài
  document.getElementById('post').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const file = document.getElementById('postFile').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
      const imgTag = file && file.type.startsWith('image/') ?
        `<img src="${event.target.result}" alt="Hình ảnh" style="max-width: 300px;">` : '';

      const posts = JSON.parse(localStorage.getItem('posts') || '[]');
      posts.push({title, content, image: imgTag});
      localStorage.setItem('posts', JSON.stringify(posts));

      displayPosts();
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      const posts = JSON.parse(localStorage.getItem('posts') || '[]');
      posts.push({title, content, image: ''});
      localStorage.setItem('posts', JSON.stringify(posts));

      displayPosts();
    }
    this.reset();
  });

  // Hiệu ứng LED phím game
  const keys = document.querySelectorAll('.key');
  const colors = ['#FF3C38', '#38FF8A', '#3C83FF', '#FFD138', '#FF38E0', '#38FFF7'];

  keys.forEach(key => {
    key.addEventListener('click', () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      key.style.backgroundColor = randomColor;
      key.style.color = '#121212';
      key.style.boxShadow = `0 0 15px ${randomColor}`;
    });
  });
});
