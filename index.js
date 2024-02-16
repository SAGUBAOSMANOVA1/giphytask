
const apiKey = 'dfFDmAPBvtSXFOby1OK0V1ncqu2qihuw';
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');
const loadingIndicator = document.getElementById('loadingIndicator');
const dynamicButtons = document.getElementById('dynamicButtons');



async function getCategoryGifs(category) {

  loadingIndicator.style.display = 'block';
  resultContainer.innerHTML = '';

  try {

    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${category}&api_key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.data.length > 0) {
      data.data.forEach(gifData => {
        const gifUrl = gifData.images.original.url;
        const img = document.createElement('img');
        img.src = gifUrl;
        img.alt = category + ' GIF';
        resultContainer.appendChild(img);
      });
    } else {

      resultContainer.innerHTML = `No ${category} gifs found.`;
    }
  } catch (error) {

    console.error('Error:', error);
    resultContainer.innerHTML = 'An error occurred.';
  } finally {

    loadingIndicator.style.display = 'none';
  }
}

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchGif();
  }
});

function searchGif() {
  const searchTerm = searchInput.value;

  loadingIndicator.style.display = 'block';
  resultContainer.innerHTML = '';

  try {
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.data.length > 0) {
          data.data.forEach(gifData => {
            const gifUrl = gifData.images.original.url;
            const img = document.createElement('img');
            img.src = gifUrl;
            img.alt = 'GIF';
            resultContainer.appendChild(img);
          });
        } else {
          resultContainer.innerHTML = 'No results found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultContainer.innerHTML = 'An error occurred.';
      })
      .finally(() => {
        loadingIndicator.style.display = 'none';
      });

    createDynamicButton(searchTerm);
  } catch (error) {
    console.error('Error:', error);
    resultContainer.innerHTML = 'An error occurred.';
    loadingIndicator.style.display = 'none';
  }
}

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchGif();
    createDynamicButton(searchInput.value);
  }
});

function createDynamicButton(searchTerm) {
  const existingButton = document.querySelector(`#dynamicButtons button[data-search-term="${searchTerm}"]`);
  if (!existingButton) {
    const button = document.createElement('button');
    button.innerText = searchTerm;
    button.setAttribute('data-search-term', searchTerm);
    button.addEventListener('click', () => {
      searchGifByTerm(searchTerm);
    });
    dynamicButtons.appendChild(button);
  }
}

function searchGifByTerm(searchTerm) {
  searchInput.value = searchTerm;
  searchGif();
}



