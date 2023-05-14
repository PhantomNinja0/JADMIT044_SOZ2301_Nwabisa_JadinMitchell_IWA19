/*
  data imported from data.js
*/

import { books, authors, genres } from "./data.js";

//variables fixed
const matches = books;
let page = 1;
let range = books.length;


//themes for display
const day = {
  dark: '10, 10, 20', // dark color for day theme
  light: '255, 255, 255', // light color for day theme
};
const night = {
  dark: '255, 255, 255', // dark color for night theme
  light: '10, 10, 20', // light color for night theme
};


// elements selected from DOM
const dataSettingsTheme = document.querySelector('[data-settings-theme]') // element for theme change
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary") // saves theme choice

// click event for save button
saveButton.addEventListener('click', (event) => {
  event.preventDefault()

  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    if (typeof appOverlays !== 'undefined') {
      appOverlays.settingsOverlay.close()
    }
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    if (typeof appOverlays !== 'undefined') {
      appOverlays.settingsOverlay.close()
    }
  }
})

const fragment = document.createDocumentFragment()

//variables for the beginning index, end index,slicing of the books variable and assignment to extracted variable
let beginningIndex = 0;
let endIndex = 36;
const extracted = books.slice(beginningIndex, endIndex)



//Display for book list using loop

for (let i = 0; i < extracted.length; i++) {

/*
  New dl element created for every book
  Preview generated using book information imported from data.js
  Previews added to fragment
*/
  const preview = document.createElement('dl')
  preview.className = 'preview'
  preview.dataset.id = books[i].id
  preview.dataset.title = books[i].title
  preview.dataset.image = books[i].image
  preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
  preview.dataset.description = books[i].description
  preview.dataset.genre = books[i].genres
  

  preview.innerHTML = 
  `
      <div>
      <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
      </div>
      <div class='preview__info'>
      <dt class='preview__title'>${books[i].title}<dt>
      <dt class='preview__author'> By ${authors[books[i].author]}</dt>
      </div>
  `
  

  fragment.appendChild(preview)
};


/*
  Click event for settings button
*/

const settingsBtn = document.querySelector("[data-header-settings]")

settingsBtn.addEventListener('click', (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "block";
})

const settingCancel = document.querySelector('[data-settings-cancel]')

settingCancel.addEventListener('click', (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "none";
})

/*
  defines function detailsDisplay to display book details pop-up on click 
*/
const detailsDisplay = (event) => {
  const overlay1 = document.querySelector('[data-list-active]');
  const title = document.querySelector('[data-list-title]')
  const subtitle = document.querySelector('[data-list-subtitle]')
  const description = document.querySelector('[data-list-description]')
  const img1 = document.querySelector('[data-list-image]')
  const imgBlur = document.querySelector('[data-list-blur]')

  event.target.dataset.id ? overlay1.style.display = "block" : undefined;
  event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
  event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
  event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
  event.target.dataset.image ? img1.setAttribute('src', event.target.dataset.image) : undefined;
  event.target.dataset.image ? imgBlur.setAttribute('src', event.target.dataset.image) : undefined;
};

const detailsClose = document.querySelector('[data-list-close]')

detailsClose.addEventListener('click', (event) => {
  document.querySelector("[data-list-active]").style.display = "none";
})

/*
  Search by Author
*/

const bookClick = document.querySelector('[data-list-items]');
bookClick.addEventListener('click', detailsDisplay);
const allAuthors = document.createElement('option');
allAuthors.value = 'any';
allAuthors.textContent = 'All authors';
const authorOption = document.querySelector("[data-search-authors]");
authorOption.appendChild(allAuthors);
for (const authorId in authors) {
  const optionElement = document.createElement('option');
  optionElement.value = authorId;
  optionElement.textContent = authors[authorId];
  authorOption.appendChild(optionElement);
}

/*
  Search by Genre
*/

const genreSelect = document.querySelector("[data-search-genres]");
const allGenresOption = document.createElement('option');
allGenresOption.value = 'any';
allGenresOption.innerText = 'All Genres';
genreSelect.appendChild(allGenresOption);
for (const [genreId, genreName] of Object.entries(genres)) {
  const optionElement = document.createElement('option');
  optionElement.value = genreId;
  optionElement.textContent = genreName;
  genreSelect.appendChild(optionElement)
}

/*
  Cancel Button
*/

const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
})



/*
  Search select and display
*/
const searchButton = document.querySelector("[data-header-search]");
searchButton.addEventListener('click', (event) => {
  document.querySelector("[data-search-overlay]").style.display = "block";
})


/*
  Show more button
*/

const bookList = document.querySelector('[data-list-items]');
bookList.appendChild(fragment)

const showMoreBtn = document.querySelector('[data-list-button]')
const booksRemaining = Math.min(books.length - endIndex,)
showMoreBtn.innerHTML = `Show More <span style="opacity: 0.5">(${booksRemaining})</span>`
showMoreBtn.addEventListener('click', () => {
  const fragment = document.createDocumentFragment()
  beginningIndex += 36;
  endIndex += 36;
  const beginningIndex1 = beginningIndex
  const endIndex1 = endIndex
  const extracted = books.slice(beginningIndex1, endIndex1)

  for (const { author, image, title, id, description, published } of extracted) {
    const preview = document.createElement('dl')
    preview.className = 'preview'
    preview.dataset.id = id
    preview.dataset.title = title
    preview.dataset.image = image
    preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
    preview.dataset.description = description
     
    /*
      inner html of preview for show more
    */

    preview.innerHTML = 
      `
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>
      `
    fragment.appendChild(preview)
  }
  const bookList = document.querySelector('[data-list-items]')
  bookList.appendChild(fragment)

  /*
    display number of books remaining
  */
  const booksRemaining = Math.min(books.length - endIndex,)
  const showMoreBtnTxt = `Show More <span style="opacity: 0.5">(${booksRemaining})</span>`
  showMoreBtn.innerHTML = showMoreBtnTxt;
})