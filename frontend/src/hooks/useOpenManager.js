// src/hooks/useOpenManager.js
let currentCloser = null;

export function registerOpen(closeFn) {
  if (currentCloser && currentCloser !== closeFn) {
    currentCloser(); // close previously open one
  }
  currentCloser = closeFn;
}

export function unregisterOpen(closeFn) {
  if (currentCloser === closeFn) {
    currentCloser = null;
  }
}