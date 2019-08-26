'use strict';
/* global store, $, bookmarks, api */

//This module will be similar to shopping-list.js
//It will house all our EVENT LISTENERS and HTML TEXT GENERATERS and RENDER functions
//This is SECOND module

const bookmarks = (function() {
  
  function generateBookmarkElement(bookmark) {
    return `
    <li data-item-id="${bookmark.id}" class="bookmark-item">
        <h2 class="bookmark-name">${bookmark.title}</h2>
        <h3 class="rating">Rating:</h3>
            <span>${bookmark.rating}</span>
        <div class="bookmark-controls">
            <button class="expand-button" type="button">Expand</button>
            <button class="delete-button" type="button">Delete</button>
        </div>
    </li>`;
  }


  /**
   * 
   * @param {array} bookmarks is an array of objects. Each object or item is a bookmark
   */
  function generateBookmarkString(bookmarkList) {
    console.log(bookmarkList);
    const items = bookmarkList.map(item => generateBookmarkElement(item));
    return items.join('');
  }


  function render() {
    // let bookmarks = [...store.bookmarks];
    if (store.addingBookmark) {
      $('.add-bookmark-form').html(generateAddBookmarkForm());
    }

    const bookmarkString = generateBookmarkString(store.bookmarks);
    $('.my-bookmarks').html(bookmarkString);
  }


  function generateExpandedBookmarkElement(bookmark) {
    return `
      <li data-item-id="${bookmark.id}" class="bookmark-item expanded">
            <h2 class="bookmark-name">${bookmark.title}</h2>
            <h3 class="description">${bookmark.desc}</h3>
                <p>Lorem Ipsum</p>
            <h3 class="rating">Rating:</h3>
                <span>${bookmark.rating}</span>
            <div class="visit-site">
                <a href="${bookmark.url}">Visit Site</a>
            </div>
            <div class="bookmark-controls">
                <button class="collapse-button" type="button">Collapse</button>
                <button class="delete-button" type="button">Delete</button>
            </div>
        </li>`;
  }

  function generateAddBookmarkForm() {
    return `
      <h2>Create a Bookmark</h2>
      <form id="add-bookmark">
          <div>
              <label for="bookmark-title">Bookmark Title</label>
              <input type="text" id="bookmark-title" name="title" placeholder="Enter title" required>

              <label for="bookmark-url">URL</label>
              <input type="url" id="bookmark-url" name="url" value="http://" required>
          </div>
          <div>
              <label for="bookmark-description">Description</label>
              <input type="text" id="bookmark-description" name="description" placeholder="Enter bookmark description" required>
          </div>
          <div>
              <label for="bookmark-rating">Please enter a rating (between 1-5):</label>
              <input type="number" id="bookmark-rating" name="rating" value=3 min=1 max=5 required>
          </div>
          <div>
              <button type="submit" name="create-bookmark" class="create-bookmark-button">CREATE</button>
              <button type="button" name="cancel-bookmark" class="cancel-bookmark-button">Cancel</button>
          </div>
      </form>`;
  }


  function renderAddBookmarkHtml() {
    $('.add-bookmark-form').html(generateAddBookmarkForm());
  }

  // function renderBookmarkElement() {
  //   $('.my-bookmarks').html(generateBookmarkElement({id: cuid(), name: "Bookmark 1", url: "https://www.google.com", rating: 5, description: Lorem ipsum, expanded: false}));
  // }

  function handleAddBookmark() {
    $('.add-button').on('click', function(event) {
      console.log('Does button work?');
      renderAddBookmarkHtml();
    });
  }

  function handleCancelAddBookmark() {
    $('.add-bookmark-form').on('click', '.cancel-bookmark-button', function(event) {
      console.log('Am I working?');
    });
  }

  function handleAddBookmarkForm() {
    $('.add-bookmark-form').on('submit', '#add-bookmark', function(event) {
      event.preventDefault();
      console.log('Hello World');
    });
  }

  function handleDeleteBookmark() {
    $('.my-bookmarks').on('click', '.delete-button', function(event) {
      console.log('Am I deleting?');
    });
  }

}());