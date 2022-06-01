import ReactDOM from "react-dom";
import App from "./app";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";

const initialState = {
    filter: {
        current_filter: {
            searchParams: "",
            category: "0",
            resetCategory: false,
            pricefrom: 0,
            priceto: 200,
            rating: 0,
            sort: "NEWEST",
        },
    },
};

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(immutableState.default(), thunkMiddleware)
    )
);

ReactDOM.render( <
    Provider store = { store } >
    <
    App / >
    <
    /Provider>,
    document.querySelector("main")
);