# Delicious food restaurant
Web site for ordering food for home or office.
# Technologies
Front-end: React with JavaScript, Formik and react-router-dom

Back-end: Express with mongoDB database
# API Reference:
-Base URL: http://localhost:3000

-Users:

Register (POST): /users/register

Login (POST): /users/login

Logout (GET): /users/logout

Get user by id (GET): /users/{userdId}

-Dishes:

Get all dishes (GET): /dishes

Get dish by id (GET): /dishes/{dishId}

Pagination (GET): /dishes/page/{pageNumber}

Search (GET): /dishes/search/{query}

Create dish (POST): /dishes

Delete dish (DELETE): /dishes/{dishId}

Edit dish (PUT): /dishes/{dishId}

Like dish (POST): /dishes/{dishId}/like

Unlike dish (POST): /dishes/{dishId}/unlike

-Cart:

Find cart for current user (GET): /cart/find

Get cart by id (GET): /cart/{cartId}

Add dish to cart (PUT): /cart/{cartId}

Remove dish from cart (DELETE): /cart/remove/{dishId}/from/{cartId}

Make order (POST): /cart/order/{cartId}

Cancel order (POST): /cart/cancel/{cartId}

Get order by id (POST): /cart/order/{orderId}
# Features:
Authenticated users can see catalog and details and can search dishes through catalog. They can like dishes and see list of likes for current dish. Users can add dishes to cart and remove them and when they are ready they can cancel or make order. Details about user orders can be viewed in user profiles. Guests can see catalog and search through catalog and view details about dishes but they can't like dishes or order dishes. We have admin profiles too, they can create dishes and edit or delete them but they can't like or order dishes.
# How to start client and server:
Client: enter command  `npm run dev`  in terminal.

Server: enter command  `npm start`  in terminal.
# Screenshots:
Catalog:
![Екранна снимка 2024-08-28 095959](https://github.com/user-attachments/assets/1bae8e68-9dc8-4699-afde-cfb3a395b7a6)

Details about dish:
![Екранна снимка 2024-08-28 100026](https://github.com/user-attachments/assets/0329df0b-a038-41b8-bc4c-454048497653)

Cart:
![Екранна снимка 2024-08-28 100048](https://github.com/user-attachments/assets/e86abf37-996c-4c67-86a1-d7d46aac2467)

User profile:
![Екранна снимка 2024-08-28 100104](https://github.com/user-attachments/assets/d6be53ec-e08e-45fa-b9dc-6857d374feaf)
