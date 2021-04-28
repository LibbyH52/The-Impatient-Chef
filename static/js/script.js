//forms and form buttons
const filterForm = document.querySelector('.search-filters');

const recipeContainer = document.querySelector('.recipe-container');

//captures input from html form (filter form)
const dietType = document.querySelectorAll('input[name="diet-type"]');
const mealType = document.querySelectorAll('input[name="meal-type"]');
const cuisineType = document.querySelectorAll('input[name="cuisine"]');
const allergenList = document.querySelectorAll('input[name="allergen"]');

// const recipeModal = document.querySelector('.recipe-modal');
const closeBtn = document.querySelector('.close-btn');
const filterHeading = document.querySelector('.filter-heading');
const closeForm = document.querySelector('.close');
const about = document.querySelector('.about-container');

//singleRecipe variables
const recipeOne = document.querySelector('#single-recipe');
const recipeCuisine = document.querySelector('.cuisine-list');
const recipeDish = document.querySelector('.meal-list');
const dietInfo = document.querySelector('.diet-list');
const nutritionInfo = document.querySelector('.nutrient-info');
const singleImg = document.querySelector('.single-img');
const singleDetails = document.querySelector('.single-details');
const recipeHeading = document.querySelector('.single-title');
const recipeAuthor = document.querySelector('.recipe-author');
const singleRecipeIngredients = document.querySelector('.ingredient-list');
const instructionList = document.querySelector('.instruction-list');

// let recipeCards = recipeContainer.childNodes;
let recipeList = [];
let id = 0;
let recipeName = '';
let meal = '';

//open/ close filter form on smaller screens
filterHeading.addEventListener('click', () => {
    filterForm.style.display = 'flex';
    closeForm.classList.remove('hide');
});

closeForm.addEventListener('click', () => {
    filterForm.style.display = 'none';
    closeForm.classList.add('hide');
});

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

    if(recipeInfo.dishTypes > 0) {
        let dishList = recipeInfo.dishTypes.join(' , ');
        recipeDish.textContent = dishList;
        console.log(dishList);
    } else {
        recipeDish.textContent = 'Not specified.'
    }
    if(recipeInfo.cuisines > 0) {
        let cuisineList = recipeInfo.cuisines.join(',');
        recipeCuisine.textContent = cuisineList;
    } else {
        recipeCuisine.textContent = 'Not specified.'
    }
    if(recipeInfo.diets.length > 0){
        diet = recipeInfo.diets.join(',');
        dietInfo.textContent = diet;
        console.log(diet);
    } else {
         dietInfo.textContent = 'Not available'
    }
    let nutrientInfo = recipeInfo.nutrition.nutrients;
    for (let i=0; i<nutrientInfo.length; i++){
        if(nutrientInfo[i].name === 'Calories' ||nutrientInfo[i].name === 'Carbohydrates' || nutrientInfo[i].name==='Fat' || nutrientInfo[i].name==='Protein'||nutrientInfo[i].name==='Fiber' ) {
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
    singleImg.innerHTML = '';
    recipeHeading.innerHTML = '';
    recipeAuthor.innerHTML = '';
    recipeCuisine.innerHTML = '';
    singleRecipeIngredients.innerHTML = '';
    instructionList.innerHTML = '';
    nutritionInfo.innerHTML = '';
    dietInfo.innerHTML ='';
});

const displayRecipes = (data) => {
    recipeContainer.innerHTML = '';
    let resultsHeading = document.createElement('h2');
    recipeName = recipeName.charAt(0).toUpperCase() + recipeName.slice(1);
    resultsHeading.classList.add('secondary-heading');
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

        //classes to the various elements for styling
        cardHead.classList.add('recipe-head');
        cardBody.classList.add('recipe-body');

        //recipe image & source for the cardHead
        let image = document.createElement('img');
        image.src = recipeList[i].image;

        //recipe name & author for the card body
        let name = document.createElement('h3');

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

const allRecipes = async (recipeName,diet,meal,cuisine) => {
    //calling api function in here
    const recipeList = await getRecipes(recipeName,diet,meal,cuisine);
    return { recipeList: recipeList }
}


filterForm.addEventListener("submit", e => {
    e.preventDefault();
    about.classList.add('hide');
    closeForm.classList.add('hide');
    recipeContainer.classList.remove('hide');
    let diet = '';
    let meal = '';
    let cuisine = '';
    let allergen = '';
    //arrays for pushing allergen & cuisine selection
    let allergens = [];
    let cuisines = [];


    recipeName = document.querySelector('#name').value.trim();

    for(let i=0; i<allergenList.length; i++) {
        if(allergenList[i].checked) {
            allergens.push(allergenList[i].value);
        }
    }

    for(let i=0; i<dietType.length; i++) {
        if(dietType[i].checked) {
            diet = dietType[i].value;
        }
        console.log(diet)
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
    allergen = allergens.join(',');


    filterForm.reset();
    filterForm.style.display = 'none';
    console.log(recipeName,diet,meal,cuisine,allergen);
    allRecipes(recipeName,diet,meal,cuisine,allergen)
        .then(data => displayRecipes(data))
        .catch(err => console.log(err));
});

