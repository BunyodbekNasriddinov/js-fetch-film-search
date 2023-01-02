const elForm = document.querySelector(".js-form");
const elSearch = document.querySelector(".js-search");
const elList = document.querySelector(".js-list");
const key = "bb225d33";

const renderFilms = (array, node) => {
  node.innerHTML = "";

  array.forEach((film) => {
    const newItem = document.createElement("li");
    const newImg = document.createElement("img");
    const newTitle = document.createElement("h2");

    newItem.setAttribute(
      "class",
      "col-12 col-md-4 col-lg-2 rounded m-0 p-0 bg-white"
    );

    newImg.setAttribute("class", "rounded-top img-fluid");
    newTitle.setAttribute("class", "h4 my-3 ms-3 text-dark");

    newImg.src = film.Poster;
    newImg.setAttribute("width", "100%");
    newTitle.textContent = film.Title;

    newItem.appendChild(newImg);
    newItem.appendChild(newTitle);
    node.appendChild(newItem);
  });
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (elSearch.value !== "") {
    fetch(`http://www.omdbapi.com/?apikey=${key}&s=${elSearch.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          console.log(data.Search);
          renderFilms(data.Search, elList);
          elSearch.value = "";
        } else {
          elList.innerHTML = `<li><h2 class="h2 my-5 text-center text-danger">NOT FOUND</h2></li>`;
          elSearch.value = "";
        }
      });
  }
});
