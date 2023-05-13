import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';

const CreateSpotForm = () => {
    const history = useHistory();
    const store = useStore();
    const { getState } = store;

    const formIsValid = () => {
        if (!formState.country?.trim()) {
            console.log('Invalid entry for country:', formState.country);
            return false;
        }
        if (!formState.address?.trim()) {
            console.log('Invalid entry for address:', formState.address);
            return false;
        }
        if (!formState.city?.trim()) {
            console.log('Invalid entry for city:', formState.city);
            return false;
        }
        if (!formState.state?.trim()) {
            console.log('Invalid entry for state:', formState.state);
            return false;
        }
        if (!formState.description?.trim()) {
            console.log('Invalid entry for description:', formState.description);
            return false;
        }
        if (!formState.name?.trim()) {
            console.log('Invalid entry for name:', formState.name);
            return false;
        }
        if (!formState.price?.toString().trim()) {
            console.log('Invalid entry for price:', formState.price);
            return false;
        }
        if (!formState.preview_image_url?.trim()) {
            console.log('Invalid entry for preview_image_url:', formState.preview_image_url);
            return false;
        }
        if (!formState.longitude?.trim()) {
            console.log('Invalid entry for longitude:', formState.longitude);
            return false;
        }
        if (!formState.latitude?.trim()) {
            console.log('Invalid entry for latitude:', formState.latitude);
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
        image_urls: ['', '', '', '']
    });

    const handleInputChange = (event) => { // firing on all field changes
        console.log('\n','CREATE SPOT FORM | event.target', event.target,'\n')
        const { name, value } = event.target;

        if (name.startsWith('image_url_')) {
            const index = parseInt(name.split('_')[2], 10);

        console.log('\n','CREATE SPOT FORM | Imague_Url_index', index,'\n')
            const newImageUrls = [...formState.image_urls];
            newImageUrls[index] = value;
            setFormState({ ...formState, image_urls: newImageUrls });
        } else {
            setFormState({ ...formState, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ownerId = getState().session.user.id;
        // console.log('\n','OWNERID', ownerId,'\n') // working

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

        console.log('\n','CREATE SPOT FORM | newSpot', newSpot,'\n')
        console.log('\n','CREATE SPOT FORM | isValid?', formIsValid(),'\n')
        if(formIsValid()){
                console.log('\n','CREATE SPOT FORM | Form is Valid', newSpot,'\n')
                dispatch(createSpot(newSpot))
                .then((newSpot) => {
                    // Navigate to new spot's detail page
                    history.push(`/spots/${newSpot.id}`);
                });
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
                    <label htmlFor="image_url_0">Image URL</label>
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
