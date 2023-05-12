import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { createSpot } from '../../store/spots';

const CreateSpotForm = () => {
    const store = useStore();
    const { getState } = store;

    const formIsValid = () => {
        if (
            formState.country.trim() === '' ||
            formState.address.trim() === '' ||
            formState.city.trim() === '' ||
            formState.state.trim() === '' ||
            formState.description.trim() === '' ||
            formState.name.trim() === '' ||
            formState.price.trim() === '' ||
            formState.preview_image_url.trim() === '' ||
            formState.longitude.trim() === '' ||
            formState.latitude.trim() === ''
        ) {
            // console.log(
            // '\n Form entries:',
            // '\n Test',formState.country.trim(),
            // '\n Test',formState.address.trim(),
            // '\n Test',formState.city.trim(),
            // '\n Test',formState.state.trim(),
            // '\n Test',formState.description.trim(),
            // '\n Test',formState.name.trim(),
            // '\n Test',formState.price.trim(),
            // // '\n',formState.preview.trim(),
            // '\n Test',formState.longitude.trim(),
            // '\n Test',formState.latitude.trim()
            // )
            return false;
        }
        return true;
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
        image_urls: ['', '', '', '', '']
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ownerId = getState().session.user.id;
        // console.log('\n','OWNERID', ownerId,'\n') // working
        // new spot object with the form data, including the owner ID
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
        // console.log('\n','newSpot', newSpot,'\n')
        // console.log('\n','isValid?', formIsValid(),'\n')
        if(formIsValid()){
        // console.log('\n','Form is Valid', newSpot,'\n')
            dispatch(createSpot(newSpot));
        }
        else{
            // Handle invalid form
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
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" value={formState.address} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" value={formState.city} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" value={formState.state} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="latitude">Latitude</label>
                    <input type="text" id="latitude" name="latitude" value={formState.latitude} onChange={handleInputChange} />

                    <label htmlFor="longitude">Longitude</label>
                    <input type="text" id="longitude" name="longitude" value={formState.longitude} onChange={handleInputChange} />
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
                        type="text"
                        id="preview_image_url"
                        name="preview_image_url"
                        value={formState.preview_image_url}
                        onChange={handleInputChange}
                        placeholder="Preview Image URL"
                    />
                </div>
                <div className="form-field-input">
                    <label htmlFor="image_url_1">Image URL</label>
                    <input
                        type="text"
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
