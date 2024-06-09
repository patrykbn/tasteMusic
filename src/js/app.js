import {select, classNames, settings} from './settings.js';
import HomePage from './components/HomePage.js';
import SearchPage from './components/SearchPage.js';
import DiscoverPage from './components/DiscoverPage.js';

const app = {
  clickedPage: '',
 
  navBarInit: function() {
    const navButtons = document.querySelectorAll('.navButton');
 
    navButtons.forEach(button => {
      button.removeEventListener('click', this.handleNavClick);
    });
 
    navButtons.forEach(button => {
      button.addEventListener('click', this.handleNavClick);
    });
  },
 
  handleNavClick: function(event) {
    const navButtons = document.querySelectorAll(select.navBar.navButton);
    navButtons.forEach(button => button.classList.remove(classNames.nav.active));
 
    event.target.classList.add(classNames.nav.active);
    app.clickedPage = event.target.getAttribute('href');
    app.pageInit(app.clickedPage);
  },
 
  pageInit: function(link){
    const activePage = link.replace('#','');
    const activeSection = document.getElementById(activePage);
    
    if (activeSection.classList.contains(classNames.nav.active)) {
      return;
    }

    const pages = document.querySelector(select.containerOf.pages);
    pages.querySelectorAll('section').forEach(section => {
      section.classList.remove(classNames.nav.active);
    });

    activeSection.classList.add(classNames.nav.active);

    if(link == select.navBar.home){
      console.log('home-działa');
      this.initHome();
    } else if (link == select.navBar.search){
      console.log('search-działa');
      this.initSearch();
    } else if (link == select.navBar.discover){
      console.log('discover-działa');
      this.initDiscover();
    }
  },

  initHome: function(){
    const thisApp = this;
    const homeContainer = document.querySelector(select.containerOf.homePage);
    thisApp.homePage = new HomePage(homeContainer);
  },

  initSearch: function(){
    const thisApp = this;
    const searchContainer = document.querySelector(select.containerOf.searchResults);
    thisApp.searchPage = new SearchPage(searchContainer);
  },

  initDiscover: function(){
    const thisApp = this;
    const discoverContainer = document.querySelector(select.containerOf.discoverResult);
    thisApp.searchPage = new DiscoverPage(discoverContainer);
  }
};
 
document.addEventListener('DOMContentLoaded', function() {
  app.navBarInit();
  app.pageInit(settings.pages.defaultPage);
});
 