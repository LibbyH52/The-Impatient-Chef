const filterForm = document.querySelector('.search-filters');
const recipeContainer = document.querySelector('.recipe-container');
const dietType = document.querySelectorAll('input[name="diet-type"]');
const occasionType = document.querySelectorAll('input[name="occasion"]');
const cuisineType = document.querySelectorAll('input[name="cuisine"]');
const filterBtn = document.querySelector('.filter-btn');
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

const allRecipes = async (recipeName, diet, cuisine) => {
    //calling api function in here
    const recipeList = await getRecipes(recipeName, diet, cuisine);
    return { recipeList: recipeList }
}

filterForm.addEventListener("submit", e => {
    e.preventDefault();

    //get the recipe name from the user
    const recipeName = document.querySelector('#recipe-search').value.trim();
    let diet = '';
    for(let i=0; i<dietType.length; i++) {
        if(dietType[i].checked) {
            diet = dietType[i].value;
        }
    }
    let cuisine = '';
    for(let i=0; i<cuisineType.length; i++) {
        if(cuisineType[i].checked) {
            cusine = cuisineType[i].value;
        }
    }

    filterForm.reset();

    allRecipes(recipeName, diet, cuisine)
        .then(data => displayRecipes(data))
        .catch(err => console.log(err));
});

// filterBtn.addEventListener("click", () => {

//     allRecipes(recipeName, diet, cuisine)
//         .then(data => displayRecipes(data))
//         .catch(err => console.log(err));
// });

