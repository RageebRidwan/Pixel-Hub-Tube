let sortByViewsClicked = false;
const loadData = async (id) => {
  const data = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data_parsed = await data.json();
  let all_data = data_parsed.data;
  console.log(all_data);

  if (sortByViewsClicked) {
    all_data = all_data.sort((a, b) => {
      const viewsA =
        parseFloat(a.others.views.replace("k", "")) *
        (a.others.views.includes("k") ? 1000 : 1);
      const viewsB =
        parseFloat(b.others.views.replace("k", "")) *
        (b.others.views.includes("k") ? 1000 : 1);

      return viewsB - viewsA;
    });
  }

  const vidCards = document.getElementById("vid-cards");
  vidCards.innerHTML = ""; //clear the container before loading

  if (all_data.length === 0) {
    const no_data = document.createElement("div");
    no_data.classList.add("n-data");
    no_data.innerHTML = `
     <img id="icon" src="./images/Icon.png" alt="" />
     <h1><b>Oops!! Sorry, there is no content here.</b></h1>
    `;
    vidCards.appendChild(no_data);
  } else {
    all_data.forEach((element) => {
      const description = document.createElement("div");
      description.classList.add("card");
      const view_count = element.others.views;
      const postedDate = element.others.posted_date;
      const seconds = postedDate !== "" ? parseInt(postedDate) : "";
      const hours = Math.floor(seconds / 3600);
      const remainingSeconds = seconds % 3600;
      const minutes = Math.floor(remainingSeconds / 60);

      description.innerHTML = `
    <img id="card-img" src="${element.thumbnail}" alt="">
    <div class="vid-details">
      <img id="profile-img" src="${element.authors[0].profile_picture}" alt="">
      <div id = "vid-name"> 
        <h2><b>${element.title}</b></h2>
        <span id="annoying">
          ${element.authors[0].profile_name} ${
        element.authors[0].verified === false
          ? ""
          : `<img id="ver" src="./images/verified.png" alt=""></img>`
      }
        </span>
        <p>${view_count} views</p>
    
    </div>
    ${
      hours > 0
        ? `<div class="time-box">${hours}hrs ${
            minutes > 0 ? `${minutes}mins` : ""
          } ago</div>`
        : minutes > 0
        ? `<div class="time-box">${minutes}mins ago</div>`
        : ""
    }
  `;
      vidCards.appendChild(description);
    });
  }
};

const sortAndLoad = () => {
  sortByViewsClicked = true;

  loadData("1000");
};
loadData("1000");
