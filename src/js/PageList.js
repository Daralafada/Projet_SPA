export const PageList = (argument = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const welcomeText = document.querySelector('.welcome');
      welcomeText.innerHTML = 
        '<p>Welcome,</p><p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p><br>'

    const displayResults = (articles) => {
      const resultsContent = articles
        .map((article) => {
          const releasedDate = new Date(article.released);
          return { ...article, releasedDate };
        })
        .sort((a, b) => b.releasedDate - a.releasedDate)
        .map((article) => (
          `<article class="cardGame">
            <img src ="${article.background_image}" id="mini-img" alt="${article.name} image" class="card-img"></img>
            <h1 class="card-title">${article.name}</h1>
            <div class="card-body">
              <p>
                Released : ${article.released}
                <a href="#pagedetail/${article.id}">More details</a>
              </p>
            </div>
          </article>`
        ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const searchBar = document.querySelector('#search-bar');
    searchBar.addEventListener('input', (event) => {
      const searchWord = searchBar.value.trim();
      if (searchWord !== '') { 
        const url = `https://api.rawg.io/api/games?key=422f2cd668a24b1b9efcbd021fe21558&search=${searchWord}`;
        fetch(url)
          .then((response) => response.json())
          .then((responseData) => {
            displayResults(responseData.results);
          });
      }
    });

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=422f2cd668a24b1b9efcbd021fe21558`);
  };
  
  const render = () => {
    pageContent.innerHTML = `
    <div class="welcome"></div>
    <section class="page-list">
    <div class="articles"></div>
    </section>
    `;

    preparePage();
  };

  render();
};
