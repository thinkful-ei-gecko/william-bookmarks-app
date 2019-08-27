'use strict';
/* global store, $, bookmarks, api */

//This module will be very short and simple
//It will take our bookmarks.js and api.js MAIN functions and RENDER them all
//This is the FINAL module

$(document).ready(function() {
  bookmarks.bindEventListeners();
  bookmarks.render();
  api.getBookmarks()
    // .then(res => {
    // //   console.log(res.json());
    //   res.json();
    // })
    .then(items => {
      items.forEach(bookmark => store.addItem(bookmark));
      bookmarks.render();
    })
    .catch(err => console.log(err.message));
});