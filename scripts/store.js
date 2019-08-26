'use strict';
/* global store, $, bookmarks, api */

//This module will STORE all our variables/data that will be referenced/manipulated throughout our other .js files
//This is the FIRST module

const store = (function() {

  const bookmarks = [
      {id: cuid(), name: "Bookmark 1", url: "https://www.google.com", rating: 5, description: Lorem ipsum, expanded: false},
      {id: cuid(), name: "Bookmark 2", url: "https://www.yahoo.com", rating: 3, description: Lorem ipsum, expanded: false},
      {id: cuid(), name: "Bookmark 3", url: "https://www.bing.com", rating: 1, description: Lorem ipsum, expanded: false}
  ]
    
  const addItem = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findById = function(id) {
    this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = function(id) {
    //how are we going to delete the item?
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id)
  };

  const toggleAddingBookmark = function() {
      this.addingBookmark = !this.addingBookmark;
  }

  //Do we need to add a function for findAndExpand?

  //Do we need to add a function for findAndCollapse?

  //Do we need to add a function for min. rating filter?


  return {
    bookmarks,
    addingBookmark: false,
    error: null,



    addItem,
    findById,
    findAndDelete,
    toggleAddingBookmark
  };
}());