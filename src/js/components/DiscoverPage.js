import { select, templates } from '../settings.js';
import GreenAudioPlayer from '/vendor/audioPlayer/green-audio-player.js';
import { Data, parseData } from './Data.js';

class DiscoverPage {
  constructor(element) {
    const thisDiscoverPage = this;
    thisDiscoverPage.randomSong = {};
    thisDiscoverPage.renderDiscover(element);

    thisDiscoverPage.discoverButton = document.querySelector(select.buttons.discoverButton);
    thisDiscoverPage.discoverButton.addEventListener('click', async function() {
      await thisDiscoverPage.randomSongGenerator();
      thisDiscoverPage.renderDiscover(element, thisDiscoverPage.randomSong);
      thisDiscoverPage.dom.discoverButton.innerHTML = 'Discover some more...';
    });
  }

  renderDiscover(element, randomSong) {
    const thisDiscoverPage = this;

    element.innerHTML = '';

    if (!randomSong || Object.keys(randomSong).length === 0) {
      return;
    }

    const generatedHTML = templates.discoverPage(thisDiscoverPage.randomSong);
    thisDiscoverPage.dom = {};
    thisDiscoverPage.dom.wrapper = element;
    thisDiscoverPage.dom.wrapper.innerHTML = generatedHTML;
    GreenAudioPlayer.init({
      selector: '.gap-player',
      stopOthersOnPlay: true,
    });

    thisDiscoverPage.dom.discoverButton = document.querySelector(select.buttons.discoverButton);
  }

  async randomSongGenerator() {
    const thisDiscoverPage = this;
    try {
      const { songs, artists } = await Data();

      thisDiscoverPage.allSongs = parseData(songs, artists);

      if (Array.isArray(thisDiscoverPage.allSongs) && thisDiscoverPage.allSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * thisDiscoverPage.allSongs.length);
        thisDiscoverPage.randomSong = thisDiscoverPage.allSongs[randomIndex];
      } else {
        console.error('No songs available to pick a random one.');
      }
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
    }
  }
}

export default DiscoverPage;
