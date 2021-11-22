const $ = require( 'jquery' );
const path = require('path')
const fs = require('fs')
const os = require('os')

let DEFAULT_PATH = '/Users/paul/Programming'
let CURR_PATH

const get_file_elem = (filename) => {
  return `<li>${filename}</li>`
}

const change_path = (newpath) => {
  CURR_PATH = newpath
  $('#filename-header').html(`Current Directory: ${newpath}`)
  $('#filename-list').empty()
  fs.readdir(
    newpath, (err, files) => {
      if (err)
        console.log(err)
      else {
        files.forEach(file => {
          let elem = get_file_elem(file)
          $('#filename-list').append(elem)
        })
      }
    }
  )
}


/* on ready */
$(() => {

  $('#changedir-submit').click(
    () => {
    change_path(
      $('#changedir-input').val()
    )
    console.log('a')

  }
)


  change_path(DEFAULT_PATH)
  console.log('Ready')
  console.log($('#changedir-submit'))
})