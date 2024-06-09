export const select = {
  templateOf: {
    mainPage: '#template-main-wrapper',
    searchPage: '#template-search-wrapper',
    discoverPage: '#template-discover-wrapper',
  },
  navBar: {
    home: '#home',
    search: '#search',
    discover: '#discover',
    navButton: '.navButton'
  },
  containerOf: {
    navBar: '.nav-bar',
    pages: '.pages',
    homePage: '.homePage',
    searchPage: '.searchPage',
    searchResults: '.searchResults',
    discoverPage: '.discoverPage',
    discoverResult: '.discoverResult'
  },
  buttons: {
    searchButton: '.searchButton',
    discoverButton: '.discoverButton',
  },
  inputs: {
    searchInput: '#searchBar',
  }
};

export const classNames = {
  nav: {
    active: 'active'
  }
};

export const settings = {
  db: {
    url1:'//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    url2: '//localhost:3000',
    home: 'home',
    search: 'search',
    discover: 'discover',
    songs: 'songs',
    artists: 'artists'
  },
  pages: {
    defaultPage: '#home',
  },
};

export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.mainPage).innerHTML),
  searchPage: Handlebars.compile(document.querySelector(select.templateOf.searchPage).innerHTML),
  discoverPage: Handlebars.compile(document.querySelector(select.templateOf.discoverPage).innerHTML),
};