/* eslint-disable indent */

//REDUCERS
export { userReducer };

function userReducer(state = {}, action) {
    switch (action.type) {
        case "user/login":
            {
                const { user } = action.payload;
                console.log("in user action..", user);
                return {
                    ...state,
                    user: user,
                };
            }
        case "user/logout":
            {

                console.log("in user logout action..");
                return {
                    ...state,
                };
            }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state;
    }
}

//ACTIONS

//get latest messages
function userLogin(user) {
    return {
        type: "user/login",
        payload: { user: user }
    };
}

//get latest messages
function userLogout() {
    return async function newItemThunk(dispatch) {
        const data = await fetch("/api/user/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then((response) => response.json());
        console.log("user logout: ", data);
        dispatch({
            type: "user/logout",
            payload: {},
        });
    };
}

//get latest messages
function reset() {
    return {
        type: "user/reset",
        payload: {}
    };
}

//export actions
export { userLogin, userLogout, reset };