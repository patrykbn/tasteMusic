const playedCategories = [];
const addToPlayedCategories = function(categoriesString) {
  const categories = categoriesString.replace('Categories: ', '').split(',').map(category => category.trim());
    
  categories.forEach(category => {
    if (!playedCategories.includes(category)) {
      playedCategories.push(category);
    }
  });
};

const personalizeListener = function(element){
  element.addEventListener('click', function(event) {
    if (event.target.classList.contains('play-pause-btn__icon')) {
      const playerContainer = event.target.closest('.song_player');
      const categories = playerContainer.querySelector('.categories').textContent.trim();
      addToPlayedCategories(categories);
      
    }
  });
};

export {personalizeListener ,playedCategories};