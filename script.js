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
// Render the recipe cards on the page
function displayRecipes(recipes) {
  recipeList.innerHTML = ""; // Clear current content

  recipes.forEach(recipe => {
    // Create card container
    const card = document.createElement("div");
    card.className = "recipe-card";
    // Add recipe content
    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Category:</strong> ${recipe.category}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
      <p>${recipe.instructions}</p>
      <button class="favorite-btn"> Favorite</button>
    `;
     // Handle favorite button click (Event 3)
    const favBtn = card.querySelector(".favorite-btn");
    favBtn.addEventListener("click", () => toggleFavorite(favBtn));

    // Append card to page
    recipeList.appendChild(card);
  });
}
// Event 1: Filter recipes by search term
searchInput.addEventListener("input", () => {
  fetch(baseURL)
    .then(res => res.json())
    .then(data => {
      const searchTerm = searchInput.value.toLowerCase();
 // Filter recipes by name (array iteration)
      const filtered = data.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm)
      );

      displayRecipes(filtered);
    });
});
