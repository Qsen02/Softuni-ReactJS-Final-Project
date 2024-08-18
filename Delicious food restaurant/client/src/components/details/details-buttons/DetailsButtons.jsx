import { Link } from "react-router-dom";

import styles from "../Details.module.css"

import { useLike, useUnlike } from "../../../hooks/useDishes";

export default function DetailsButtons({
    setFailed,
    id,
    curUser,
    setDish,
    likes,
    likesCount
}) {
    const stringLikes = likes.map(el => el.toString());
    const likeDish = useLike();
    const unlikeDish=useUnlike();

    async function onLike() {
        try {
            const dish = await likeDish(id);
            setDish(dish);
        } catch (err) {
            setFailed(true);
            return;
        }
    }

    async function onUnlike() {
        try {
            const dish = await unlikeDish(id);
            setDish(dish);
        } catch (err) {
            setFailed(true);
            return;
        }
    }

    return (
        <>
            {curUser
                ? curUser.isAdmin
                    ? <div className={styles.buttons}>
                        <Link to={`/catalog/${id}/edit`}><button>Edit</button></Link >
                        <Link to={`/catalog/${id}/delete`}><button>Delete</button></Link>
                        <div className={styles.adminButtons}>
                            <i className="fa-solid fa-heart"></i>
                            <p>{likesCount}</p>
                        </div>
                    </div>
                    : <div className={styles.buttons}>
                        <Link to="addToCart"><button>Add to cart</button></Link>
                        <Link to="/cart"><i class="fa-solid fa-cart-shopping"></i></Link>
                        {stringLikes.includes(curUser._id.toString())
                            ? <div className={styles.unlike}>
                                <i onClick={onUnlike} className="fa-solid fa-heart"></i>
                                <p>{likesCount}</p>
                            </div>
                            : <div className={styles.like}>
                                <i onClick={onLike} className="fa-regular fa-heart"></i>
                                <p>{likesCount}</p>
                            </div >
                        }
                    </div >
                : <div className={styles.guestButtons}>
                    <i className="fa-solid fa-heart"></i>
                    <p>{likesCount}</p>
                </div>
            }
        </>
    )
}