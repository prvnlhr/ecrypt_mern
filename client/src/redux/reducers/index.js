import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cardsReducer from "./cardsReducer";
import loginIdsReducer from "./loginIdsReducer";
import favoritesReducer from "./favoritesReducer";
import docsReducer from "./docsReducer";
import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";
import tokenReducer from "./tokenReducer";
import notificationReducer from "./notificationReducer";
import searchReducer from "./searchReducer";
import activityReducer from "./activityReducer";
import processReducer from "./processReducer";
import authResponseReducer from "./authResponseReducer";
import themeReducer from "./themeReducer";


import crudReducer from "./crudReducer";
export default combineReducers({
  cards: cardsReducer,
  user: userReducer,
  logins: loginIdsReducer,
  favorites: favoritesReducer,
  docs: docsReducer,
  loading: loadingReducer,
  auth: authReducer,
  token: tokenReducer,
  notification: notificationReducer,
  searchResults: searchReducer,
  activities: activityReducer,
  crud: crudReducer,
  process: processReducer,
  authResponseHandler: authResponseReducer,
  theme:themeReducer,
});
