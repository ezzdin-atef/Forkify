import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/seaechView';
import {elements, renderLoader, clearLoader} from './views/base';

/** Global state of the app
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
    // 1) get the query form view
    const query = searchView.getInput();
    
    if (query !== '') {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipe
            await state.search.getResult();

            // 5) Render results in UI
            clearLoader();
            searchView.renderResult(state.search.result);
        } catch(error) {
            alert('Something wen wrong :(');
            clearLoader();
        }  
        
    }
}

elements.searchForm.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    searchView.clearResults();
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        document.querySelector('.results__list').innerHTML = '';
        searchView.renderResult(state.search.result, goToPage);
    }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changer

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();
            state.recipe.parserIngerdients();

            // Calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServing();

            // Render recipe
            console.log(state.recipe);
        } catch(error) {
            console.log('Error proccessing recipe' . error);
        }
    }
};
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));