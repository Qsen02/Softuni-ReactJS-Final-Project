export function gamesReducer(state, action) {
    switch (action.type) {
        case "getAll":
            return action.payload.slice();
        case "search":
            return action.payload.slice();
        case "getNext":
            return action.payload.slice();
        default:
            return state;
    }
}