// Biến hue cho đổi màu nền mượt
let hue = 0;
setInterval(() => {
    document.body.style.backgroundColor = `hsl(${hue}, 60%, 90%)`;
    hue = (hue + 1) % 360;
}, 50);

function addPost() {
    let title = document.getElementById('title').value.trim();
    let content = document.getElementById('content').value.trim();
    let imageFile = document.getElementById('image').files[0];

    if (!title || !content) {
        alert("Vui lòng nhập Tiêu đề và Nội dung");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(e) {
        let imgTag = imageFile ? `<img src="${e.target.result}" alt="Hình ảnh">` : '';
        document.getElementById('posts').innerHTML = `
            <div class="post">
                <h3>${escapeHtml(title)}</h3>
                <p>${escapeHtml(content)}</p>
                ${imgTag}
            </div>
        ` + document.getElementById('posts').innerHTML; // Hiển thị bài mới lên trên
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        document.getElementById('posts').innerHTML = `
            <div class="post">
                <h3>${escapeHtml(title)}</h3>
                <p>${escapeHtml(content)}</p>
            </div>
        ` + document.getElementById('posts').innerHTML;
    }

    // Xóa dữ liệu form
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('image').value = '';
}

// Hàm đơn giản tránh nhập HTML nguy hiểm (ví dụ <script>)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
