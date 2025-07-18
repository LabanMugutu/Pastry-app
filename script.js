// Replace this with your actual Render API URL
const baseURL = "https://your-render-api-url.onrender.com/recipes";

// DOM references
const recipeList = document.getElementById("recipe-list");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

// Fetch all recipes from the backend and render them
function fetchRecipes() {
  fetch(baseURL)
    .then(response => response.json())
    .then(data => {
      displayRecipes(data);
    })
    .catch(error => {
      console.error("Error fetching recipes:", error);
      recipeList.innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
    });
}

// Render recipe cards on the page
function displayRecipes(recipes) {
  recipeList.innerHTML = ""; // Clear existing content

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    // Fill the card with recipe info
    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Category:</strong> ${recipe.category}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
      <p>${recipe.instructions}</p>
      <button class="favorite-btn">❤️ Favorite</button>
    `;

    // Event 3: Click to toggle favorite
    const favBtn = card.querySelector(".favorite-btn");
    favBtn.addEventListener("click", () => toggleFavorite(favBtn));

    // Add the card to the DOM
    recipeList.appendChild(card);
  });
}

// Event 1: Search functionality
searchInput.addEventListener("input", () => {
  fetch(baseURL)
    .then(res => res.json())
    .then(data => {
      const searchTerm = searchInput.value.toLowerCase();

      // Use array.filter() to search recipes by name
      const filtered = data.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm)
      );

      displayRecipes(filtered);
    })
    .catch(error => {
      console.error("Search error:", error);
    });
});

// Event 2: Filter by category dropdown
filterSelect.addEventListener("change", () => {
  fetch(baseURL)
    .then(res => res.json())
    .then(data => {
      const selectedCategory = filterSelect.value;

      // Filter recipes by category or return all
      const filtered =
        selectedCategory === "All"
          ? data
          : data.filter(recipe => recipe.category === selectedCategory);

      displayRecipes(filtered);
    })
    .catch(error => {
      console.error("Filter error:", error);
    });
});

// Toggle favorite button text
function toggleFavorite(button) {
  button.textContent =
    button.textContent === " Favorite" ? " Unfavorite" : " Favorite";
}

// Initial load
fetchRecipes();
