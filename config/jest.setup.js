// jest.setup.js
const chrome = require('sinon-chrome/extensions');

// Object.assign(global, require('sinon-chrome'));
chrome.runtime.id = 'testid';
global.browser = chrome;

/*
  Mock-implementation of chrome.runtime messaging API
*/
const Messager = () => {
  const _listeners = [];

  return {
    onMessage: {
      addListener: (cb) => _listeners.push(cb),
    },

    onDisconnect: {
      addListener: (cb) => {},
    },

    postMessage: (data) => {
      _listeners.forEach((cb) => cb.call(this, data));
    },
  };
};

chrome.runtime.connect.returns(Messager());
