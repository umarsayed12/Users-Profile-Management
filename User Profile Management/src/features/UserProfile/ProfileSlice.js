import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
    profiles:[{
        id: 1,
        name: '',
        description: '',
        photo: null,
        address: {
            street: '',
            city: '',
            state: '',
            coordinates: { lat: 37.7749, lng: -122.4194 }
        }

    }],
    selectedProfile:null
}

const profileSlice = createSlice({
    name:'profiles',
    initialState,
    reducers: {
        addProfile: (state,action) => {
            state.profiles.push({...action.payload, id:nanoid()})
        },
        deleteProfile: (state,action) => {
            state.profiles = state.profiles.filter(profile => (profile.id !== action.payload));
        },
        updateProfile: (state,action) => {
            state.profiles = state.profiles.map(profile => ((profile.id === action.payload.id) ? action.payload : profile));
        },
        setSelectedProfile: (state,action) => {
            state.selectedProfile = action.payload;
        }
    }
});

export const {addProfile,deleteProfile,updateProfile,setSelectedProfile} = profileSlice.actions

export default profileSlice.reducer