'use strict';
/* global store, $, bookmarks, api */

//This module will be similar to shopping-list.js
//It will house all our EVENT LISTENERS and HTML TEXT GENERATERS and RENDER functions
//This is SECOND module

const bookmarks = (function() {

  function handleAddBookmark() {
    $('.add-form').on('click', '.add-button', function(event) {
      // console.log(store.isAddingBookmark);
      store.isAddingBookmark = true;
      $('.add-button').addClass('hidden');
      render();
    });
  }


  function generateAddBookmarkForm() {
    return `
      <form id="add-bookmark">
        <h2>Create a Bookmark</h2>
        <div class="labels-inputs">
            <label for="bookmark-title" class="bookmark-title">Bookmark Title</label>
            </br>
            <input type="text" id="bookmark-title" name="title" placeholder="Enter title" class="form-input" required>
        </div>
        <div class="labels-inputs">
            <label for="bookmark-url">URL</label>
            </br>
            <input type="url" id="bookmark-url" name="url" value="http://" class="form-input" required>
        </div>
        <div class="labels-inputs">
            <label for="bookmark-description">Description</label>
            </br>
            <textarea rows="4" cols="40" id="bookmark-description" name="description" placeholder="Enter bookmark description" class="form-input-desc" required></textarea>
        </div>
        <div class="labels-inputs">
            <label for="bookmark-rating">Please enter a rating (between 1-5):</label>
            </br>
            <input type="number" id="bookmark-rating" name="rating" value=3 min=1 max=5 class="form-input-rating" required>
        </div>
        <div class="form-buttons">
            <button type="submit" name="create-bookmark" class="create-bookmark-button form-button">CREATE</button>
            <button type="button" name="cancel-bookmark" class="cancel-bookmark-button form-button">Cancel</button>
        </div>
      </form>`;
  }
  

  function handleAddBookmarkForm() {
    $('.add-form').on('submit', '#add-bookmark', function(event) {
      event.preventDefault();
      //   console.log('Hello World');
      const title = $('#bookmark-title').val();
      const url = $('#bookmark-url').val();
      const desc = $('#bookmark-description').val();
      const rating = $('#bookmark-rating').val();
      api.createBookmark(title, url, desc, rating)
        .then(newBookmark => {
          store.addItem(newBookmark);
          store.isAddingBookmark = false;
          render();
        });
    });
  }

  function handleCancelAddBookmark() {
    $('.add-form').on('click', '.cancel-bookmark-button', function(event) {
      // console.log('Am I working?');
      store.isAddingBookmark = false;
      render();
    });
  }


  function generateBookmarkElement(bookmark) {
    if (bookmark.expanded) {
      return `
      <li data-item-id="${bookmark.id}" class="bookmark-item expanded">
        <h2 class="bookmark-name">${bookmark.title}</h2>
        <p class="description">${bookmark.desc}</p>
        <h3 class="rating">Rating: ${bookmark.rating}</h3>
        <div class="visit-site">
          <a href="${bookmark.url}">Visit Site</a>
        </div>
        <div class="bookmark-controls">
          <button class="collapse-button" type="button">Collapse</button>
          <button class="delete-button" type="button">Delete</button>
        </div>
      </li>`;
    } else {
      return `
      <li data-item-id="${bookmark.id}" class="bookmark-item">
        <h2 class="bookmark-name">${bookmark.title}</h2>
        <h3 class="rating">Rating: ${bookmark.rating}</h3>
        <div class="bookmark-controls">
          <button class="expand-button" type="button">Expand</button>
          <button class="delete-button" type="button">Delete</button>
        </div>
      </li>`;
    }
  }

  
  /**
   * 
   * @param {array} bookmarks is an array of objects. Each object or item is a bookmark
   */
  function generateBookmarkString(bookmarkList) {
    // console.log(bookmarkList);
    const string = bookmarkList.map(bookmark => generateBookmarkElement(bookmark));
    return string.join('');
  }

  ///////////////////////////////////////////////////////////////////////////////////
  function render() {
    // renderError();
    // console.log(store.isAddingBookmark);
    if (store.isAddingBookmark) {
      $('.add-form').html(generateAddBookmarkForm());
    } else {
      $('.add-form').html(`
        <div class="add">
          <button type="button" class="add-button">Add Bookmark</button>
        </div>`);
    }

    let bookmarks = [...store.bookmarks];
    let ratingFilteredBookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.minRating);
    // console.log(ratingFilteredBookmarks);
    let htmlString = generateBookmarkString(ratingFilteredBookmarks);
    $('.my-bookmarks').html(htmlString);
  }
  ///////////////////////////////////////////////////////////////////////////////////

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark).closest('li').data('item-id');
  }


  function handleDeleteBookmark(id) {
    $('.my-bookmarks').on('click', '.delete-button', function(event) {
      // console.log('Am I deleting?');
      const id = getBookmarkIdFromElement(event.currentTarget);
      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        });
    });
  }



  function handleExpandButton() {
    $('.my-bookmarks').on('click', '.expand-button', function(event) {
      // console.log('Am I expanding?');
      const id = getBookmarkIdFromElement(event.currentTarget);
      const bookmark = store.bookmarks.find(bookmark => bookmark.id === id);
      // console.log(bookmark);
      bookmark.expanded = true;
      render();
    });
  }


  function handleCollapseButton() {
    $('.my-bookmarks').on('click', '.collapse-button', function(event) {
      // console.log('Am I collapsing?');
      const id = getBookmarkIdFromElement(event.currentTarget);
      const bookmark = store.bookmarks.find(bookmark => bookmark.id === id);
      bookmark.expanded = false;
      render();
    });
  }


  function handleFilterButton() {
    $('.filter').on('change', '#minimum-rating-select', function(event) {
      const ratingValue = $(event.currentTarget).val();
      // console.log(ratingValue);
      store.minRating = ratingValue;
      render();
    });
  }


  function bindEventListeners() {
    handleAddBookmark();
    handleAddBookmarkForm();
    handleCancelAddBookmark();
    handleDeleteBookmark();
    handleExpandButton();
    handleCollapseButton();
    handleFilterButton();
  }

  return {
    render,
    bindEventListeners
  };

}());