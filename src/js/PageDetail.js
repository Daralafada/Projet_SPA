export const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {

      const { 
        name, 
        released, 
        description, 
        background_image, 
        rating, 
        ratings_count,
      } = gameData;

      const articleDOM = document.querySelector(".page-detail .article");
      
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector("img.mini-img").src = background_image;
      articleDOM.querySelector("p.rating span").innerHTML = rating;
      articleDOM.querySelector("span.ratings").innerHTML = ratings_count;

      const platforms = articleDOM.querySelector("p.platforms");
      platforms.innerHTML = "Platforms: ";
      gameData.platforms.forEach((platform) => {
        const platformItem = document.createElement("span");
        platformItem.innerHTML = platform.platform.name + " -- ";
        platforms.appendChild(platformItem);
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
            <p class="rating"><span></span> ⭐︎ -- <span class="ratings"></span> avis</p>
            <p class="description"></p>
            <p class="release-date">Release date : <span></span></p>
            <p class="platforms"></p>
          </div>
        </section>
      `;

      preparePage();
    };

    render();
};
