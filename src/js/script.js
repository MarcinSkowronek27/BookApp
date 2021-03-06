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
      thisBook.initActions();
    }
    initData() {
      this.data = dataSource.books;
    }
    getElements() {
      const thisBook = this;
      thisBook.bookCart = document.querySelector(select.templateOf.bookCart);
      thisBook.booksList = document.querySelector(select.containerOf.booksList);
      thisBook.form = document.querySelector(classNames.filters);

      // console.log('form', thisBook.form);
      thisBook.favoriteBooks = [];
      thisBook.filters = [];
      // console.log(elements);
    }
    initActions() {
      const thisBook = this;
      const elements = thisBook.booksList.querySelectorAll(select.listOf.bookImage);
      for (let image of elements) {
        image.addEventListener('click', function (event){
          event.preventDefault();
        })
        image.addEventListener('dblclick', function (event) {
          event.preventDefault();
          if (event.target.offsetParent.classList.contains('book__image')) {
            console.log(image);
            if (image.classList.contains(classNames.imageFavorite)) {
              image.classList.remove(classNames.imageFavorite);
              const indexBook = thisBook.favoriteBooks.indexOf(image.getAttribute('data-id'));
              // console.log('indexBook:', indexBook);
              thisBook.favoriteBooks.splice(indexBook, 1);
            } else {
              image.classList.add(classNames.imageFavorite);
              const clickedImageId = image.getAttribute('data-id');
              thisBook.favoriteBooks.push(clickedImageId);
            }
          }
        });
      }
      thisBook.form.addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.name === 'filter') {
          if (target.checked) {
            thisBook.filters.push(event.target.value);
            console.log(event.target);
          } else {
            const indexNumber = thisBook.filters.indexOf(event.target.value);
            console.log('indexNumber:', indexNumber);
            thisBook.filters.splice(indexNumber, 1);
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
        const bookId = filBook.id;
        console.log(bookId);
        const selectedImage = document.querySelector('.book__image[data-id="' + bookId + '"]');
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

      // poni??ej zmieni?? in na of
      for (let book of this.data) {
        const ratingBgc = thisBook.determineRatingBgc(book.rating);
        console.log(ratingBgc);
        const ratingWidth = book.rating * 10;
        console.log(ratingWidth);
        /*dwie linijki poni??ej (41,42)
        dodaj?? w??a??ciwo??ci do obiektu book -
        dzi??ki temu szablon "wie", czym s?? w??a??ciwo??ci ratingBgc i ratingWidth,
        kt??re ma podane w index.html */
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;
        console.log('book', book);
        const generatedHTML = templates.bookHTML(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBook.booksList.appendChild(generatedDOM);
      }
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
  console.log(app);
}

