window.onresize = doLayout;
var isLoading = false;

onload = function() {
  var webview = document.querySelector('webview');
  doLayout();

  // document.querySelector('#home').onclick = function() {
  //   navigateTo('editor.html');
  // };
  //
  // document.querySelector('#reload').onclick = function() {
  //   if (isLoading) {
  //     webview.stop();
  //   } else {
  //     webview.reload();
  //   }
  // };

  // document.querySelector('#reload').addEventListener(
  //   'webkitAnimationIteration',
  //   function() {
  //     if (!isLoading) {
  //       document.body.classList.remove('loading');
  //     }
  //   }
  // );

  // document.querySelector('#about').onclick = function() {
  //   alert("AgileWorks x Trunk Studio 2015");
  // };

  webview.addEventListener('close', handleExit);
  webview.addEventListener('did-start-loading', handleLoadStart);
  webview.addEventListener('did-stop-loading', handleLoadStop);
  webview.addEventListener('did-fail-load', handleLoadAbort);
  webview.addEventListener('did-get-redirect-request', handleLoadRedirect);
  webview.addEventListener('did-finish-load', handleLoadCommit);
};

function navigateTo(url) {
  //resetExitedState();
  document.querySelector('webview').src = url;
}

function doLayout() {
  var webview = document.querySelector('webview');
  var controls = document.querySelector('#controls');
  var controlsHeight = controls.offsetHeight;
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';

  var sadWebview = document.querySelector('#sad-webview');
  sadWebview.style.width = webviewWidth + 'px';
  sadWebview.style.height = webviewHeight * 2/3 + 'px';
  sadWebview.style.paddingTop = webviewHeight/3 + 'px';
}

function handleExit(event) {
  console.log(event.type);
  document.body.classList.add('exited');
  if (event.type == 'abnormal') {
    document.body.classList.add('crashed');
  } else if (event.type == 'killed') {
    document.body.classList.add('killed');
  }
}

function resetExitedState() {
  /*
  document.body.classList.remove('exited');
  document.body.classList.remove('crashed');
  document.body.classList.remove('killed');
  */
}

function findBoxObscuresActiveMatch(findBoxRect, matchRect) {
  return findBoxRect.left < matchRect.left + matchRect.width &&
      findBoxRect.right > matchRect.left &&
      findBoxRect.top < matchRect.top + matchRect.height &&
      findBoxRect.bottom > matchRect.top;
}

function handleLoadCommit() {
  resetExitedState();
  var webview = document.querySelector('webview');
}

function handleLoadStart(event) {
  // document.body.classList.add('loading');
  isLoading = true;

  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }
}

function handleLoadStop(event) {
  // We don't remove the loading class immediately, instead we let the animation
  // finish, so that the spinner doesn't jerkily reset back to the 0 position.
  isLoading = false;
}

function handleLoadAbort(event) {
  console.log('LoadAbort');
  console.log('  url: ' + event.url);
  console.log('  isTopLevel: ' + event.isTopLevel);
  console.log('  type: ' + event.type);
}

function handleLoadRedirect(event) {
  resetExitedState();
}

const ipcRenderer = require('electron').ipcRenderer;

function startVm() {
  navigateTo('editor.html');
  ipcRenderer.send('start vm')
  return;
}

function stopVm() {
  navigateTo('editor.html');
  ipcRenderer.send('stop vm')
  return;
}

function restartVm() {
  navigateTo('editor.html');
  ipcRenderer.send('restart vm')
  return;
}

// ipcRenderer.on('start vm res', function(event, arg) {
//   //alert(arg);
// });
//
// ipcRenderer.on('stop vm res', function(event, arg) {
//   //alert(arg);
// });
//
// ipcRenderer.on('restart vm res', function(event, arg) {
//   //alert(arg);
// });

require('electron').webFrame.setZoomLevelLimits(1, 1)
