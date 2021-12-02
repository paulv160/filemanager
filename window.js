const $ = require( 'jquery' );
const path = require('path')
const fs = require('fs')
const os = require('os')

// default = root for now
const DEFAULT_PATH = '/'
let CURR_PATH = null

const isDir = (path) => {
  try {
      var stat = fs.lstatSync(path);
      return stat.isDirectory();
  } catch (e) {
      // lstatSync throws an error if path doesn't exist
      return false;
  }
}

const get_file_table = (files) => {
  return `
  <table id='filename-list'>
    <thead>
      <tr>
        <th id='filename-header'>Files in ${CURR_PATH}</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      ${
        Array.from(files).map(
          file => get_file_elem(file)
        ).join('\n')
      }
    </tbody>
  </table>
  `
}

const get_file_type = (filename) => {
  return (isDir(filename)) ? 'Folder' : 'File'
}

const get_file_elem = (filename) => {
  return `
  <tr>
    <td>
      ${filename}
    </td>
    <td>
      ${get_file_type(filename)}
    </td>
  </tr>`
}

const change_path = (newpath) => {
  $('#filename-container').empty()
    fs.readdir(
      newpath, (err, files) => {
        if (err) {
          console.log(err)
          $('#filename-container').html(
            `
            <h3>
              Path "${newpath}" does not exist.
            </h3>
            `
          )
          return
        } else {
          $('#filename-container').html(
            get_file_table(files)
          )
        }
      }
    )
  CURR_PATH = newpath
}

$(document).ready(
  () => {
  
    $('#changedir-submit').on('click', (evt) => {
      evt.preventDefault(); // prevent reload
      
      change_path($('#changedir-input').val());
    })
  
    if (CURR_PATH === null) {
      change_path(DEFAULT_PATH)
    }

    console.log('Ready')
   
    console.log(`Current time is ${new Date().toLocaleTimeString()}.`)

})