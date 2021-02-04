const ingredientForm = document.querySelector('.ingredient-form');

const filterForm = document.querySelector('.search-filters');
const filterBtns = document.querySelectorAll('.filter-btn');

const recipeContainer = document.querySelector('.recipe-container');

const dietType = document.querySelectorAll('input[name="diet-type"]');
const mealType = document.querySelectorAll('input[name="meal-type"]');
const cuisineType = document.querySelectorAll('input[name="cuisine"]');
const allergenList = document.querySelectorAll('input[class="allergens"]');
const ingredient = document.querySelector('input[name="ingredient"]');

const addBtn = document.querySelector('.add-btn');

const ingredientList = document.querySelector('#ingredient-list');

let recipeCards = recipeContainer.childNodes;
let recipeList = [];
let ingredients = [];
let badge = '';
let id = 0;


const showRecipe = (recipe) => {
    let recipeInfo = recipe.oneRecipe;
    console.log(`title: ${recipeInfo.title}`);
    console.log(`summary: ${recipeInfo.summary}`);
    console.log(`ready in ${recipeInfo.readyInMinutes}`);
    let ingredients = recipeInfo.extendedIngredients;
    for(let i=0; i<ingredients.length; i++) {
        console.log(ingredients[i].name);
    }
    let instructionsArr = recipeInfo.instructions.split('<ol><li></li></ol>');
    for(let i=0; i<instructionsArr.length; i++) {
        console.log(instructionsArr[i]);
    }
    console.log(recipeInfo);
}

const displayRecipes = (data) => {
    recipeContainer.innerHTML = '';
    recipeList = data.recipeList.results;
    for(let i=0; i<recipeList.length; i++){
        recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.dataset.id = recipeList[i].id;
        console.log(recipeList[i].id);
        let name = document.createElement('h3');
        name.classList.add("recipe-heading");
        name.textContent = recipeList[i].title;
        recipeCard.classList.add("recipe-card");
        let recipeImage = document.createElement('div');
        recipeCard.style.backgroundImage = `url(${recipeList[i].image})`;
        recipeContainer.appendChild(recipeCard);
        recipeCard.appendChild(name);
    }
    const recipeCards = document.querySelectorAll('.recipe-card');
    console.log(recipeCards);
    recipeCards.forEach(recipeCard => {
        recipeCard.addEventListener("click", () => {
            id = recipeCard.dataset.id;
            singleRecipe(id)
                .then(recipe => showRecipe(recipe))
                .catch(err => console.log(err));
        });
    });
}

const singleRecipe = async (id) => {
    //calling api function in here
    const oneRecipe = await getRecipe(id);
    return { oneRecipe: oneRecipe }
}

const getID = (id) => {
    console.log(`function call ${id}`);
}

const allRecipes = async (recipeName, diet, meal, cuisine, ingredients) => {
    //calling api function in here
    const recipeList = await getRecipes(recipeName, diet, meal, cuisine,ingredients);
    return { recipeList: recipeList }
}

addBtn.addEventListener("click", () => {
    if(ingredient.value !== '' & ingredients.length < 3){
        ingredients.push(ingredient.value.trim());
        badge = document.createElement('div');
        let undo = document.createElement('button');
        undo.classList.add('delete');
        undo.setAttribute("type", "button");
        undo.textContent = 'X'
        ingredientList.appendChild(badge);
        badge.classList.add('ingredient-badge');
        badge.textContent = `${ingredient.value}`;
        badge.appendChild(undo);
        ingredient.value = '';
    }
});

filterForm.addEventListener("submit", e => {
    e.preventDefault();
    let diet = '';
    let meal = '';
    let cuisine = '';
    let ingredientStr = '';
    ingredientList.innerHTML = '';

    //get the recipe name from the user
    const recipeName = document.querySelector('#recipe-search').value.trim();
    if(ingredients.length > 1) {
        ingredientStr = ingredients.join(',');
    }

    for(let i=0; i<allergenList.length; i++) {
        if(allergenList[i].checked) {
            console.log(allergenList[i].value);
        }
    }

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

    allRecipes(recipeName, diet, meal, cuisine, ingredientStr)
        .then(data => displayRecipes(data))
        .catch(err => console.log(err));
});

addBtn.addEventListener("click", () => {
    if(ingredient.value !== '' & ingredients.length < 3){
        ingredients.push(ingredient.value.trim());
        badge = document.createElement('div');
        let undo = document.createElement('button');
        undo.classList.add('delete');
        undo.setAttribute("type", "button");
        undo.textContent = 'X'
        ingredientList.appendChild(badge);
        badge.classList.add('ingredient-badge');
        badge.textContent = `${ingredient.value}`;
        badge.appendChild(undo);
        ingredient.value = '';
    }
});