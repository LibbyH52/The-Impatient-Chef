const ingredientForm = document.querySelector('.ingredient-form');

const filterForm = document.querySelector('.search-filters');
const filterBtn = document.querySelector('.filter-btn');

const recipeContainer = document.querySelector('.recipe-container');

const dietType = document.querySelectorAll('input[name="diet-type"]');
const mealType = document.querySelectorAll('input[name="meal-type"]');
const cuisineType = document.querySelectorAll('input[name="cuisine"]');

const addBtn = document.querySelector('#add-btn');
const removeBtn = document.querySelector('#remove-btn');

let id = 0;


const displayRecipes = (data) => {
    recipeContainer.innerHTML = '';
    const recipeList = data.recipeList.results;
    for(let i=0; i<recipeList.length; i++){
        let recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeContainer.appendChild(recipeCard);
        let name = document.createElement('h3');
        name.classList.add("recipe-heading");
        recipeCard.appendChild(name);
        name.textContent = recipeList[i].title;
        recipeCard.classList.add("recipe-card");
        let recipeImage = document.createElement('div');
        recipeCard.style.backgroundImage = `url(${recipeList[i].image})`;
    }
}

const allRecipes = async (recipeName, diet, meal, cuisine, ingredients) => {
    //calling api function in here
    const recipeList = await getRecipes(recipeName, diet, meal, cuisine,ingredients);
    return { recipeList: recipeList }
}

filterForm.addEventListener("submit", e => {
    e.preventDefault();
    let diet = '';
    let meal = '';

    //get the recipe name from the user
    const recipeName = document.querySelector('#recipe-search').value.trim();
    let ingredients = document.querySelector('.ingredient-search').value.trim().split(' ').join(',');

    for(let i=0; i<dietType.length; i++) {
        if(dietType[i].checked) {
            diet = dietType[i].value;
        }
    }

    for(let i=0; i<mealType.length; i++) {
        if(mealType[i].checked) {
            meal = mealType[i].value;
        }
    }

    for(let i=0; i<cuisineType.length; i++) {
        if(cuisineType[i].checked) {
            cusine = cuisineType[i].value;
        }
    }

    filterForm.reset();

    allRecipes(recipeName, diet, meal, cuisine, ingredients)
        .then(data => displayRecipes(data))
        .catch(err => console.log(err));
});
