// Base URL of json-server
const baseURL = "http://localhost:3000/recipes";
// Get references to HTML elements
const recipeList = document.getElementById("recipe-list");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
function fetchRecipes() {
  fetch(baseURL)
    .then(res => res.json())       // Convert response to JSON
    .then(data => {
      displayRecipes(data);        // Pass recipes to render function
    });
}