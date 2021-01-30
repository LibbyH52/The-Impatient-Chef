const getRecipes = async (recipeName) => {
    const url = "https://api.spoonacular.com/recipes/complexSearch";
    const query = `?apiKey=${apiKey}&query=${recipeName}&number=6`;

    const response = await fetch(url+query);
    const data = await response.json();

    return data;
}
