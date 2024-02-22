import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();

// Search results
let searchResult;
const searchResultsList = document.querySelector('.results');

const getSearchResult = async () => {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza'
    );
    const result = await res.json();
    searchResult = result.data.recipes;
    searchResultsList.innerHTML = `<ul class="results">
      ${searchResult
        .map(recipe => {
          return `<li class="preview">
          <a class="preview__link preview__link--active" href="#23456">
            <figure class="preview__fig">
              <img src=${recipe.image_url} alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${recipe.title}</h4>
              <p class="preview__publisher">${recipe.publisher}</p>
              <div class="preview__user-generated">
                <svg>
                  <use href="src/img/icons.svg#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>`;
        })
        .join('')}
    </ul>`;
  } catch (error) {
    console.error(error);
  }
};
getSearchResult();
