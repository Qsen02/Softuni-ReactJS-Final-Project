import { useParams } from "react-router-dom";

import DishLikesContent from "./dishLikesContent/DishLikesContent";

import { useGetOneDish } from "../../hooks/useDishes";

export default function DishLikes() {
    const {dishId}=useParams();
    const {dish}=useGetOneDish({likes:[]},dishId);

    return (
        <div>
            <div>
                {dish.likes.map(el=><DishLikesContent key={el._id} username={el.username}/>)}
            </div>
        </div>
    )
}