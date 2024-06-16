import { classNames, select, templates } from '../settings.js';
import GreenAudioPlayer from '/vendor/audioPlayer/green-audio-player.js';
import { Data, parseData, getCategories } from './Data.js';

class HomePage {
  constructor(element, onDataLoaded) {
    const thisHomePage = this;
    thisHomePage.songs = [];
    thisHomePage.allCategories = [];
    thisHomePage.pickedCategory = []; // Initialize pickedCategory here

    element.innerHTML = '<h1 class="full_Title fontTwo">Loading, please wait...</h1>';
    Data().then(({ songs, artists }) => {
      thisHomePage.songs = parseData(songs, artists);
      thisHomePage.allCategories = getCategories(songs);
      console.log(thisHomePage.allCategories);
      thisHomePage.renderHome(element, thisHomePage.songs, thisHomePage.allCategories);
      if (typeof onDataLoaded === 'function') {
        onDataLoaded(thisHomePage.songs);
      }
    }).catch(error => {
      console.error('Error loading data:', error);
    });
  }

  renderHome(element, songsDataforTemplate, allSongCategories) {
    const thisHomePage = this;

    const generatedHTML = templates.homePage({ songsDataforTemplate, allSongCategories });
    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = element;
    thisHomePage.dom.wrapper.innerHTML = generatedHTML;
    thisHomePage.dom.categoryContainer = document.querySelector(select.containerOf.categories);

    GreenAudioPlayer.init({
      selector: '.gap-player',
      stopOthersOnPlay: true,
    });
    thisHomePage.toggleActiveCategories();
    thisHomePage.attachCategoryClickListener();
  }
  toggleActiveCategories() {
    const thisHomePage = this;
    const categoryLinks = thisHomePage.dom.categoryContainer.querySelectorAll(select.containerOf.categoryLink);
  
    categoryLinks.forEach(link => {
      const categoryId = link.getAttribute('id');
      const isActive = thisHomePage.pickedCategory.includes(categoryId);
      link.classList.toggle(classNames.categories.active, isActive);
    });
  }

  attachCategoryClickListener() {
    const thisHomePage = this;
  
    thisHomePage.dom.categoryContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
  
        link.classList.toggle(classNames.categories.active);
  
        const clickedCategory = event.target.getAttribute('id');
        const categoryIndex = thisHomePage.pickedCategory.indexOf(clickedCategory);
  
        if (categoryIndex > -1) {
          thisHomePage.pickedCategory.splice(categoryIndex, 1);
        } else {
          thisHomePage.pickedCategory.push(clickedCategory);
        }
  
        thisHomePage.filterSongs();
      });
    });
  }

  filterSongs() {
    const thisHomePage = this;
    let filteredSongs = thisHomePage.songs;
    console.log('Active filtering categories', thisHomePage.pickedCategory);

    if (thisHomePage.pickedCategory.length > 0) {
      filteredSongs = thisHomePage.songs.filter(song =>
        thisHomePage.pickedCategory.every(category => song.songCatForFilter.includes(category))
      );
    }

    thisHomePage.renderHome(thisHomePage.dom.wrapper, filteredSongs, thisHomePage.allCategories);
  }
}

export default HomePage;
