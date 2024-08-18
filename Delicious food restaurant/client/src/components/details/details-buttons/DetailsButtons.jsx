import { Link } from "react-router-dom";

export default function DetailsButtons({
    curUser,
    setDish,
    likes
    , likesCount
}) {
    const stringLikes = likes.map(el => el.toString());
    return (
        <>
            {curUser
                ? curUser.isAdmin
                    ? <div>
                        <Link to="edit"><button>Edit</button></Link >
                        <Link to="delete"><button>Delete</button></Link>
                        <div>
                            <i class="fa-solid fa-heart"></i>
                            <p>{likesCount}</p>
                        </div>
                    </div>
                    : <div>
                        <Link to="addToCart"><button>Add to cart</button></Link>
                        <Link to="/cart"><i class="fa-solid fa-cart-shopping"></i></Link>
                        {stringLikes.includes(curUser._id.toString())
                            ?
                            <div>
                                <Link to="unlike"><i class="fa-solid fa-heart"></i></Link>
                                <p>{likesCount}</p>
                            </div>
                            :
                            <div>
                                <Link to="like"><i class="fa-regular fa-heart"></i></Link>
                                <p>{likesCount}</p>
                            </div>
                        }
                    </div>
                : <div>
                    <i class="fa-solid fa-heart"></i>
                    <p>{likesCount}</p>
                </div>
            }
        </>
    )
}