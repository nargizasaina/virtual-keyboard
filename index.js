// let en = 
//   ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
//   'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
//   'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
//   'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift', 
//   'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'], 
// shiftedEn = 
//   ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
//   'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
//   'Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
//   'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift', 
//   'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'], 
// ru = 
//   ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
//   'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
//   'Caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', "э", 'Enter',
//   'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift', 
//   'Ctrl', 'Win', 'Alt', 'Пробел', 'Alt', 'Ctrl', '←', '↓', '→'],
// shiftedRu = 
//   ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
//   'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\',
//   'Caps', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', "Э", 'Enter',
//   'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift', 
//   'Ctrl', 'Win', 'Alt', 'Пробел', 'Alt', 'Ctrl', '←', '↓', '→'];

let keyboard = [
    ['`', 'ё', 'backquote'], ['1', '1', 'one'], ['2', '2', 'two'], ['3', '3', 'three'], ['4', '4', 'four'], 
    ['5', '5', 'five'], ['6', '6', 'six'], ['7', '7', 'seven'], ['8', '8', 'eight'], ['9', '9', 'nine'], 
    ['0', '0', 'zero'], ['-', '-', 'minus'], ['=', '=', 'equal'], ['backspace', 'backspace', 'backspace'],
    ['Tab', 'Tab', 'tab'], ['q', 'й', 'keyQ'], ['w', 'ц', 'keyW'], ['e', 'у', 'keyE'], ['r', 'к', 'keyR'], 
    ['t', 'е', 'keyT'], ['y', 'н', 'keyY'], ['u', 'г', 'keyU'], ['i', 'ш', 'keyI'], ['o', 'щ', 'keyO'], 
    ['p', 'з', 'keyP'], ['[', 'х', 'bracketOpen'], [']', 'ъ', 'bracketClose'], ['\\', '|', 'backslash'],
    ['caps lock', 'caps lock', 'capsLock'], ['a', 'ф', 'keyA'], ['s', 'ы', 'keyS'], ['d', 'в', 'keyD'], 
    ['f', 'а', 'keyF'], ['g', 'п', 'keyG'], ['h', 'р', 'keyH'], ['j', 'о', 'keyJ'], ['k', 'л', 'keyK'], 
    ['l', 'д', 'keyL'], [';', 'ж', 'semicolon'], ["'", 'э', 'quote'], ['Enter', 'Enter', 'enter'],
    ['shift', 'shift', 'shiftLeft'], ['z', 'я', 'keyZ'], ['x', 'ч', 'keyX'], ['c', 'с', 'keyC'], 
    ['v', 'и', 'keyV'], ['b', 'и', 'keyB'], ['n', 'т', 'keyN'], ['m', 'ь', 'keyM'], [',', 'б', 'comma'], 
    ['.', 'ю', 'dot'], ['/', '.', 'slash'], ['shift', 'shift', 'shiftRight'],
    ['ctrl', 'ctrl', 'controlLeft'], ['alt', 'alt', 'altLeft'], ['space', 'пробел', 'space'], 
    ['alt', 'alt', 'altRight'], ['ctrl', 'ctrl', 'controlRight'],
  ];

const body = document.body;
const root = document.createElement('div');
root.className = "root";
body.append(root);

const textPart = document.createElement('div');
const title = document.createElement('h3');
title.innerHTML = "Virtual Keyboard";
const textArea = document.createElement('textarea');
textArea.setAttribute("rows", 5);
textPart.append(title);
textPart.append(textArea);
const board = document.createElement('div');
board.className = "board";
root.append(textPart);
root.append(board);

let capsLock = false,
    value = '',
    lang = "en",
    main = null,
    textarea = null,
    keysContainer = null,
    keys = [];

const toggleCapsLock = () => {
  capsLock = !capsLock;
};

const addKey = () => {
  keyboard.map(item => {
    const key = document.createElement('div');
    key.className = "key";
    const nextLine = ['backspace', '\\', 'enter', '/'].indexOf(item[0]) !== -1;

    switch (item[0]) {
      case 'backspace':
        key.className = "key wide-btn";
        key.innerHTML = item[0];

        key.addEventListener('click', () => {
          textArea.value = textArea.value.slice(0, textArea.length - 1);
        });
        break;

      case 'tab':
        key.className = "key wide-btn";
        key.innerHTML = item[0];

        key.addEventListener('click', () => {
        textArea.value += '\t';
        }); 
        break;

      case 'capsLock':
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
        let [, letter] = item;
        if (!lang === 'en') {
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
  });
};

addKey();