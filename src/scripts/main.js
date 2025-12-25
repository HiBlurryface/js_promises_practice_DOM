'use strict';

function firstPromise() {
  return new Promise((resolve, reject) => {
    document.addEventListener('mousedown', function (e) {
      if (e.button === 0) {
        resolve('First promise was resolved');
      }
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    document.addEventListener('mousedown', function (e) {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    });
  });
}

function thirdPromise() {
  return new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    document.addEventListener('mousedown', function (e) {
      if (e.button === 0) {
        leftClick = true;
      }

      if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick === true && rightClick === true) {
        resolve('Third promise was resolved');
      }
    });
  });
}

async function runPromises() {
  try {
    const first = await firstPromise();

    showMessage(first, 'success');
  } catch (error) {
    showMessage(error.message, 'error');
  }

  const second = await secondPromise();

  showMessage(second, 'success');

  const third = await thirdPromise();

  showMessage(third, 'success');
}

runPromises();

function showMessage(text, type) {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.classList.add(type);
  message.textContent = text;
  document.body.appendChild(message);
}
