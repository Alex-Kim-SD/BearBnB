import React, { useState, useEffect } from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateSpot, fetchSpotDetailReturnSpot} from '../../store/spots';

const UpdateSpotForm = () => {
    const history = useHistory();
    const store = useStore();
    const { getState } = store;
    const { id } = useParams();
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

    useEffect(() => {
        dispatch(fetchSpotDetailReturnSpot(id)).then(spot => {
            console.log('UPDATESPOTFORM.JS | SPOT',spot)
            setFormState({
                country: spot.country,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                description: spot.description,
                name: spot.name,
                price: spot.price,
                latitude: spot.lat,
                longitude: spot.lng,
                preview_image_url: spot.preview_image_url,
                image_urls: spot.image_urls,
            });
        });
    }, [dispatch, id]);

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
        // if (!formState.preview_image_url?.trim()) {
        //     console.log('Invalid entry for preview_image_url:', formState.preview_image_url);
        //     return false;
        // }
        if (!formState.longitude?.toString().trim()) {
            console.log('Invalid entry for longitude:', formState.longitude);
            return false;
        }
        if (!formState.latitude?.toString().trim()) {
            console.log('Invalid entry for latitude:', formState.latitude);
            return false;
        }
        return true;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const ownerId = getState().session.user.id;

        const updatedSpot = {
            ...formState,
            owner_id: ownerId,
        };

        if(formIsValid()){
            dispatch(updateSpot(id, updatedSpot))
            .then(() => {
                // Navigate to updated spot's detail page
                history.push(`/spots/${id}`);
            });
        }
        else{
            // Handle invalid form
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Update Your Spot</h2>
        <label>Country
        <input type="text" value={formState.country} onChange={(e) => setFormState({...formState, country: e.target.value})} />
        </label>
        <label>Address
        <input type="text" value={formState.address} onChange={(e) => setFormState({...formState, address: e.target.value})} />
        </label>
        <label>City
        <input type="text" value={formState.city} onChange={(e) => setFormState({...formState, city: e.target.value})} />
        </label>
        <label>State
        <input type="text" value={formState.state} onChange={(e) => setFormState({...formState, state: e.target.value})} />
        </label>
        <label>Description
        <input type="text" value={formState.description} onChange={(e) => setFormState({...formState, description: e.target.value})} />
        </label>
        <label>Name
        <input type="text" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} />
        </label>
        <label>Price
        <input type="text" value={formState.price} onChange={(e) => setFormState({...formState, price: e.target.value})} />
        </label>
        <label>Latitude
        <input type="text" value={formState.latitude} onChange={(e) => setFormState({...formState, latitude: e.target.value})} />
        </label>
        <label>Longitude
        <input type="text" value={formState.longitude} onChange={(e) => setFormState({...formState, longitude: e.target.value})} />
        </label>
        {/* PreviewIMAGE and Imageu_URLS Optional for MVP */}
        {/* <label>Preview Image URL */}
        {/* <input type="text" value={formState.preview_image_url} onChange={(e) => setFormState({...formState, preview_image_url: e.target.value})} />
        </label>
        {formState.image_urls.map((imageUrl, index) => ( */}
        {/* <label key={index}>Image URL {index + 1} */}
        {/* <input type="text" value={imageUrl} onChange={(e) => { */}
        {/* let newImageUrls = [...formState.image_urls]; */}
        {/* newImageUrls[index] = e.target.value; */}
        {/* setFormState({...formState, image_urls: newImageUrls}); */}
        {/* }} /> */}
        {/* </label> */}
        {/* ))} */}
        <div className="form-submit">
        <button type="submit" disabled={!formIsValid()}>Update Spot</button>
        </div>
        </form>
        );
    }
export default UpdateSpotForm;
