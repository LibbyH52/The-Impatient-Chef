const ingredientForm = document.querySelector('.ingredient-form');

const filterForm = document.querySelector('.search-filters');
const filterBtns = document.querySelectorAll('.filter-btn');

const recipeContainer = document.querySelector('.recipe-container');
const randomContainer = document.querySelector('.random-container');

//captures input from html form (filter form)
const dietType = document.querySelectorAll('input[name="diet-type"]');
const mealType = document.querySelectorAll('input[name="meal-type"]');
const cuisineType = document.querySelectorAll('input[name="cuisine"]');
const allergenList = document.querySelectorAll('input[name="allergen"]');
const ingredient = document.querySelector('input[name="ingredient"]');

const addBtn = document.querySelector('.add-btn');

const ingredientList = document.querySelector('#ingredient-list');

const recipeOne = document.querySelector('#single-recipe')

// const recipeModal = document.querySelector('.recipe-modal');
const closeBtn = document.querySelector('.close-btn');



//singleRecipe variables
const dietInfo = document.querySelector('.diet-details');
const nutritionInfo = document.querySelector('.nutrient-info');
const singleImg = document.querySelector('.single-img');
const singleDetails = document.querySelector('.single-details');
const recipeHeading = document.querySelector('.single-title');
const recipeAuthor = document.querySelector('.recipe-author');
const singleRecipeIngredients = document.querySelector('.ingredient-list');
const instructionList = document.querySelector('.instruction-list');

let randomTag = '';
let tagName = '';
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
    recipeImage.setAttribute("alt", `picture of ${recipeInfo.title}`);
    recipeImage.setAttribute("src", recipeInfo.image);
    recipeImage.classList.add("recipe-img");
    recipeHeading.textContent = recipeInfo.title;
    recipeAuthor.setAttribute('href', recipeInfo.sourceUrl);
    if(recipeInfo.creditsText.includes(recipeInfo.sourceName)){
        recipeAuthor.textContent = recipeInfo.sourceName;
    } else {
        recipeAuthor.textContent = recipeInfo.creditsText;
    }
    singleImg.appendChild(recipeImage);
    let readyIn = document.querySelector('.minutes');
    readyIn.textContent = `${recipeInfo.readyInMinutes} minutes`;
    let servingSize = document.querySelector('.serving-size');
    servingSize.textContent = recipeInfo.servings;
    let diets = recipeInfo.diets;
    let nutrientInfo = recipeInfo.nutrition.nutrients;

    for (let i=0; i<nutrientInfo.length; i++){
        if(nutrientInfo[i].name === 'Calories' ||nutrientInfo[i].name === 'Carbohydrates' || nutrientInfo[i].name==='Fat' ||nutrientInfo[i].name==='sugar'|| nutrientInfo[i].name==='Protein'||nutrientInfo[i].name==='Fiber' || nutrientInfo[i].name==='salt' ) {
            if(nutrientInfo[i].name === 'Carbohydrates'){
                nutrientInfo[i].name = 'Carbs'
            }
            let nutrition = document.createElement('div');
            let nutrientName = document.createElement('span');
            let nutrientAmount = document.createElement('span');
            nutrition.classList.add('nutrition');
            nutrientName.classList.add('nutrient-name');
            nutrientAmount.classList.add('nutrient-amount');
            nutrientName.textContent = nutrientInfo[i].name;
            nutrientAmount.textContent = `${nutrientInfo[i].amount} ${nutrientInfo[i].unit}`;
            nutrition.appendChild(nutrientName);
            nutrition.appendChild(nutrientAmount);
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
    let instructions = recipeInfo.analyzedInstructions[0].steps;
    for(let i=0; i<instructions.length; i++) {
        let instructionItem = document.createElement('li');
        instructionItem.classList.add('list-item');
        instructionItem.textContent = instructions[i].step;
        instructionList.appendChild(instructionItem);
    }
}

closeBtn.addEventListener("click", () => {
    recipeOne.classList.add("hide");
    recipeContainer.classList.remove("hide");
    randomContainer.classList.remove("hide");
    singleImg.innerHTML = '';
    recipeHeading.innerHTML = '';
    recipeAuthor.innerHTML = '';
    singleRecipeIngredients.innerHTML = '';
    instructionList.innerHTML = '';
    nutritionInfo.innerHTML = '';
    dietInfo.innerHTML ='';
});

const showRandom = (data) => {
    randomList = data.recipes;
    let randomHeading = document.createElement('h2');
    randomHeading.classList.add('secondary-heading');
    if(randomTag === 'cookies,cakes' || randomTag === 'dessert') {
        tagName = 'In the mood for something sweet?'
    } else if(randomTag === 'snack'|| randomTag == 'finger food') {
        tagName = 'Light Bites'
    } else if(randomTag === 'cocktails') {
        tagName = 'Cocktail Hour'
    } else if(randomTag === 'lunch' || randomTag === 'dinner') {
        tagName = 'Main Course'
    }
    console.log(tagName)
    randomHeading.textContent = tagName;
    randomContainer.appendChild(randomHeading);
    for(let i=0; i<randomList.length; i++){
        recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        //three parts of the recipe card
        let cardHead = document.createElement('div'); 
        let cardBody = document.createElement('div');
        let cardFooter = document.createElement('div');
        //recipe image for the cardHead
        let randomImage = document.createElement('img');
        randomImage.classList.add('recipe-img');
        randomImage.src = randomList[i].image;
        //recipe name
        let randomName = document.createElement('h3');
        randomName.textContent = randomList[i].title;
        randomName.classList.add('recipe-heading');
        //classes to the various elements for styling
        cardHead.classList.add('recipe-head');
        cardBody.classList.add('recipe-body');
        //capture the recipe id for displaying a single recipe on click
        recipeCard.dataset.id = randomList[i].id;
        //appending relevant to parent elements
        randomContainer.appendChild(recipeCard);
        recipeCard.appendChild(cardHead);
        recipeCard.appendChild(cardBody);
        recipeCard.appendChild(cardFooter);
        cardBody.appendChild(randomName);
        cardHead.appendChild(randomImage);
    }
    console.log(randomList);
    getID(id);
}

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
            randomContainer.classList.add('hide');
            singleRecipe(id)
                .then(recipe => showRecipe(recipe))
                .catch(err => console.log(err));
        });
    });
    console.log(id);
}

//get random recipes on page load
document.addEventListener('DOMContentLoaded', () => {
    //array of keywords for random recipes
    const randomArr = ['breakfast', 'lunch', 'cocktail', 'cookies,cake', 'dessert', 'dinner', 'snack'];
    randomTag = randomArr[Math.floor(Math.random()*randomArr.length)];
    randomRecipes(randomTag)
        .then(data => showRandom(data))
        .catch(err => console.log(err));
});

const showRandomRecipes = async (randomTag) => {
    //calling api function in here
    const randomList = await randomRecipes(randomTag);
    return { randomList: randomList }
}

const allRecipes = async (recipeName, diet, meal, cuisine, ingredients) => {
    //calling api function in here
    const recipeList = await getRecipes(recipeName, diet, meal, cuisine,ingredients);
    return { recipeList: recipeList }
}

// addBtn.addEventListener("click", () => {
//     if(ingredient.value !== '' & ingredients.length < 3){
//         ingredients.push(ingredient.value.trim());
//         badge = document.createElement('div');
//         let undo = document.createElement('button');
//         undo.classList.add('delete');
//         undo.setAttribute("type", "button");
//         undo.textContent = 'X'
//         ingredientList.appendChild(badge);
//         badge.classList.add('ingredient-badge');
//         badge.textContent = `${ingredient.value}`;
//         badge.appendChild(undo);
//         ingredient.value = '';
//     }
// });

// filterForm.addEventListener("submit", e => {
//     e.preventDefault();
//     let diet = '';
//     let meal = '';
//     let cuisine = '';
//     let ingredientStr = '';
//     ingredientList.innerHTML = '';

//     //get the recipe name from the user
//     const recipeName = document.querySelector('#recipe-search').value.trim();
//     if(ingredients.length > 1) {
//         ingredientStr = ingredients.join(',');
//     }

//     for(let i=0; i<allergenList.length; i++) {
//         if(allergenList[i].checked) {
//             allergens.push(allergenList[i].value);
//         }
//     }
//     allergen = allergens.join(',');

//     for(let i=0; i<dietType.length; i++) {
//         if(dietType[i].checked) {
//             diet = dietType[i].value;
//         }
//     }

//     // for(let i=0; i<mealType.length; i++) {
//     //     if(mealType[i].checked) {
//     //         meal = mealType[i].value;
//     //     }
//     // }

//     for(let i=0; i<cuisineType.length; i++) {
//         if(cuisineType[i].checked) {
//             cuisines.push(cuisineType[i].value);
//         }
//     }
//     cuisine = cuisines.join(',');

//     filterForm.reset();

//     allRecipes(recipeName, diet, meal, cuisine, ingredientStr)
//         .then(data => displayRecipes(data))
//         .catch(err => console.log(err));
// });

// addBtn.addEventListener("click", () => {
//     if(ingredient.value !== '' & ingredients.length < 3){
//         ingredients.push(ingredient.value.trim());
//         badge = document.createElement('div');
//         let undo = document.createElement('button');
//         undo.classList.add('delete');
//         undo.setAttribute("type", "button");
//         undo.textContent = 'X'
//         ingredientList.appendChild(badge);
//         badge.classList.add('ingredient-badge');
//         badge.textContent = `${ingredient.value}`;
//         badge.appendChild(undo);
//         ingredient.value = '';
//     }
// });