# Movie list
This is app for publications related to movies.
# Technologie stack
Back-end: Express.js and MongoDB

Front-end: React with TypeScript
# API Reference:
Base URL: http://localhost:3000

Users:

-Register (POST): /users/register

-Login (POST): /users/login

-Logout (GET): /users/logout

-Get user by id (GET): /users/{userId}

-Edit user (PUT): /users/{userId}/edit

-Change user password (PUT): /users/{userId}/change/password

Movies: 

-Get all movies (GET): /movies

-Get movie by id (GET): /movies/{movieId}

-Search movies (GET): /movies/search/{query}

-Pagination (GET): /movies/page/{pageNumber}

-Create movie (POST): /movies

-Delete movie (DELETE): /movies/{movieId}

-Edit movie (PUT): /movies/{movieId}

-Like movie (POST): /movies/{movieId}/like

-Unlike movie (POST): /movies/{movieId}/unlike

-Save movie (POST): /movies/{movieId}/save

-Unsave movie (POST): /movies/{movieId}/unsave

-Get top 3 movies (GET): /movies/top

Comments:

-Get comment by id (GET): /comments/{commentId}

-Create comment in movie (POST): /comments/in/{movieId}

-Delete comment from movie (DELETE): /comments/{commentId}/in/{movieId}

-Edit comment in movie (PUT): /comments/{commentId}/in/{movieId}

-Like comment (POST): /comments/{commentId}/in/{movieId}/like

-Unlike comment (POST): /comments/{commentId}/in/{movieId}/unlike

# Features
Guests can see the home, catalog and details and can search for movies but they can't like, save and comment movies. Authenticated users can like, save and comment movies and they can see what liked or saved in their profiles and they can edit their profile image,username and email and can change their password. We have admin profiles too, they can create, edit or delete publications and can see what they are created in their profile, they can comment movies too but they can't like or save their publications.
# How to start client and server:
-Server: enter the command `npm start` in the terminal

-Clien: enter command `npm run dev` in the terminal
# Screenshots
-Home
![Екранна снимка 2024-09-22 223800](https://github.com/user-attachments/assets/01a8d9ce-2894-4825-b4d2-b45c80a4c150)
-Catalog
![Екранна снимка 2024-09-22 223849](https://github.com/user-attachments/assets/b8a42620-af27-4563-92e3-653e211e2a7e)
![Екранна снимка 2024-09-22 223858](https://github.com/user-attachments/assets/599b716a-3e94-4310-bd70-4780ce6926b4)
-Details
![Екранна снимка 2024-09-22 224135](https://github.com/user-attachments/assets/4e6499e6-ea5f-4314-9f54-2401c347284a)
![Екранна снимка 2024-09-22 224150](https://github.com/user-attachments/assets/f969fafb-488c-484f-887e-779c51c83d52)
-Profile
![Екранна снимка 2024-09-22 223920](https://github.com/user-attachments/assets/d6ed76c0-78e2-480f-b3a8-7e95cfa84173)




