import { select, templates } from '../settings.js';
import GreenAudioPlayer from '/vendor/audioPlayer/green-audio-player.js';
import { Data, parseData } from './Data.js';

class SearchPage {
  constructor(element) {
    const thisSearchPage = this;
    
    thisSearchPage.searchedSongs = [];
    
    thisSearchPage.renderSearch(element);
    thisSearchPage.dom.searchButton.addEventListener('click', function(event){
      event.preventDefault();
      thisSearchPage.songFilter();
    });
    //thisSearchPage.songFilter();
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
  }

  async songFilter() {
    const thisSearchPage = this;
  
    try {
      // Fetch data using Data function from Data.js
      const { songs, artists } = await Data();
      
      // Parse fetched data
      thisSearchPage.allSongs = parseData(songs, artists);
  
      // Continue with the search filtering
      const searchInput = document.querySelector(select.inputs.searchInput).value.toLowerCase();
  
      // Filter songs based on the search input
      const searchedSongs = thisSearchPage.allSongs.filter(song => song.fullName.toLowerCase().includes(searchInput));
  
      // Set the number of matched songs message
      let numberOfMatches;
      if (searchedSongs.length === 0) {
        numberOfMatches = 'We couldn\'t find what you were searching for.';
      } else if (searchedSongs.length === 1) {
        numberOfMatches = `We have found 1 song...`;
      } else {
        numberOfMatches = `We have found ${searchedSongs.length} songs...`;
      }
  
      // Update the searchedSongs object with filtered songs and number of matches
      thisSearchPage.searchedSongs = {
        songsDataforSearchTemplate: searchedSongs,
        numberOfMatches: numberOfMatches
      };
  
      // Initiate renderSearch with the updated searchedSongs data
      thisSearchPage.renderSearch(thisSearchPage.dom.wrapper, thisSearchPage.searchedSongs);
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
    }
  }

  
}
export default SearchPage;
