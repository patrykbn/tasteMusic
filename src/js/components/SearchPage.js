import { select, templates } from '../settings.js';
import GreenAudioPlayer from '/vendor/audioPlayer/green-audio-player.js';
import { Data, parseData } from './Data.js';
import { personalizeListener } from './PersonalizedDiscover.js';

class SearchPage {
  constructor(element) {
    const thisSearchPage = this;
    
    thisSearchPage.searchedSongs = [];
    
    thisSearchPage.renderSearch(element);
    thisSearchPage.dom.searchButton.addEventListener('click', function(event){
      event.preventDefault();
      thisSearchPage.songFilter();
    });
  }

  renderSearch(element, searchedSongs) {
    const thisSearchPage = this;

    element.innerHTML = '';

    const generatedHTML = templates.searchPage(searchedSongs);
    thisSearchPage.dom = {};
    thisSearchPage.dom.wrapper = element;
    thisSearchPage.dom.wrapper.innerHTML = generatedHTML;

    thisSearchPage.dom.searchButton = document.querySelector(select.buttons.searchButton);
    console.log(thisSearchPage.dom.searchButton);

    GreenAudioPlayer.init({
      selector: '.gap-player',
      stopOthersOnPlay: true,
    });
    personalizeListener(element);
  }

  async songFilter() {
    const thisSearchPage = this;
  
    try {
      const { songs, artists } = await Data();
      
      thisSearchPage.allSongs = parseData(songs, artists);
  
      const nameSearchInput = document.querySelector(select.inputs.nameSearchInput).value.trim().toLowerCase();
      const categorySearchInput = document.querySelector(select.inputs.categorySearchInput).value.trim().toLowerCase();
  
      let searchedSongs = thisSearchPage.allSongs;
  
      if (nameSearchInput !== '') {
        searchedSongs = searchedSongs.filter(song => song.fullName.toLowerCase().includes(nameSearchInput));
      }
  
      if (categorySearchInput !== '') {
        searchedSongs = searchedSongs.filter(song => {
          const categories = song.songCategories.toLowerCase().split(',').map(category => category.trim());
          
          return categories.some(category => category.includes(categorySearchInput));
        });
      }
  
      let numberOfMatches;
      if (searchedSongs.length === 0) {
        numberOfMatches = 'We couldn\'t find what you were searching for.';
      } else if (searchedSongs.length === 1) {
        numberOfMatches = `We have found 1 song...`;
      } else {
        numberOfMatches = `We have found ${searchedSongs.length} songs...`;
      }
  
      thisSearchPage.searchedSongs = {
        songsDataforSearchTemplate: searchedSongs,
        numberOfMatches: numberOfMatches
      };
  
      thisSearchPage.renderSearch(thisSearchPage.dom.wrapper, thisSearchPage.searchedSongs);
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
    }
  }
  
}
export default SearchPage;
