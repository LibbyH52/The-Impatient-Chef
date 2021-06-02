const apiKey = API_Key;


const getRecipes = async (recipeName,diet,meal,cuisine,allergen) => {
    console.log(`diet = ${diet} meal= ${meal} cuisine=${cuisine} allergen= ${allergen}`)
    const url = "https://api.spoonacular.com/recipes/complexSearch";
    const query = `?apiKey=${apiKey}&query=${recipeName}&diet=${diet}&type=${meal}&cuisine=${cuisine}&${allergen}&limitLicense=true&maxReadyTime=59&number=12&sortDirection='desc'`;
    console.log(url+query);
    const response = await fetch(url+query);
    const data = await response.json();

    return data;
}

const getRecipe = async (id) => {
    const url = `https://api.spoonacular.com/recipes/${id}/information`;
    const query = `?apiKey=${apiKey}&includeNutrition=true`;

    const response = await fetch(url+query);
    const recipe = await response.json();

    return recipe;
}

