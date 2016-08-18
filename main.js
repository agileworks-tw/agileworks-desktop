var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;
app.on('window-all-closed', function() {
  app.quit();
});

function startVM() {
  var cmd = 'VBoxManage startvm AgileWorksReactNative --type headless';
  exec(cmd, function(error, stdout, stderr) {
    console.log(error, stdout, stderr);
  });
}

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    resizable: true,
    title: "React Native Dojo - AgileWorks"
  });
  mainWindow.loadURL('file://' + __dirname + '/browser.html');
  // mainWindow.openDevTools();

  startVM();
});


const ipcMain = require('electron').ipcMain;
const exec = require('child_process').exec;

ipcMain.on('start vm', function(event, arg) {

  var cmd = 'VBoxManage startvm AgileWorksReactNative --type headless';

  exec(cmd, function(error, stdout, stderr) {
    console.log(error, stdout, stderr);
    var result = '';

    if(stderr !== '')
      result = 'vm 啟動失敗，請確認是否已啟動';
    else
      result = 'vm start sucess'

    event.sender.send('start vm res', result);

  });

  event.returnValue = 'success';
  return;
});

ipcMain.on('stop vm', function(event, arg) {

  var cmd = 'VBoxManage controlvm AgileWorksReactNative acpipowerbutton';

  exec(cmd, function(error, stdout, stderr) {
    console.log(error, stdout, stderr);

    var result = '';

    if(stderr !== '')
      result = stderr;
    else
      result = 'vm stop sucess'

    event.sender.send('stop vm res', result);

  });
  event.returnValue = 'success';
  return;
});

ipcMain.on('restart vm', function(event, arg) {

  var cmd = 'VBoxManage controlvm AgileWorksReactNative reset';

  exec(cmd, function(error, stdout, stderr) {
    console.log(error, stdout, stderr);

    var result = '';

    if(stderr !== '') {
      result = stderr;
    }
    else {
      result = 'vm restart sucess'
    }

    event.sender.send('restart vm res', result);

  });
  event.returnValue = 'success';
  return;
});
