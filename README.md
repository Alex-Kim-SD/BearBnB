# API Endpoints

The following are the API endpoints defined in this file:

## Token

This endpoint returns a CSRF token for the client to use in subsequent requests.

1. `GET /token`: This endpoint returns a JSON object with a CSRF token. This token is used to prevent cross-site request forgery attacks.

## Restore CSRF Token

This endpoint returns a CSRF token for the client to use in subsequent requests. It also sets a cookie on the response with the name of XSRF-TOKEN to the value of the `req.csrfToken()` method's return.

1. `GET /api/csrf/restore`: This endpoint returns a JSON object with a CSRF token and sets a cookie with the name of XSRF-TOKEN to the same value. This token is used to prevent cross-site request forgery attacks.

## CSRF

This route is for testing purposes.

1. `GET /csrf/token`: This endpoint returns a CSRF token for the client to use in subsequent requests. This token is used to prevent cross-site request forgery attacks.

## Users

Routes for user-related operations such as registration and account updates.

1. `POST /users`: This route is for user sign-up. It validates user input and checks if a user with the provided email or username already exists. If not, it creates a new user and sets a token cookie.
2. `POST /users/logout`: This route is for logging out the user. It clears the token cookie and sends a success message.
3. `POST /users/login`: This route is for logging in the user. It verifies the provided email or username and password, and if valid, sets a token cookie and returns the user's safe information.
4. `GET /users/current-user`: This route returns the current user's information. If the user is logged in, it returns their info; otherwise, it returns null.
5. `GET /users`: This route returns a list of all users with their basic information (id, email, username, first_name, and last_name).

## Spots

Routes related to spots, including listing, creating, updating, and deleting spots. Also includes routes for retrieving reviews and adding images for a specific spot.

1. `GET /spots`: This endpoint returns a list of spots that meet the specified query parameters. Query parameters include page, size, minLat, maxLat, minLng, maxLng, minPrice, and maxPrice.
2. `POST /spots`: This endpoint creates a new spot.
3. `GET /spots/my-spots`: This endpoint returns a list of spots owned by the current user.
4. `GET /spots/:id`: This endpoint returns details about the specified spot.
5. `POST /spots/:id`: This endpoint updates the specified spot.
6. `DELETE /spots/:id`: This endpoint deletes the specified spot.
7. `GET /spots/:spotId/reviews`: This endpoint returns a list of reviews for the specified spot.
8. `POST /spots/:spotId/reviews`: This endpoint creates a new review for the specified spot.
9. `DELETE /spots/:spotId/images/:imageId`: This endpoint deletes the specified image for the specified spot.

## Reviews

Routes for review-related operations such as retrieving all reviews for the logged-in user, updating, deleting, and adding images to a review.

1. `GET /reviews`: This endpoint retrieves all reviews for the current logged-in user.
2. `DELETE /reviews/:reviewId`: This route deletes a review with the specified review ID if the user is authorized to do so.
3. `PUT /reviews/:reviewId`: This route updates a review with the specified review ID if the user is authorized to do so. It validates the review body before updating the review.
4. `POST /reviews/:reviewId/images`: This route adds an image to a review with the specified review ID if the user is authorized to do so.
5. `DELETE /reviews/:reviewId/images/:imageId`: This route deletes a specified image from a review with the specified review ID if the user is authorized to do so.

## Bookings

Routes for booking-related operations (not specified in the provided code).

1. `GET /bookings`: Retrieves all bookings for the current logged-in user, including details about the booked spots.
2. `POST /bookings/spots/:spotId`: Creates a new booking for a specific spot, checking for conflicts with existing bookings and preventing users from booking their own spots.
3. `PUT /bookings/:bookingId`: Updates an existing booking, ensuring the user has the necessary permissions and that the update doesn't conflict with other bookings.
4. `DELETE /bookings/:booking
