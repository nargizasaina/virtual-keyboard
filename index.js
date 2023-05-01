let keyboard = [
  ['`', 'ё', 'Backquote'], ['1', '1', 'Digit1'], ['2', '2', 'Digit2'], ['3', '3', 'Digit3'], ['4', '4', 'Digit4'], 
  ['5', '5', 'Digit5'], ['6', '6', 'Digit6'], ['7', '7', 'Digit7'], ['8', '8', 'Digit8'], ['9', '9', 'Digit9'], 
  ['0', '0', 'Digit0'], ['-', '-', 'Minus'], ['=', '=', 'Equal'], ['backspace', 'backspace', 'Backspace'],
  ['tab', 'tab', 'Tab'], ['q', 'й', 'KeyQ'], ['w', 'ц', 'KeyW'], ['e', 'у', 'KeyE'], ['r', 'к', 'KeyR'], 
  ['t', 'е', 'KeyT'], ['y', 'н', 'KeyY'], ['u', 'г', 'KeyU'], ['i', 'ш', 'KeyI'], ['o', 'щ', 'KeyO'], 
  ['p', 'з', 'KeyP'], ['[', 'х', 'BracketLeft'], [']', 'ъ', 'BracketRight'], ['\\', '|', 'Backslash'],
  ['caps lock', 'caps lock', 'CapsLock'], ['a', 'ф', 'KeyA'], ['s', 'ы', 'KeyS'], ['d', 'в', 'KeyD'], 
  ['f', 'а', 'KeyF'], ['g', 'п', 'KeyG'], ['h', 'р', 'KeyH'], ['j', 'о', 'KeyJ'], ['k', 'л', 'KeyK'], 
  ['l', 'д', 'KeyL'], [';', 'ж', 'Semicolon'], ["'", 'э', 'Quote'], ['enter', 'enter', 'Enter'],
  ['shift', 'shift', 'ShiftLeft'], ['z', 'я', 'KeyZ'], ['x', 'ч', 'KeyX'], ['c', 'с', 'KeyC'], 
  ['v', 'м', 'KeyV'], ['b', 'и', 'KeyB'], ['n', 'т', 'KeyN'], ['m', 'ь', 'KeyM'], [',', 'б', 'Comma'], 
  ['.', 'ю', 'Period'], ['/', '.', 'Slash'], ['↑', '↑', 'ArrowUp'], ['shift', 'shift', 'ShiftRight'],
  ['ctrl', 'ctrl', 'ControlLeft'], ['alt', 'alt', 'AltLeft'], ['space', 'пробел', 'Space'], 
  ['alt', 'alt', 'AltRight'], ['ctrl', 'ctrl', 'ControlRight'], ['←', '←', 'ArrowLeft'], ['↓', '↓', 'ArrowDown'], ['→', '→', 'ArrowRight']
];

const body = document.body;
const root = document.createElement('div');
root.className = "root";
body.append(root);
const info = document.createElement('div');
info.className = 'info';
info.innerHTML = "INFO: Press Shift + Alt to change the language";
const textPart = document.createElement('div');
const title = document.createElement('h3');
title.innerHTML = "Virtual Keyboard";
const textArea = document.createElement('textarea');
textArea.setAttribute("rows", 5);
textPart.append(title);
textPart.append(textArea);
root.append(info);
root.append(textPart);
let board;

let capsLock = false,
    value = '',
    isEnglish = true,
    main = null,
    textarea = null,
    keysContainer = null,
    keys = [];

const toggleCapsLock = () => {
  capsLock = !capsLock;

  document.querySelectorAll('.letters').forEach((key) => {
    capsLock ? key.innerHTML = key.innerHTML.toUpperCase() : key.innerHTML = key.innerHTML.toLowerCase();
  });
};

localStorage.getItem('isEnglish') !== null ? 
  localStorage.getItem('isEnglish') === true ? isEnglish = true : isEnglish = false 
  : isEnglish === true;

const addKey = () => {
  board = document.createElement('div');
  board.className = "board";
  root.append(board);
  keyboard.map(item => {
    const key = document.createElement('div');
    key.className = "key";
    key.setAttribute('data-name', item[2]);
    let nextLine = ['Backspace', 'Backslash', 'Enter', 'ShiftRight'].indexOf(item[2]) !== -1;

    switch (item[0]) {
      case 'backspace':
        key.className = "key wide-btn";
        key.innerHTML = item[0];

        key.addEventListener('click', () => {
          let text = textArea.value;
          textArea.value = text.slice(0, text.length - 1);
        });
        break;

      case 'tab':
        key.className = "key wide-btn";
        key.innerHTML = item[0];

        key.addEventListener('click', () => {
          textArea.value += '\t';
        }); 
        break;

      case 'caps lock':
        key.className = "key wide-btn";
        key.innerHTML = item[0];

        key.addEventListener('click', () => {
            toggleCapsLock();
        });
        break;

      case 'enter':
        key.className = "key wide-btn";
        key.innerHTML = item[0];

        key.addEventListener('click', () => {
          textArea.value += '\n';
        });
        break;

      case 'shift':
        key.className = "key wide-btn";
        key.innerHTML = item[0];
        key.addEventListener('mousedown', () => {
          toggleCapsLock();
        });
        key.addEventListener('mouseup', () => {
          toggleCapsLock();
        });
        break;

      case 'ctrl':
        key.className = "key wide-btn";
        key.innerHTML = item[0];
        break;

      case 'alt':
        key.className = "key wide-btn";
        key.innerHTML = item[0];
        break;

      case 'space':
        key.className = "key space-btn";
        key.innerHTML = item[0];

        key.addEventListener('click', () => {
          textArea.value += ' ';
        });
        break;

      default: {
        key.classList.add('letters');
        let [, letter] = item;
        if (isEnglish) {
          [letter] = item;
        }
        key.innerHTML = letter;

        key.addEventListener('click', () => {
          if (capsLock) {
            textArea.value += letter.toUpperCase();
          } else {
            textArea.value += letter;
          }
        });
        break;
      }
    }

    board.append(key);
    if (nextLine) {
        board.appendChild(document.createElement('br'));
    }
  });
  return board;
};

const imitateKeyboard = () => {
  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    switch (e.code) {
      case 'Backspace':
        let text = textArea.value;
        textArea.value = text.slice(0, text.length - 1);
        break;

      case 'Tab':
        textArea.value += '\t';
        break;

      case 'CapsLock':
        toggleCapsLock();
        break;

      case 'Enter':
        textArea.value += '\n';
        break;

      case 'ShiftLeft':
      case 'ShiftRight':
        toggleCapsLock();
        break;

      case 'ControlLeft':
      case 'ControlRight':
      case 'AltLeft':
      case 'AltRight':
        break;

      case 'Space':
        textArea.value += ' ';
        break;

      default:
        keyboard.forEach((item) => {
          if (item[2] === e.code) {
            if (isEnglish) {
              if (capsLock) {
                textArea.value += item[0].toUpperCase();
              } else {
                textArea.value += item[0].toLowerCase();
              }
            } else {
              if (capsLock) {
                textArea.value += item[1].toUpperCase();
              } else {
                textArea.value += item[1].toLowerCase();
              }
            }
          } 
        });
    }
    
    const needed = document.querySelector('div[data-name=' + e.code);
    needed && needed.classList.add('active');
  });

  document.addEventListener('keyup', (e) => {
    try {
      document.querySelector('div[data-name=' + e.code).classList.remove('active');
      if (e.code === 'ShiftLeft' || e.code === 'ShiftLeft') {
      toggleCapsLock();
      }
    } catch (e) {
      console.log('You clicked on wrong key');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  localStorage.getItem('isEnglish') === true ? isEnglish = true : isEnglish = false;
});

const addShortcuts = () => {
  const pressed = new Set();
  document.addEventListener('keydown', (e) => {
    pressed.add(e.code);
    if ((pressed.has('AltLeft') && pressed.has('ShiftLeft')) ||
        (pressed.has('AltLeft') && pressed.has('ShiftRight')) || 
        (pressed.has('AltRight') && pressed.has('ShiftLeft')) || 
        (pressed.has('AltRight') && pressed.has('ShiftRight'))) {
          isEnglish = !isEnglish;
          localStorage.setItem('isEnglish', isEnglish);
          board.remove();
          addKey();
        }
  });

  document.addEventListener('keyup', (e) => {
    pressed.delete(e.code);
  });
}

addKey();
imitateKeyboard();
addShortcuts();