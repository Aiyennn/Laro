import { query } from "../config/db";

// 1. Get all games (catalog)
export async function getAllGames() {
  return query<{
    game_id: number;
    title: string;
    release_date: string;
    developer: string;
    publisher: string;
  }>(`
    SELECT g.game_id, g.title, g.release_date,
           d.name AS developer,
           p.name AS publisher
    FROM Game g
    JOIN Developer d ON g.developer_id = d.developer_id
    JOIN Publisher p ON g.publisher_id = p.publisher_id
    ORDER BY g.release_date DESC
  `);
}

// 2. Get single game details
export async function getGameDetails(gameId: number) {
  return query<{
    game_id: number;
    title: string;
    description: string;
    developer: string;
    publisher: string;
    release_date: string;
  }>(`
    SELECT g.*, d.name AS developer, p.name AS publisher
    FROM Game g
    JOIN Developer d ON g.developer_id = d.developer_id
    JOIN Publisher p ON g.publisher_id = p.publisher_id
    WHERE g.game_id = ?
  `, [gameId]);
}

// 3a. Get game genres
export async function getGameGenres(gameId: number) {
  return query<{ name: string }>(`
    SELECT ge.name
    FROM Game_genre gg
    JOIN Genre ge ON gg.genre_id = ge.genre_id
    WHERE gg.game_id = ?
  `, [gameId]);
}

// 3b. Get game platforms
export async function getGamePlatforms(gameId: number) {
  return query<{ name: string }>(`
    SELECT pl.name
    FROM Game_platform gp
    JOIN Platform pl ON gp.platform_id = pl.platform_id
    WHERE gp.game_id = ?
  `, [gameId]);
}

// 3c. Get game tags
export async function getGameTags(gameId: number) {
  return query<{ name: string }>(`
    SELECT t.name
    FROM Game_tag gt
    JOIN Tag t ON gt.tag_id = t.tag_id
    WHERE gt.game_id = ?
  `, [gameId]);
}

// 4. Get reviews for a game
export async function getGameReviews(gameId: number) {
  return query<{
    review_id: number;
    username: string;
    review_text: string;
    rating: number;
    likes_count: number;
    created_at: string;
  }>(`
    SELECT r.review_id, u.username, r.review_text, r.rating, r.likes_count, r.created_at
    FROM Review r
    JOIN User u ON r.user_id = u.user_id
    WHERE r.game_id = ?
    ORDER BY r.created_at DESC
  `, [gameId]);
}

// 5. Add a review
export async function addReview(userId: number, gameId: number, reviewText: string, rating: number) {
  return query(`
    INSERT INTO Review (user_id, game_id, review_text, rating, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `, [userId, gameId, reviewText, rating]);
}

// 6. Update a review
export async function updateReview(reviewId: number, userId: number, reviewText: string, rating: number) {
  return query(`
    UPDATE Review
    SET review_text = ?, rating = ?, updated_at = NOW()
    WHERE review_id = ? AND user_id = ?
  `, [reviewText, rating, reviewId, userId]);
}

// 7. Delete a review
export async function deleteReview(reviewId: number, userId: number) {
  return query(`
    DELETE FROM Review
    WHERE review_id = ? AND user_id = ?
  `, [reviewId, userId]);
}

// 8. Like a review
export async function likeReview(reviewId: number) {
  return query(`
    UPDATE Review
    SET likes_count = likes_count + 1
    WHERE review_id = ?
  `, [reviewId]);
}

// 9. User login (fetch user by username)
export async function getUserByUsername(username: string) {
  return query<{
    user_id: number;
    username: string;
    password: string;
    role: string;
  }>(`
    SELECT user_id, username, password, role
    FROM User
    WHERE username = ?
  `, [username]);
}

// 10. Register user
export async function registerUser(username: string, email: string, password: string) {
  return query(`
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?)
  `, [username, email, password]);
}

// 11. Search games by title
export async function searchGames(title: string) {
  return query<{ game_id: number; title: string }>(`
    SELECT game_id, title
    FROM Game
    WHERE title LIKE CONCAT('%', ?, '%')
  `, [title]);
}

// 12. Filter games by genre
export async function filterGamesByGenre(genreId: number) {
  return query<{ game_id: number; title: string }>(`
    SELECT g.game_id, g.title
    FROM Game g
    JOIN Game_genre gg ON g.game_id = gg.game_id
    WHERE gg.genre_id = ?
  `, [genreId]);
}