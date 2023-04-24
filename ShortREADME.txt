The API endpoints defined in this file are:
/users: Routes for user-related operations such as registration and account updates.
/spots: Routes related to spots, including listing, creating, updating, and deleting spots. Also includes routes for retrieving reviews and adding images for a specific spot.
/reviews: Routes for review-related operations such as retrieving all reviews for the logged-in user, updating, deleting, and adding images to a review.
/bookings: Routes for booking-related operations (not specified in the provided code).

The restoreUser middleware is connected to the API router to set req.user to the user in the database if the current user session is valid, or to null if it is not valid.

SPOTS
1. GET /spots: This endpoint returns a list of spots that meet the specified query parameters. Query parameters include page, size, minLat, maxLat, minLng, maxLng, minPrice, and maxPrice.
2. POST /spots: This endpoint creates a new spot.
3. GET /spots/my-spots: This endpoint returns a list of spots owned by the current user.
4. GET /spots/:id: This endpoint returns details about the specified spot.
5. POST /spots/:id: This endpoint updates the specified spot.
6. DELETE /spots/:id: This endpoint deletes the specified spot.
7. GET /spots/:spotId/reviews: This endpoint returns a list of reviews for the specified spot.
8. POST /spots/:spotId/reviews: This endpoint creates a new review for the specified spot.
9. DELETE /spots/:spotId/images/:imageId: This endpoint deletes the specified image for the specified spot.

USERS
1. POST /: This route is for user sign-up. It validates user input and checks if a user with the provided email or username already exists. If not, it creates a new user and sets a token cookie.
2. POST /logout: This route is for logging out the user. It clears the token cookie and sends a success message.
3. POST /login: This route is for logging in the user. It verifies the provided email or username and password, and if valid, sets a token cookie and returns the user's safe information.
4. GET /current-user: This route returns the current user's information. If the user is logged in, it returns their info; otherwise, it returns null.
5. GET /: This route returns a list of all users with their basic information (id, email, username, first_name, and last_name).

REVIEWS
1. GET /: This endpoint retrieves all reviews for the current logged-in user.
2. DELETE /:reviewId: This route deletes a review with the specified review ID if the user is authorized to do so.
3. PUT /:reviewId: This route updates a review with the specified review ID if the user is authorized to do so. It validates the review body before updating the review.
4. POST /:reviewId/images: This route adds an image to a review with the specified review ID if the user is authorized to do so.
5. DELETE /:reviewId/images/:imageId: This route deletes a specified image from a review with the specified review ID if the user is authorized to do so.

BOOKINGS
1. GET /bookings: Retrieves all bookings for the current logged-in user, including details about the booked spots.
2. POST /bookings/spots/:spotId: Creates a new booking for a specific spot, checking for conflicts with existing bookings and preventing users from booking their own spots.
3. PUT /bookings/:bookingId: Updates an existing booking, ensuring the user has the necessary permissions and that the update doesn't conflict with other bookings.
4. DELETE /bookings/:bookingId: Deletes an existing booking, ensuring the user has the necessary permissions and that the booking hasn't started yet.
