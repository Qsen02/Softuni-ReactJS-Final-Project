export function reducer(state, action) {
    switch (action.type) {
        case "getAll":
            return action.payload.slice();
        case "onSearch":
            const dishes = [];
            for (let i = 0; i < 6; i++) {
                if (action.payload[i] == undefined) {
                    break;
                }
                dishes.push(action.payload[i]);
            }
            return dishes;
        case "pagination":
            return action.payload.slice();
        default:
            return state;
    }
}