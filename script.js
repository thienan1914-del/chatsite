// Tạo layout bàn phím cơ bản (có thể thêm nhiều phím hơn)
const keys = [
  ['Esc','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'],
  ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
  ['Tab','Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],
  ['Caps','A','S','D','F','G','H','J','K','L',';','\'','Enter'],
  ['Shift','Z','X','C','V','B','N','M',',','.','/','Shift'],
  ['Ctrl','Win','Alt','Space','Alt','Fn','Ctrl','Left','Down','Up','Right']
];

const keyboard = document.getElementById('keyboard');

// Tạo phím trên web
keys.flat().forEach(key => {
  const keyEl = document.createElement('div');
  keyEl.classList.add('key');
  keyEl.id = `key-${key}`;
  keyEl.textContent = key;
  keyboard.appendChild(keyEl);
});

// RGB hiệu ứng khi nhấn phím
document.addEventListener('keydown', (e) => {
  const keyName = e.key.length === 1 ? e.key.toUpperCase() : e.key;
  const keyEl = document.getElementById(`key-${keyName}`);
  if (keyEl) {
    // random màu RGB
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    keyEl.style.background = `rgb(${r},${g},${b})`;
  }
});

document.addEventListener('keyup', (e) => {
  const keyName = e.key.length === 1 ? e.key.toUpperCase() : e.key;
  const keyEl = document.getElementById(`key-${keyName}`);
  if (keyEl) {
    keyEl.style.background = '#222'; // reset màu
  }
});
