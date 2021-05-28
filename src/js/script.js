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
    booksRating: '.book__rating__fill',
    filters: '.filters',
  };

  const templates = {
    bookHTML: Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBook = this;
      thisBook.initData();
      thisBook.getElements();
      thisBook.render();
      thisBook.determineRatingBgc();
    }
    initData() {
      this.data = dataSource.books;
    }
    getElements() {
      const thisBook = this;
      thisBook.bookCart = document.querySelector(select.templateOf.bookCart);
      thisBook.booksList = document.querySelector(select.containerOf.booksList);
      thisBook.formular = document.querySelector(classNames.filters);
      // console.log('formular', thisBook.formular);
      thisBook.favoriteBooks = [];
      thisBook.filters = [];
      // console.log(elements);
    }
    initActions() {
      const thisBook = this;
      thisBook.elements = thisBook.booksList.querySelectorAll(select.listOf.bookImage);
      for (let image of thisBook.elements) {
        image.addEventListener('dblclick', function (event) {
          event.preventDefault();
          if (event.target.offsetParent.classList.contains('book__image')) {
            console.log(image);
            if (image.classList.contains(classNames.imageFavorite)) {
              image.classList.remove(classNames.imageFavorite);
              const b = thisBook.favoriteBooks.indexOf(image.getAttribute('data-id'));
              // console.log('b:', b);
              thisBook.favoriteBooks.splice(b, 1);
            } else {
              image.classList.add(classNames.imageFavorite);
              const clickedImage = image.getAttribute('data-id');
              thisBook.favoriteBooks.push(clickedImage);
            }
          }
        });
      }
      thisBook.formular.addEventListener('click', function (event) {
        let target = event.target;
        if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.name === 'filter') {
          if (target.checked) {
            thisBook.filters.push(event.target.value);
            console.log(event.target);
          } else {
            const remClass = thisBook.filters.indexOf(event.target.value);
            // console.log('remClass:', remClass);
            thisBook.filters.splice(remClass, 1);
          }
        }

        thisBook.filterBooks();
      });
    }

    filterBooks() {
      const thisBook = this;
      for (let filBook of this.data) {
        let shouldBeHidden = false;
        for (let filter of thisBook.filters) {
          console.log(thisBook.filters);
          if (filBook.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        let bookId = filBook.id;
        console.log(bookId);
        let selectedImage = document.querySelector('.book__image[data-id="' + bookId + '"]');
        console.log(selectedImage);
        if (shouldBeHidden === true) {
          selectedImage.classList.add('hidden');
        } else {
          selectedImage.classList.remove('hidden');
          // console.log(filBook);
        }
      }
    }

    render() {
      const thisBook = this;

      // poniżej zmienię in na of
      for (let book of this.data) {
        const ratingBgc = thisBook.determineRatingBgc(book.rating);
        console.log(ratingBgc);
        const ratingWidth = book.rating * 10;
        console.log(ratingWidth);
        const oneBook = book;
        /*dwie linijki poniżej (41,42)
        dodaję właściwości do obiektu oneBook -
        dzięki temu szablon "wie", czym są właściwości ratingBgc i ratingWidth,
        które ma podane w index.html */
        oneBook.ratingBgc = ratingBgc;
        oneBook.ratingWidth = ratingWidth;
        console.log('oneBook', oneBook);
        const generatedHTML = templates.bookHTML(oneBook);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBook.booksList.appendChild(generatedDOM);
      }
      thisBook.initActions();
    }
    determineRatingBgc(rating) {
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
  const app = new BooksList();
  // console.log(app);
}

