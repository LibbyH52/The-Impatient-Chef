const ingredientForm = document.querySelector('.ingredient-form');

const filterForm = document.querySelector('.search-filters');
const filterBtns = document.querySelectorAll('.filter-btn');

const recipeContainer = document.querySelector('.recipe-container');

//captures input from html form (filter form)
const dietType = document.querySelectorAll('input[name="diet-type"]');
const mealType = document.querySelectorAll('input[name="meal-type"]');
const cuisineType = document.querySelectorAll('input[name="cuisine"]');
const allergenList = document.querySelectorAll('input[name="allergen"]');
const ingredient = document.querySelector('input[name="ingredient"]');

const addBtn = document.querySelector('.add-btn');

const ingredientList = document.querySelector('#ingredient-list');

const recipeOne = document.querySelector('#single-recipe');

// const recipeModal = document.querySelector('.recipe-modal');
const closeBtn = document.querySelector('.close-btn');

const dietInfo = document.querySelector('.diet-info');
const nutritionInfo = document.querySelector('.recipe-info');

//singleRecipe variables
const singleImg = document.querySelector('.single-img');
const singleDetails = document.querySelector('.single-details');
const recipeHeading = document.querySelector('.single-title');
const recipeAuthor = document.querySelector('.recipe-author');
const singleRecipeIngredients = document.querySelector('.ingredient-list');
const instructionList = document.querySelector('.instruction-list');

// let recipeCards = recipeContainer.childNodes;
let recipeList = [];
let ingredients = [];
let badge = '';
let id = 0;

//arrays for pushing allergen & cuisine selection
let allergens = [];
let cuisines = [];


const showRecipe = (recipe) => {
    let recipeInfo = recipe.oneRecipe;
    console.log(recipeInfo);

    let recipeImage = document.createElement('img');
    recipeHeading.textContent = recipeInfo.title;
    recipeImage.setAttribute("alt", `picture of ${recipeInfo.title}`);
    recipeImage.setAttribute("src", recipeInfo.image);
    recipeImage.classList.add("recipe-img");
    recipeAuthor.textContent = recipeInfo.author;
    singleImg.appendChild(recipeImage);

    console.log(`Ready in ${recipeInfo.readyInMinutes} minutes`);
    console.log(`Serves ${recipeInfo.servings}`);
    let diets = recipeInfo.diets;
    console.log(diets);
    let nutrientInfo = recipeInfo.nutrition.nutrients;

    for (let i=0; i<nutrientInfo.length; i++){
        if(nutrientInfo[i].name === 'Calories' ||nutrientInfo[i].name === 'Carbohydrates' || nutrientInfo[i].name==='Fat' ||nutrientInfo[i].name==='sugar'|| nutrientInfo[i].name==='Protein'||nutrientInfo[i].name==='Fiber' || nutrientInfo[i].name==='salt' ) {
            if(nutrientInfo[i].name === 'Carbohydrates'){
                nutrientInfo[i].name = 'Carbs'
            }
            let nutrition = document.createElement('span');
            nutrition.classList.add('nutrient-info');
            nutrition.textContent = `${nutrientInfo[i].name} ${nutrientInfo[i].amount}${nutrientInfo[i].unit}`;
            nutritionInfo.appendChild(nutrition);
        }
    }


    for(let i=0; i<diets.length; i++){
        let dietTag = document.createElement('span');
        dietTag.classList.add('free-from');
        dietTag.textContent = diets[i];
        dietInfo.appendChild(dietTag);
    }

    let recipeIngredients = recipeInfo.extendedIngredients;
    console.log('Ingredients');
    for(let i=0; i<recipeIngredients.length; i++) {
        console.log(recipeIngredients[i].original);
        let ingredientItem = document.createElement('li');
        ingredientItem.classList.add('list-item');
        ingredientItem.textContent = recipeIngredients[i].original;
        singleRecipeIngredients.appendChild(ingredientItem);
    } 
    if(recipeInfo.analyzedInstructions.length > 0) {
        let instructions = recipeInfo.analyzedInstructions[0].steps;
        for(let i=0; i<instructions.length; i++) {
            let instructionItem = document.createElement('li');
            instructionItem.classList.add('list-item');
            instructionItem.textContent = instructions[i].step;
            instructionList.appendChild(instructionItem);
        }
    } else {
        instructionList.innerHTML = "This is embarrassing. </br> There are no instructions available for this recipe"
    }
}

closeBtn.addEventListener("click", () => {
    recipeOne.classList.add("hide");
    recipeContainer.classList.remove("hide");
    singleImg.innerHTML = '';
    recipeHeading.innerHTML = '';
    recipeAuthor.innerHTML = '';
    singleRecipeIngredients.innerHTML = '';
    instructionList.innerHTML = '';
});

const displayRecipes = (data) => {
    recipeContainer.innerHTML = '';
    recipeList = data.recipeList.results;
    for(let i=0; i<recipeList.length; i++){
        recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        //capture the recipe id for displaying a single recipe on click
        recipeCard.dataset.id = recipeList[i].id;
        recipeCard.classList.add("recipe-card");
        //three parts of the recipe card
        let cardHead = document.createElement('div'); 
        let cardBody = document.createElement('div');
        let cardFooter = document.createElement('div'); 

        //classes to the various elements for styling
        cardHead.classList.add('recipe-head');
        cardBody.classList.add('recipe-body');
        cardFooter.classList.add('recipe-footer');

        //recipe image & source for the cardHead
        let image = document.createElement('img');
        image.src = recipeList[i].image;

        //recipe name & author for the card body
        let name = document.createElement('h3');

        //paragraphs for cardFooter
        let cuisineInfo = document.createElement('p');
        let courseInfo = document.createElement('p');

        image.classList.add('recipe-img');
        name.classList.add("recipe-heading");

        name.textContent = recipeList[i].title;

        //add child divs to the relevant elements
        recipeContainer.appendChild(recipeCard);
        recipeCard.appendChild(cardHead);
        cardHead.appendChild(image);
        recipeCard.appendChild(cardBody);
        cardBody.appendChild(name);
    }
    console.log(recipeList);
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
    recipeCards.forEach(recipeCard => {
        recipeCard.addEventListener("click", () => {
            id = recipeCard.dataset.id;
            recipeOne.classList.remove('hide');
            recipeContainer.classList.add('hide');
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
            allergens.push(allergenList[i].value);
        }
    }
    allergen = allergens.join(',');

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
            cuisines.push(cuisineType[i].value);
        }
    }
    cuisine = cuisines.join(',');

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