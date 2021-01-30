const searchBtn = document.querySelector('.search-btn');
const searchForm = document.querySelector('.search-recipes');
const recipeContainer = document.querySelector('.recipe-container');
const mealType = document.querySelectorAll('input[name="meal-type"]');
const occasionType = document.querySelectorAll('input[name="occasion"]');
const cuisineType = document.querySelectorAll('input[name="cuisine"]');
const filterBtn = document.querySelector('.filter-btn');


const displayRecipes = (data) => {
    const recipeList = data.recipeList.results;
    console.log(recipeList);
    for(let i=0; i<recipeList.length; i++){
        let recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeContainer.appendChild(recipeCard);
        let name = document.createElement('h3');
        recipeCard.appendChild(name);
        name.textContent = recipeList[i].title;
        recipeCard.classList.add("recipe-card");
        let image = document.createElement('img');
        recipeCard.appendChild(image);
        image.src = recipeList[i].image;
    }
}

const allRecipes = async (recipeName) => {
    //calling api function in here
    const recipeList = await getRecipes(recipeName);
    return { recipeList: recipeList }
}

searchForm.addEventListener("submit", e => {
    e.preventDefault();

    //get the recipe name from the user
    const recipeName = document.querySelector('#recipe-search').value.trim();
    searchForm.reset();

    allRecipes(recipeName)
        .then(data => displayRecipes(data))
        .catch(err => console.log(err));
});

// filterBtn.addEventListener("click", () => {
//     for(let i=0; i<mealType.length; i++) {
//         if(mealType[i].checked) {
//             console.log(mealType[i].value);
//         }
//     }
//     for(let i=0; i<occasionType.length; i++) {
//         if(occasionType[i].checked) {
//             console.log(occasionType[i].value);
//         }
//     }
//     for(let i=0; i<cuisineType.length; i++) {
//         if(cuisineType[i].checked) {
//             console.log(cuisineType[i].value);
//         }
//     }
// });

