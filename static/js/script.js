const searchBtn = document.querySelector('.search-btn');
const searchForm = document.querySelector('.search-recipes');
const mealType = document.querySelectorAll('input[name="meal-type"]');
const occasionType = document.querySelectorAll('input[name="occasion"]');
const cuisineType = document.querySelectorAll('input[name="cuisine"]');
const filterBtn = document.querySelector('.filter-btn');


const displayRecipes = async (recipeName) => {
    //calling api function in here
    const recipeList = await getRecipes(recipeName);
    return { recipeList: recipeList }
}

searchForm.addEventListener("submit", e => {
    e.preventDefault();

    //get the recipe name from the user
    const recipeName = document.querySelector('#recipe-search').value.trim();
    searchForm.reset();
    displayRecipes(recipeName)
        .then(data => console.log(data))
        .catch(err => console.log(err));
});


