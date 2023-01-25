import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"
import { addActivityData } from "../activity/activitiesSlice"
import { addToFavCardsData, removeFromFavCardsData } from "../favorites/favoritesSlice";
import { addRecentlyAddedData } from "../recentlyAdded/recentlyAddedSlice"
const initialState = {
    cardsData: [],
}

export const fecthCardsData = createAsyncThunk("cards/fetch", async ({ user_id }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const res = await api.fetchUserCards(user_id);
        const { licenseCardsArray, bankCardsArray, identityCardsArray } = res.data;
        const CardsData = bankCardsArray.concat(identityCardsArray, licenseCardsArray);
        let SortedData = CardsData.sort(
            (c1, c2) => (c1.time < c2.time) ? 1 : (c1.time > c2.time) ? -1 : 0);
        return fulfillWithValue(SortedData);
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const addNewCardData = createAsyncThunk("cards/add", async ({ data, user_id, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();

        const res = await api.addNewCard(data, user_id, state.auth.token)
        dispatch(addActivityData({
            activityData: activityData,
            userId: user_id
        }))
        dispatch(addRecentlyAddedData({
            recentlyAddedData: data,
            userId: user_id
        }));
        return fulfillWithValue(res.data);

    } catch (error) {
        console.Console.log(error);
        return rejectWithValue(error);
    }
});

export const editCardData = createAsyncThunk("cards/edit", async ({ updatedData, card_id, activityData, userId }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        console.table('cardSlice', updatedData, card_id);
        // console.log(updatedData, card_id)
        const state = getState();

        const res = await api.editCard(card_id, updatedData, state.auth.token);
        // console.log(activityData, userId)
        dispatch(addActivityData({
            activityData: activityData,
            userId: userId
        }))
        return fulfillWithValue(updatedData);
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const deleteCardData = createAsyncThunk("cards/delete", async ({ cardData, user_id, card_id, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const state = getState();

        // console.table(user_id, card_id, cardData);
        const res = await api.deleteCard(card_id, user_id, cardData, state.auth.token);
        dispatch(addActivityData({
            activityData: activityData,
            userId: user_id
        }))

        // console.log(res);
        const { data } = res;
        // console.log(data);
        return fulfillWithValue(cardData);
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }

});


export const toggleIsFav = createAsyncThunk("cards/toggleFav", async ({ card_id, isFav, category }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();

        const res = await api.cardFavouriteToggle(card_id, isFav, category, state.auth.token)
        const currToggleCardInDb = res.data.filter((item) => item._id === card_id);
        // console.log(currToggleCardInDb[0].isFavourite)
        if (currToggleCardInDb[0].isFavourite === false) {
            // console.log('false')
            dispatch(removeFromFavCardsData({
                card_id
            }))
        } else {
            // console.log('true')
            dispatch(addToFavCardsData({
                card: currToggleCardInDb[0]
            }))
        }
        return fulfillWithValue({ favValue: isFav, id: card_id });
    } catch (error) {
        throw rejectWithValue(error);
    }
});
//* Slice
const cardsSlice = createSlice({

    name: 'cards',
    initialState: initialState,
    // reducers: {
    //     addCard(state, action) {
    //         console.log(action.payload, state)
    //         state.cardsData.push(action.payload)
    //     },

    // },

    extraReducers: (builder) => {
        builder
            .addCase(fecthCardsData.fulfilled, (state, action) => {
                // console.log(action.payload)
                return {
                    ...state,
                    cardsData: action.payload
                };
            })
            .addCase(addNewCardData.fulfilled, (state, action) => {
                return {
                    ...state,
                    cardsData: [action.payload, ...state.cardsData]
                };
            })
            .addCase(editCardData.fulfilled, (state, action) => {
                const newArray = state.cardsData.map((card) => {
                    if (card._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return card;
                    }
                });
                console.log(newArray);
                return {
                    ...state,
                    cardsData: newArray,
                };
            })
            .addCase(deleteCardData.fulfilled, (state, action) => {
                return {
                    ...state,
                    cardsData: state.cardsData.filter(card => card._id != action.payload._id)
                };
            })
            .addCase(deleteCardData.rejected, (state, action) => {
                return {
                    ...state,
                    cardsData: state.cardsData,
                };
            }).
            addCase(toggleIsFav.fulfilled, (state, action) => {
                const favVal = action.payload.favValue;
                const id = action.payload.id;
                const old = state.cardsData;
                const newCardsArray = old.map((l) => {
                    if (l._id === id) {
                        return { ...l, isFavourite: favVal };
                    } else {
                        return l;
                    }
                });
                return {
                    ...state,
                    cardsData: newCardsArray,
                };
            })
    }

})


export const { addNewCard, deleteCard, editCard } = cardsSlice.actions;

export default cardsSlice.reducer;
