const keys = [
  ['Esc','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'],
  ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
  ['Tab','Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],
  ['Caps','A','S','D','F','G','H','J','K','L',';','\'','Enter'],
  ['Shift','Z','X','C','V','B','N','M',',','.','/','Shift'],
  ['Ctrl','Win','Alt','Space','Alt','Fn','Ctrl','Left','Down','Up','Right']
];

const keyboard = document.getElementById('keyboard');

keys.flat().forEach(key => {
  const keyEl = document.createElement('div');
  keyEl.classList.add('key');
  keyEl.id = `key-${key.toUpperCase()}`;
  keyEl.textContent = key;
  keyboard.appendChild(keyEl);
});

function normalizeKey(key) {
  const special = {
    ' ': 'SPACE',
    'CONTROL': 'CTRL',
    'ARROWLEFT': 'LEFT',
    'ARROWRIGHT': 'RIGHT',
    'ARROWUP': 'UP',
    'ARROWDOWN': 'DOWN',
    'META': 'WIN'
  };
  const name = key.toUpperCase();
  return special[name] || name;
}

document.addEventListener('keydown', (e) => {
  const keyName = normalizeKey(e.key);
  const keyEl = document.getElementById(`key-${keyName}`);
  if (keyEl) {
    keyEl.classList.add('active');
  }
});

document.addEventListener('keyup', (e) => {
  const keyName = normalizeKey(e.key);
  const keyEl = document.getElementById(`key-${keyName}`);
  if (keyEl) {
    keyEl.classList.remove('active');
  }
});
