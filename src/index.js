const worker = new Worker('worker.js');

worker.addEventListener('message', e => {
  console.log('Worker said: ', e.data);
}, false);

worker.postMessage({action: 'read'});
