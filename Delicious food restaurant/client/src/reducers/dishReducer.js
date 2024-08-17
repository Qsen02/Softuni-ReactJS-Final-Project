export function reducer(state, action) {
    switch (action.type) {
        case "getAll":
            return action.payload.slice();
        case "setValues":
            return action.payload.slice();
        default:
            return state;
    }
}