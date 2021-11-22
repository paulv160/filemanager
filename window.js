const $ = require( 'jquery' );
const path = require('path')
const fs = require('fs')
const os = require('os')

const DEFAULT_PATH = '/Users/paul/Programming'
let CURR_PATH

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
  if (fs.lstatSync(filename).isDirectory()) 
    return 'Folder'
  return {
    txt: 'Text File',
    js: 'JavaScript Source'
  }
}

const get_file_elem = (filename) => {
  return `
  <tr>
    <td>
      ${filename}
    </td>
    <td>
      ${path.extname(filename)}
    </td>
  </tr>`
}

const change_path = (newpath) => {
  CURR_PATH = newpath
  $('#filename-container').empty()
  fs.readdir(
    newpath, (err, files) => {
      if (err)
        console.log(err)
      else {
        $('#filename-container').html(
          get_file_table(files)
        )
      }
    }
  )
}


$(document).ready(
  () => {

    $('#changedir-submit').on('click',
      () => {
        change_path(
          $('#changedir-input').val()
        )
    })

    change_path(DEFAULT_PATH)

    console.log('Ready')
  }
)