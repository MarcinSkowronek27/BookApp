{
  'use strict';

  const select = {
    templateOf: {
      bookCart: '#template-book',
    },
    containerOf: {
      book: '#books-list',
    }
  }

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML),
    // booksList: Handlebars.compile(document.querySelector(select.containerOf.book).innerHTML),
  };

  function render(){
    const thisBook = this;
    for(let book of dataSource.books){
      const generatedHTML = templates.book;
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.book);
      bookContainer.appendChild(thisBook.element);
    }
  }
  render();
}

hfgdhfgdh
