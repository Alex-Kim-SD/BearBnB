import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spotForm'
import { csrfFetch } from '../../store/csrf';

const CreateSpotForm = () => {

    const formIsValid = () => {
        // Perform form validation logic here
        // Return true if the form is valid, otherwise return false
        // You can validate each field individually or validate the form as a whole

        // Example validation logic for required fields
        if (
            formState.country.trim() === '' ||
            formState.streetAddress.trim() === '' ||
            formState.city.trim() === '' ||
            formState.state.trim() === '' ||
            formState.description.trim() === '' ||
            formState.name.trim() === '' ||
            formState.price.trim() === '' ||
            formState.previewImage.trim() === ''
        ) {
            return false;
        }
        return true;
    };

    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        country: '',
        streetAddress: '',
        city: '',
        state: '',
        description: '',
        name: '',
        price: '',
        previewImage: '',
        imageUrls: ['', '', '', '', '']
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new spot object with the form data
        const newSpot = {
          country: formState.country,
          streetAddress: formState.streetAddress,
          city: formState.city,
          state: formState.state,
          description: formState.description,
          name: formState.name,
          price: formState.price,
          previewImage: formState.previewImage,
          imageUrls: formState.imageUrls,
        };

        try {
          // Send a POST request to your backend API to create a new spot
          const response = await csrfFetch("/api/spots", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSpot),
          });
          await dispatch(createSpot(newSpot));
          if (response.ok) {
            // Spot created successfully
            // You can handle the success scenario here (e.g., display a success message, redirect to spot detail page, etc.)
          } else {
            // Spot creation failed
            // You can handle the error scenario here (e.g., display an error message, log the error, etc.)
          }
        } catch (error) {
          // Error occurred during spot creation
          // You can handle the error scenario here (e.g., display an error message, log the error, etc.)
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Spot</h2>
            <div>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" name="country" value={formState.country} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="streetAddress">Street Address</label>
                    <input type="text" id="streetAddress" name="streetAddress" value={formState.streetAddress} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" value={formState.city} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" value={formState.state} onChange={handleInputChange} />
                </div>
            </div>
            <div>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={formState.description} onChange={handleInputChange} />
                </div>
            </div>
            <div>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <div>
                    <label htmlFor="name">Name of your spot</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Name of your spot"
                    />
                </div>
            </div>

            <div className="form-field">
                <div className="form-field-heading">
                    <h2>Set a base price for your spot</h2>
                    <span>Competitive pricing can help your listing stand out and rank higher in search results.</span>
                </div>
                <div className="form-field-input">
                    <label htmlFor="price">Price per night (USD)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formState.price}
                        onChange={handleInputChange}
                        required
                        placeholder="Price per night (USD)"
                    />
                </div>
            </div>

            <div className="form-field">
                <div className="form-field-heading">
                    <h2>Liven up your spot with photos</h2>
                    <span>Submit a link to at least one photo to publish your spot.</span>
                </div>
                <div className="form-field-input">
                    <label htmlFor="preview_image_url">Preview Image URL *</label>
                    <input
                        type="url"
                        id="preview_image_url"
                        name="preview_image_url"
                        value={formState.preview_image_url}
                        onChange={handleInputChange}
                        required
                        placeholder="Preview Image URL"
                    />
                </div>
                <div className="form-field-input">
                    <label htmlFor="image_url_1">Image URL</label>
                    <input
                        type="url"
                        id="image_url_1"
                        name="image_url_1"
                        value={formState.image_url_1}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    />
                </div>
                <div className="form-field-input">
                    <label htmlFor="image_url_2">Image URL</label>
                    <input
                        type="url"
                        id="image_url_2"
                        name="image_url_2"
                        value={formState.image_url_2}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    />
                </div>
                <div className="form-field-input">
                    <label htmlFor="image_url_3">Image URL</label>
                    <input
                        type="url"
                        id="image_url_3"
                        name="image_url_3"
                        value={formState.image_url_3}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    />
                </div>
                <div className="form-field-input">
                    <label htmlFor="image_url_4">Image URL</label>
                    <input
                        type="url"
                        id="image_url_4"
                        name="image_url_4"
                        value={formState.image_url_4}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    />
                </div>
            </div>

            <div className="form-submit">
                <button type="submit" disabled={!formIsValid}>
                    Create Spot
                </button>
            </div>
        </form>
    );
};

export default CreateSpotForm
