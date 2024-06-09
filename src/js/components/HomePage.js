import { templates } from '../settings.js';
import GreenAudioPlayer from '/vendor/audioPlayer/green-audio-player.js';
import { Data, parseData } from './Data.js'; // Import Data and parseData functions

class HomePage {
  constructor(element, onDataLoaded) {
    const thisHomePage = this;
    thisHomePage.songs = [];
    element.innerHTML = '<h1 class="full_Title fontTwo">Loading, please wait...</h1>';
    Data().then(({ songs, artists }) => { // Fetch data using Data function
      thisHomePage.songs = parseData(songs, artists); // Parse data using parseData function
      thisHomePage.renderHome(element, thisHomePage.songs);
      if (typeof onDataLoaded === 'function'){
        onDataLoaded(thisHomePage.songs);
      }
    }).catch(error => {
      console.error('Error loading data:', error);
    });
  }

  renderHome(element, songsDataforTemplate) {
    const thisHomePage = this;

    const generatedHTML = templates.homePage({ songsDataforTemplate });
    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = element;
    thisHomePage.dom.wrapper.innerHTML = generatedHTML;
    GreenAudioPlayer.init({
      selector: '.gap-player',
      stopOthersOnPlay: true,
    });
  }
}

export default HomePage;
