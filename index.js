const electron = require('electron')
const {app, BrowserWindow} = electron

app.on('ready', function(){
	let win = new BrowserWindow({width:900, height:640})
	win.loadURL(`file://${__dirname}/index.html`)
})
