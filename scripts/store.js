'use strict';
/* global store, $, bookmarks, api */

//This module will STORE all our variables/data that will be referenced/manipulated throughout our other .js files
//This is the FIRST module

const store = (function() {

  //   const bookmarks = [
  //       {id: cuid(), name: "Bookmark 1", url: "https://www.google.com", rating: 5, description: Lorem ipsum, expanded: false},
  //       {id: cuid(), name: "Bookmark 2", url: "https://www.yahoo.com", rating: 3, description: Lorem ipsum, expanded: false},
  //       {id: cuid(), name: "Bookmark 3", url: "https://www.bing.com", rating: 1, description: Lorem ipsum, expanded: false}
  //   ]
    
  const addItem = function(bookmark) {
    bookmark.expanded = false;
    this.bookmarks.push(bookmark);
  };

  const findById = function(id) {
    this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const setError = function(error) {
    this.error = error;
  }

  return {
    bookmarks: [],
    isAddingBookmark: false,
    error: null,
    minRating: 0,


    addItem,
    findById,
    findAndDelete,
    setError
  };
}());