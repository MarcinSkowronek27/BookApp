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
    // booksList: Handlebars.compile(document.querySelector(select.containerOf.book).innerHTML),
  };
  class BooksList {
    constructor() {
      const thisBook = this;
      thisBook.determineRatingBgc();
      thisBook.initData();

      thisBook.getElements();
      thisBook.render();

      thisBook.initActions();

    }
    initData() {
      // const thisBook = this;
      this.data = dataSource.books;
    }
    getElements() {
      const thisBook = this;
      thisBook.bookCart = document.querySelector(select.templateOf.bookCart);
      thisBook.booksList = document.querySelector(select.containerOf.booksList);
      thisBook.formular = document.querySelector(classNames.filters);
      thisBook.ratingBgc = thisBook.determineRatingBgc();
    }
    render() {
      const thisBook = this;

      // poniżej zmienię in na of
      for (let book of this.data) {

        // const ratingBgc = determineRatingBgc(book.rating); 222222
        // console.log(thisBook.ratingBgc(book.rating));
        const ratingWidth = book.rating * 10;
        console.log(ratingWidth);
        const oneBook = book;
        /*dwie linijki poniżej (41,42)
        dodaję właściwości do obiektu oneBook -
        dzięki temu szablon "wie", czym są właściwości ratingBgc i ratingWidth,
        które ma podane w index.html */
        oneBook.ratingBgc = thisBook.ratingBgc;
        oneBook.ratingWidth = ratingWidth;
        console.log('oneBook', oneBook);
        const generatedHTML = templates.bookHTML(oneBook);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBook.booksList.appendChild(generatedDOM);
      }
    }
    // const formular = document.querySelector('.filters');
    // console.log('formular', formular);

    initActions() {
      const thisBook = this;
      thisBook.favoriteBooks = [];
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

      thisBook.formular.addEventListener('click', function (event) {
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

        thisBook.filterBooks();
      });

      // console.log(favoriteBooks);
      // console.log('list of images:', thisBook.elements);
    }


    // console.log('filters:', filters);

    filterBooks() {
      const thisBook = this;
      thisBook.filters = [];
      for (let filBook of this.data) {
        let shouldBeHidden = false;
        for (let filter of thisBook.filters) {
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
    // let nom = document.querySelector('.book__rating__fill');
    // console.log(nom);
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
  app.BooksList();
}

