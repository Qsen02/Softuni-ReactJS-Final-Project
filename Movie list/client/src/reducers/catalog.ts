type actionType={
    type:string,
    payload:[
        {
            _id: string,
            title: string,
            genre: string,
            image: string
        }
    ] | []
}

export function moviesReducer(state:[], action:actionType) {
    switch (action.type) {
        case "getAll":
            return action.payload.slice();
        case "search":
            const games = [];
            for (let i = 0; i < 3; i++) {
                if (action.payload[i] == undefined) {
                    break;
                }
                games.push(action.payload[i]);
            }
            return games;
        case "getNext":
            return action.payload.slice();
        default:
            return state;
    }
}