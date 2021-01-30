const apiKey = "7dccf009d1d3499ab7f9fa0b154fdc3d";

const getRecipes = async (recipeName) => { 
    const url = "https://api.spoonacular.com/recipes/complexSearch";
    const query = `?apiKey=${apiKey}&query=${recipeName}&number=9`;

    const response = await fetch(url+query);
    const data = await response.json();

    return data;
}
