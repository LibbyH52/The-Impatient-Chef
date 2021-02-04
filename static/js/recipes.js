const apiKey = "7dccf009d1d3499ab7f9fa0b154fdc3d";


const getRecipes = async (recipeName, diet, meal, cuisine, ingredientStr) => {
    const url = "https://api.spoonacular.com/recipes/complexSearch";
    const query = `?apiKey=${apiKey}&query=${recipeName}&diet=${diet}&type=${meal}&cuisine=${cuisine}&includeIngredients=${ingredientStr}&number=9`;

    const response = await fetch(url+query);
    const data = await response.json();

    return data;
}

const getRecipe = async (id) => {
    const url = `https://api.spoonacular.com/recipes/${id}/information`;
    const query = `?apiKey=${apiKey}`;

    const response = await fetch(url+query);
    const recipe = await response.json();

    return recipe;
}

