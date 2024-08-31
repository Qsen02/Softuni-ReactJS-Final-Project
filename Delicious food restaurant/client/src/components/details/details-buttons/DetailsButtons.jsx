import { Link, useNavigate } from "react-router-dom";

import styles from "../Details.module.css"

import { useGetOneDish, useLike, useUnlike } from "../../../hooks/useDishes";
import { useAddToCart, useGetUserCart } from "../../../hooks/useCart";
import { useUserContext } from "../../../context/UserContext";

export default function DetailsButtons({
    isAdded,
    setIsAdded,
    setFailed,
    id,
    setDish,
    likes,
    likesCount
}) {
    const stringLikes = likes.map(el => el._id.toString());
    const likeDish = useLike();
    const unlikeDish = useUnlike();
    const findUserCart = useGetUserCart();
    const addDishToCart = useAddToCart();
    const navigate=useNavigate();
    const { user,clearUserHandler } = useUserContext();
    const { dish } = useGetOneDish({ likes: [] }, id);

    async function onLike() {
        try {
            const dish = await likeDish(id);
            setDish(dish);
        } catch (err) {
            if (err.message == "You don't have credentials, please login or register!") {
                clearUserHandler();
                return;
            }
            if (err.message == "Resource not found!") {
                navigate("/404");
                return;
            }
            setFailed(true);
            return;
        }
    }

    async function onUnlike() {
        try {
            const dish = await unlikeDish(id);
            setDish(dish);
        } catch (err) {
            if (err.message == "You don't have credentials, please login or register!") {
                clearUserHandler();
                return;
            }
            if (err.message == "Resource not found!") {
                navigate("/404");
                return;
            }
            setFailed(true);
            return;
        }
    }

    async function onAdd() {
        try {
            const cart = await findUserCart(user._id);
            const cartId = cart._id.toString();
            await addDishToCart(cartId, dish);
            setIsAdded(true);
        } catch (err) {
            if (err.message == "You don't have credentials, please login or register!") {
                clearUserHandler();
                return;
            }
            if (err.message == "Resource not found!") {
                navigate("/404");
                return;
            }
            setFailed(true);
            return;
        }
    }

    return (
        <>
            {user
                ? user.isAdmin
                    ? <div className={styles.buttons}>
                        <Link to={`/catalog/${id}/edit`}><button>Edit</button></Link >
                        <Link to={`/catalog/${id}/delete`}><button>Delete</button></Link>
                        <div className={styles.adminButtons}>
                            <i className="fa-solid fa-heart"></i>
                            <Link to={`/catalog/${id}/likes`}>{likesCount}</Link>
                        </div>
                    </div>
                    : <div className={styles.buttons}>
                        {isAdded
                            ? <button className={styles.added} disabled={true}>Added to cart!</button>
                            : <button onClick={onAdd}>Add to cart</button>
                        }
                        <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
                        {stringLikes.includes(user._id.toString())
                            ? <div className={styles.unlike}>
                                <i onClick={onUnlike} className="fa-solid fa-heart"></i>
                                <Link to={`/catalog/${id}/likes`}><p>{likesCount}</p></Link>
                            </div>
                            : <div className={styles.like}>
                                <i onClick={onLike} className="fa-regular fa-heart"></i>
                                <Link to={`/catalog/${id}/likes`}><p>{likesCount}</p></Link>
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