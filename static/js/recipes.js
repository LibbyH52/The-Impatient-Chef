const apiKey = "7dccf009d1d3499ab7f9fa0b154fdc3d";



const randomRecipes = async() => {
    const url = `https://api.spoonacular.com/recipes/random`;
    const query = `?apiKey=${apiKey}&limitLicense=true&max&maxReadyTime=60&number=6&sortDirection='desc`;
    const response = await fetch(url+query);
    const data = await response.json();

    return data;
}

const getRecipes = async (recipeName, diet, meal, cuisine, ingredientStr) => {
    const url = "https://api.spoonacular.com/recipes/complexSearch";
    const query = `?apiKey=${apiKey}&query=${recipeName}&diet=${diet}&type=${meal}&cuisine=${cuisine}&includeIngredients=${ingredientStr}&limitLicense=true&max&maxReadyTime=60&sortDirection='desc'`;

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

