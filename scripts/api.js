'use strict';
/* global store, $, bookmarks, api */

//This module will include all our API functionalities
//This will have functions that will ADD, DELETE, EDIT, while making HTTP FETCH REQUESTS to the API
//This is the THIRD module

const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/william';

  const getBookmarks = function() {
    return fetch(`${BASE_URL}/bookmarks`);
  };

  const createBookmark = function(title, url, desc, rating) {
    let newBookmark = JSON.stringify(
      {
        title: title,
        url: url,
        desc: desc,
        rating: rating
      });
    return fetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newBookmark
    });
  };

  const deleteBookmark = function(id) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE'
    });
  };

  return {
    getBookmarks,
    createBookmark,
    deleteBookmark
  };

}());

api.getBookmarks()
  .then(res => res.json())
  .then(json => console.log(json));