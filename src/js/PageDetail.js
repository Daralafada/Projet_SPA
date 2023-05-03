export const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { 
        name, 
        released, 
        description, 
        background_image 
      } = gameData;

      const articleDOM = document.querySelector(".page-detail .article");
      
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector("img.mini-img").src = background_image;

      const platforms = articleDOM.querySelector("p.platforms");
      platforms.innerHTML = "Platforms: ";
      gameData.platforms.forEach((platform) => {
        const platformItem = document.createElement("span");
        platformItem.innerHTML = platform.platform.name + " -- ";
        platformsContainer.appendChild(platformItem);
      });

      const developersContainer = articleDOM.querySelector("p.developers");
      developersContainer.innerHTML = "Developers: ";
      gameData.developers.forEach((developer) => {
        const developerItem = document.createElement("span");
        developerItem.innerHTML = developer.developer.name + " -- ";
        developersContainer.appendChild(developerItem);
      });
    };

      const fetchGame = (url, argument) => {
        fetch(`${url}/${argument}?key=422f2cd668a24b1b9efcbd021fe21558`)
          .then((response) => response.json())
          .then((responseData) => {
            displayGame(responseData);
          });
      };

      fetchGame('https://api.rawg.io/api/games', cleanedArgument);
    };

    const render = () => {
      pageContent.innerHTML = `
        <section class="page-detail">
          <div class="article">
            <img src="background_image" class="mini-img"></p>
            <h1 class="title"></h1>
            <p class="description"></p>
            <p class="release-date">Release date : <span></span></p>
          </div>
        </section>
      `;

      preparePage();
    };

    render();
};
