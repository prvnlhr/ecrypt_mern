import axios from "axios";
// import store from "../store/store"
// import { store } from "../store/store";
// let url = process.env.REACT_APP_BASE_URL;
// console.log(process.env.REACT_APP_BASE_URL);


// for development server
const API = axios.create({
  baseURL: "http://localhost:9000"
});


// > LOGINIDS API_______________________________________
export const fetchUserLoginIds = (user_id) =>
  API.get("/user/loginIds/getLoginIds", {
    params: {
      user_id: user_id,
    },
  });

export const addNewLoginIdA = (newLoginData, user_id) =>
  API.post("/user/loginIds/addLoginId", {
    data: newLoginData,
    user_id: user_id,
  });

export const editLoginId = (loginId_id, loginIdData) =>
  API.patch(`/user/loginIds/editLoginId/${loginId_id}`, loginIdData);

export const deleteLoginId = (loginCardId, user_id) =>
  API.delete(`/user/loginIds/deleteLoginId/${loginCardId}`, {
    data: { user_id: user_id },
  });


// > CARDS API_______________________________________
export const fetchUserCards = (user_id) =>
  API.get("/user/cards/getCards", {
    params: {
      user_id: user_id,
    },
  });
//add card____
export const addNewCard = (newCardData, user_id) =>
  API.post("/user/cards/addCard", {
    data: newCardData,
    user_id: user_id,
  });
//edit card___
export const editCard = (card_id, cardData) =>
  API.patch(`/user/cards/editCard/${card_id}`, cardData);

export const deleteCard = (card_id, user_id) =>
  API.delete(`/user/cards/deleteCard/${card_id}`, {
    data: {
      user_id: user_id,
    },
  });