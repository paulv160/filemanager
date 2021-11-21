const { app, BrowserWindow, Element, NodeList } = require('electron')
const path = require('path')
const fs = require('fs')

let FileManager = class {
    constructor (path) {
        this.path = (path) ? path : '~'
    }
    
    run() {
        console.log('rape')
    }
}

module.exports = { FileManager }