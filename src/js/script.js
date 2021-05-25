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

    for (let book in dataSource.books) {
      const oneBook = dataSource.books[book];
      // console.log('oneBook', oneBook);
      const generatedHTML = templates.bookHTML(oneBook);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      thisBook.booksList.appendChild(generatedDOM);
    }
    // debugger;
    // console.log(thisBook.element);


  }
  render();

  const favoriteBooks = [];
  function initActions() {
    const thisBook = this;

    thisBook.elements = thisBook.booksList.querySelectorAll(select.listOf.bookImage);
    for (let image of thisBook.elements) {
      image.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if(image.classList.contains('favorite')){
          image.classList.remove('favorite');
          const b = favoriteBooks.indexOf(image);
          favoriteBooks.splice(b, 1);
        } else {
        image.classList.add('favorite');
        const clickedImage = image.getAttribute('data-id');
        favoriteBooks.push(clickedImage);
        }
        console.log(favoriteBooks);
      });

    }
    // console.log('list of images:', thisBook.elements);
  }

  initActions();
}

