{
  'use strict';

  const select = {
    templateOf: {
      bookCart: '#template-book',
    },
    containerOf: {
      booksList: '#books-list',
    }
  }

  const templates = {
    bookHTML: Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML),
    // booksList: Handlebars.compile(document.querySelector(select.containerOf.book).innerHTML),
  };

  function render() {
    const thisBook = this;

    thisBook.bookCart = document.querySelector(select.templateOf.bookCart);
    thisBook.booksList = document.querySelector(select.containerOf.booksList);

    const generatedHTML = templates.bookHTML(dataSource.books);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    for (let book in dataSource.books) {
      const oneBook = dataSource.books[book];
      console.log('oneBook', oneBook);
      const bookContainer = document.querySelector(thisBook.booksList);
      bookContainer.appendChild(oneBook);
    }

    // console.log(thisBook.element);


  }
  render();
}

