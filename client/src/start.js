import ReactDOM from "react-dom";
import App from "./app";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";
// import { init } from "./socket.js";

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(immutableState.default(), thunkMiddleware)
    )
);

// init(store);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("main")
);
