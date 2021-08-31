var modal = document.getElementById('modal');
var modalShow = document.getElementById('show-modal');
var modalClose = document.getElementById('close-modal');
var bookmarkForm = document.getElementById('bookmark-form');
var websiteNameEl = document.getElementById('website-name');
var websiteUrlEl = document.getElementById('website-url');
var bookmarksContainer = document.getElementById('bookmarks-container');

var bookmarks = [];

// Show Modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus(); // to focus on name
}

// Build Bookmarks as new div
function buildBookmarks() {

    bookmarksContainer.textContent = '';
    // Build items
    bookmarks.forEach(bookmark => {
        var {
            name,
            url
        } = bookmark;
        // Item
        var item = document.createElement('div');
        item.classList.add('item');
        // Close Icon
        var closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        //icon of  Link 
        var linkInfo = document.createElement('div');
        linkInfo.classList.add('name');

        var favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        // Link
        var link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;

        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
}

function fetchBookmarks() {
    // Get bookmarks from localStorage if available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // Create bookmarks array in localStorage
        bookmarks = [{
            name: '',
            url: '',
        }, ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

// Delete Bookmark
function deleteBookmark(url) {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
    });
    // Update bookmarks array in localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// Handle inputs Data 
function storeBookmark(e) {
    e.preventDefault();
    var nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    var bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Validate 
function validate(nameValue, urlValue) {
    //url syntax
    var expression = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    var regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('Please submit values for both fields')
    }
    if (!urlValue.match(regex)) {
        alert('Please provide a valid web URL');
        return false;
    }

    return true;
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => e.target === modal ? modal.classList.remove('show-modal') : false);

bookmarkForm.addEventListener('submit', storeBookmark);

fetchBookmarks();