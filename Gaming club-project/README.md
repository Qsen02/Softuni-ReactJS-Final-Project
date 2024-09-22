# Gaming club
This is web site for posting publications related to games.
# Technologies
-Front-end: React with JavaScript, react-router-dom library and Formik with Yup.

-Back-end: Express and MongoDB database, express-validator, json-web-token and bcrypt.
# API Reference
-Base URL: http://localhost:3000

Games:

-Get all games (GET): /games

-Get game by id (GET): /games/{gameId}

-Search games (GET): /games/search/{searchValue}/by/{criteria}

-Pagination (GET): /games/page/{pageNumber}

-Create game (POST): /games

-Delete game (DELETE): /games/{gameId}

-Edit game (PUT): /games/{gameId}

-Like game (POST): /games/{gameId}/like

-Unlike game (POST): /games/{gameId}/unlike

-Save game (POST): /games/{gameId}/save

-Unsave game (POST): /games/{gameId}/unsave

Users:

-Register (POST): /users/register

-Login (POST): /users/login

-Logout (GET): /users/logout

-Get user by id (GET): /users/{userId}

-Get all saved games by current user (GET): /users/{userId}/savedGames

-Get all created games by current user (GET): /users/{userId}/authorGames

Comments:

-Get comment by id (GET): /comments/{commentId}

-Create comment (POST): /comments/games/{gameId}

-Delete comment (DELETE): /comments/{commentId}

-Edit comment (PUT): /comments/{commentId}

-Like comment (POST): /comments/{commentId}/like

-Unlike comment (POST): /comments/{commentId}/unlike

Answers:

-Get all answers for comment (GET): /answers/comment/{commentId}

-Create answer for comment (POST): /answers/comment/{commentId}

-Get answer by id (GET): /answers/{answerId}

-Edit answer (PUT): /answers/{answerId}

-Delete answer (DELETE): /answer/{answerId}/from/{commentId}
# Features
Users can login or register. All users can see the catalog, details and comments for games but only logged in users can like and save games and comment the games. Every logged in user have profile page which include information about username, email, created and saved games by this user. Every logged in user can post publications but only owner of the publication can edit or delete this publication.
# How to start client and server
You can start client with command  `npm run dev` .

You can start server with command  `npm start` .
# Screenshots
-Catalog:
![Screenshot 2024-07-31 120815](https://github.com/user-attachments/assets/e4bcc314-c988-4b90-b717-6969518d7133)
-Details:
![Screenshot 2024-07-31 120842](https://github.com/user-attachments/assets/9e81099b-7d15-4c39-9d75-535f1c725003)
-Comments:
![Screenshot 2024-07-31 120900](https://github.com/user-attachments/assets/dd35a901-10f6-48a4-baea-ab3e3c704c47)
-Profile:
![Screenshot 2024-07-31 121316](https://github.com/user-attachments/assets/23ddb6da-0f50-4905-968e-1414fa72d485)
