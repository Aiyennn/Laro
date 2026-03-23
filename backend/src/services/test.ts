import {
  getAllGames,
  getGameDetails,
  getGameGenres,
  getGamePlatforms,
  getGameTags,
  getGameReviews,
  addReview,
  updateReview,
  deleteReview,
  likeReview,
  getUserByUsername,
  registerUser,
  searchGames,
  filterGamesByGenre,
} from "./queries"

export const runTests = async () => {
  try {
    console.log("1. Testing getAllGames()");
    const allGames = await getAllGames();
    console.log(allGames);

    console.log("\n2. Testing getGameDetails(1)");
    const gameDetails = await getGameDetails(1);
    console.log(gameDetails);

    console.log("\n3a. Testing getGameGenres(4)");
    const genres = await getGameGenres(4);
    console.log(genres);

    console.log("\n3b. Testing getGamePlatforms(4)");
    const platforms = await getGamePlatforms(4);
    console.log(platforms);

    console.log("\n3c. Testing getGameTags(4)");
    const tags = await getGameTags(4);
    console.log(tags);

    console.log("\n4. Testing getGameReviews(1)");
    const reviews = await getGameReviews(1);
    console.log(reviews);

    console.log("\n5. Testing addReview(1, 1, 'Great game!', 5)");
    const add = await addReview(1, 1, "Great game!", 5);
    console.log(add);

    console.log("\n6. Testing updateReview(1, 1, 'Updated review', 4)");
    const update = await updateReview(1, 1, "Updated review", 4);
    console.log(update);

    console.log("\n7. Testing deleteReview(1, 1)");
    const del = await deleteReview(1, 1);
    console.log(del);

    console.log("\n8. Testing likeReview(1)");
    const like = await likeReview(1);
    console.log(like);

    console.log("\n9. Testing getUserByUsername('testuser')");
    const user = await getUserByUsername("testuser");
    console.log(user);

    console.log("\n10. Testing registerUser('newuser', 'new@example.com', 'password')");
    const register = await registerUser("newuser", "new@example.com", "password");
    console.log(register);

    console.log("\n11. Testing searchGames('Hula')");
    const search = await searchGames("Hula");
    console.log(search);

    console.log("\n12. Testing filterGamesByGenre(1)");
    const filter = await filterGamesByGenre(1);
    console.log(filter);

  } catch (err) {
    console.error("Test failed:", err);
  }
}

runTests();