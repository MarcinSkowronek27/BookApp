{
  'use strict';

  const select = {
    templateOf: {
      bookCart: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    listOf: {
      bookImage: '.book__image',
    }
  };

  const classNames = {
    imageFavorite: 'favorite',
    bookRating: '.book__rating__fill',
  };

  const templates = {
    bookHTML: Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML),
    // booksList: Handlebars.compile(document.querySelector(select.containerOf.book).innerHTML),
  };

  function render() {
    const thisBook = this;

    thisBook.bookCart = document.querySelector(select.templateOf.bookCart);
    thisBook.booksList = document.querySelector(select.containerOf.booksList);
    // console.log('bookList', thisBook.booksList);
// poniżej zmienię in na of
    for (let book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);
      let ratingWidth = book.rating * 10;
      console.log(ratingWidth);
      const oneBook = book;
      // console.log('oneBook', oneBook);
      const generatedHTML = templates.bookHTML(oneBook);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      thisBook.booksList.appendChild(generatedDOM);
    }
    // debugger;
    // console.log(thisBook.element);


  }
  render();
  const formular = document.querySelector('.filters');
  console.log('formular', formular);
  const favoriteBooks = [];
  function initActions() {
    const thisBook = this;

    thisBook.elements = thisBook.booksList.querySelectorAll(select.listOf.bookImage);
    for (let image of thisBook.elements) {

      image.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (event.target.offsetParent.classList.contains('book__image')) {
          // console.log(image);
          if (image.classList.contains(classNames.imageFavorite)) {
            image.classList.remove(classNames.imageFavorite);
            const b = favoriteBooks.indexOf(image.getAttribute('data-id'));
            // console.log('b:', b);
            favoriteBooks.splice(b, 1);
          } else {
            image.classList.add(classNames.imageFavorite);
            const clickedImage = image.getAttribute('data-id');
            favoriteBooks.push(clickedImage);
          }
        }
      });

    }

    formular.addEventListener('click', function (event) {
      let target = event.target;
      if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.name === 'filter') {
        if (target.checked) {
          filters.push(event.target.value);
          console.log(event.target);
        } else {
          const remClass = filters.indexOf(event.target.value);
          // console.log('remClass:', remClass);
          filters.splice(remClass, 1);
        }
      }

      filterBooks();
    });

    // console.log(favoriteBooks);
    // console.log('list of images:', thisBook.elements);
  }

  initActions();

  const filters = [];
  // console.log('filters:', filters);

  function filterBooks() {
    for (let filBook of dataSource.books) {
      let shouldBeHidden = false;
      for (let filter of filters) {
        // console.log(filter);
        if (filBook.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      let bookId = filBook.id;
      // console.log(bookId);
      let selectedImage = document.querySelector('.book__image[data-id="' + bookId + '"]');
      // console.log(selectedImage);
      if (shouldBeHidden === true) {
        selectedImage.classList.add('hidden');
      } else {
        selectedImage.classList.remove('hidden');
        // console.log(filBook);
      }
    }
  }
  let nom = document.querySelector(classNames.bookRating);
  console.log(nom);
  function determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
}

