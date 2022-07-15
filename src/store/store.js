import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import langReducer from "./slices/languageSlice";
import RepoReducer from "./slices/RepoSlice"
import UserRepoSlice from "./slices/UserRepoSlice";

import repoDetailReducer from "./slices/userRepoDetailSlice"
import userLangReducer from "./slices/userLangChoiceSlice";
import ContactReducer from "./slices/ContactSlice";
import repoLikeReducer from "./slices/repoLikeSlice"
import RepoCommentReducer from "./slices/RepoCommentSlice";

const store = configureStore({
  reducer: { login: loginReducer, lang: langReducer,repo:RepoReducer ,userRepo:UserRepoSlice,repoDetail:repoDetailReducer,userlangs:userLangReducer,contactDetail:ContactReducer,repolike:repoLikeReducer,repoComment:RepoCommentReducer}
});
//eee bhul gya
export default store;
