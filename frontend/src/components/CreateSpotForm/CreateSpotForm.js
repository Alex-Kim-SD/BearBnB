import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';

const CreateSpotForm = () => {
    const history = useHistory();
    const store = useStore();
    const { getState } = store;
    const [errorMessages, setErrorMessages] = useState({});

    const formIsValid = () => {
        const errors = {};

        if (!formState.country?.trim()) {
            errors.country = 'Country is required';
        }
        if (!formState.address?.trim()) {
            errors.address = 'Address is required';
        }
        if (!formState.city?.trim()) {
            errors.city = 'City is required';
        }
        if (!formState.state?.trim()) {
            errors.state = 'State is required';
        }
        if (!formState.description?.trim() || formState.description.length < 30) {
            errors.description = 'Description needs 30 or more characters';
        }
        if (!formState.name?.trim()) {
            errors.name = 'Name is required';
        }
        if (!formState.price?.toString().trim()) {
            errors.price = 'Price per night is required';
        }
        if (!formState.preview_image_url?.trim()) {
            errors.preview_image_url = 'Preview Image URL is required';
        }
        if (!formState.longitude?.trim()) {
            errors.longitude = 'Longitude is required';
        }
        if (!formState.latitude?.trim()) {
            errors.latitude = 'Latitude is required';
        }

        setErrorMessages(errors); // set the error messages
        return Object.keys(errors).length === 0; // if no errors, form is valid
    };

    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        country: '',
        address: '',
        city: '',
        state: '',
        description: '',
        name: '',
        price: '',
        latitude: "",
        longitude: "",
        preview_image_url: '',
        image_urls: ['', '', '', '']
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith('image_url_')) { // flattening image_urls so different seperated html fields will be placed in array
            const index = parseInt(name.split('_')[2], 10);
            const newImageUrls = [...formState.image_urls];
            newImageUrls[index] = value;
            setFormState({ ...formState, image_urls: newImageUrls });
        } else {
            setFormState({ ...formState, [name]: value });
        }
        formIsValid(); // validate the form each time an input changes
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const ownerId = getState().session.user.id;

        const newSpot = {
            owner_id: ownerId,
            address: formState.address,
            city: formState.city,
            state: formState.state,
            country: formState.country,
            lat: formState.latitude,
            lng: formState.longitude,
            name: formState.name,
            description: formState.description,
            price: formState.price,
            preview_image: formState.preview_image_url,
            image_urls: formState.image_urls
        };

        if (formIsValid()) {
            dispatch(createSpot(newSpot))
                .then((newSpot) => {
                    history.push(`/spots/${newSpot.id}`);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Spot</h2>
            {Object.keys(errorMessages).length > 0 && <div className="form-errors">
                <h4>There were some errors with your submission</h4>
                <ul>
                    {Object.values(errorMessages).map((error) => <li key={error}>{error}</li>)}
                </ul>
            </div>}
            <div>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" name="country" value={formState.country} onChange={handleInputChange} placeholder="Country" />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" value={formState.address} onChange={handleInputChange} placeholder="Address" />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" value={formState.city} onChange={handleInputChange} placeholder="City" />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" value={formState.state} onChange={handleInputChange} placeholder="State" />
                </div>
                <div>
                    <label htmlFor="latitude">Latitude</label>
                    <input type="text" id="latitude" name="latitude" value={formState.latitude} onChange={handleInputChange} placeholder="Latitude" />

                    <label htmlFor="longitude">Longitude</label>
                    <input type="text" id="longitude" name="longitude" value={formState.longitude} onChange={handleInputChange} placeholder="Longitude" />
                </div>


            </div>
            <div>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" placeholder='Please write at least 30 characters' value={formState.description} onChange={handleInputChange} />
                </div>
            </div>
            <div>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
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
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formState.price}
                        onChange={handleInputChange}
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
                    <input
                        type="text"
                        id="preview_image_url"
                        name="preview_image_url"
                        value={formState.preview_image_url}
                        onChange={handleInputChange}
                        placeholder="Preview Image URL"
                    />
                </div>
                <div className="form-field-input">
                    <input
                        type="text"
                        id="image_url_0"
                        name="image_url_0"
                        value={formState.image_url_0}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    />
                </div>
                <div className="form-field-input">
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
                    <input
                        type="url"
                        id="image_url_3"
                        name="image_url_3"
                        value={formState.image_url_3}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    />
                </div>
            </div>

            <div className="form-submit">
                <button type="submit" disabled={Object.keys(errorMessages).length > 0}>Create Spot</button>
            </div>
        </form>
    );
};

export default CreateSpotForm
