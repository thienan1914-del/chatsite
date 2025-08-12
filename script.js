document.getElementById('loginBtn').addEventListener('click', () => {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
});

document.getElementById('registerBtn').addEventListener('click', () => {
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
});

document.getElementById('login').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.username === username && storedUser.password === password) {
    alert('Đăng nhập thành công');
    localStorage.setItem('isLoggedIn', 'true');
    toggleLoginState();
  } else {
    alert('Tên người dùng hoặc mật khẩu không đúng');
  }
});

document.getElementById('register').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  const user = { username, password };
  localStorage.setItem('user', JSON.stringify(user));
  alert('Đăng ký thành công');
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('isLoggedIn');
  toggleLoginState();
});

document.getElementById('post').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('postTitle').value;
  const content = document.getElementById('postContent').value;
  const file = document.getElementById('postFile').files[0];
  const postDiv = document.createElement('div');
  postDiv.innerHTML = `<h3>${title}</h3><p>${
::contentReference[oaicite:0]{index=0}
 
