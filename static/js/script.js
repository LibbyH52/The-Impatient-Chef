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

const recipeOne = document.querySelector('.single-recipe');

const recipeModal = document.querySelector('.recipe-modal');
const closeBtn = document.querySelector('.close-btn');

let recipeCards = recipeContainer.childNodes;
let recipeList = [];
let ingredients = [];
let badge = '';
let id = 0;


const showRecipe = (recipe) => {
    let recipeInfo = recipe.oneRecipe;
    console.log(recipeInfo);
    const recipeHeading = document.querySelector('.single-recipe-title');
    const ingredientList = document.querySelector('.ingredient-list');
    const instructionList = document.querySelector('.instruction-list');
    const modalHeading = document.querySelector('.modal-heading');
    recipeHeading.textContent = recipeInfo.title;
    console.log(recipeInfo.title);
    modalHeading.style.backgroundImage = `url(${recipeInfo.image})`;

    console.log(`Ready in ${recipeInfo.readyInMinutes} minutes`);
    console.log(`Serves ${recipeInfo.servings}`);

    let recipeIngredients = recipeInfo.extendedIngredients;
    console.log('Ingredients');
    for(let i=0; i<recipeIngredients.length; i++) {
        console.log(recipeIngredients[i].original);
        let ingredientItem = document.createElement('li');
        ingredientItem.classList.add('list-item');
        ingredientItem.textContent = recipeIngredients[i].original;
        ingredientList.appendChild(ingredientItem);
    } 
    let instructions = recipeInfo.analyzedInstructions[0].steps;
    console.log('Instrutions');
    for(let i=0; i<instructions.length; i++) {
        let instructionItem = document.createElement('li');
        instructionItem.classList.add('list-item');
        instructionItem.textContent = instructions[i].step;
        instructionList.appendChild(instructionItem);
    }
}

closeBtn.addEventListener("click", () => {
    recipeModal.classList.add("hide");
});

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
    getID(id);
}

const singleRecipe = async (id) => {
    //calling api function in here
    const oneRecipe = await getRecipe(id);
    id = '';
    return { oneRecipe: oneRecipe }
}

const getID = (id) => {
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
    console.log(id);
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