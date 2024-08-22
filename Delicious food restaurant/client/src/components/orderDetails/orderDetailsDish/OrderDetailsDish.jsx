import { errorHandler } from "../../../utils/imageErrorHandler";

export default function OrderDetailsDish({
    image, title, price
}) {
    return (
        <div>
            <img src={image} alt={title} onError={errorHandler} />
            <h3>{title}</h3>
            <p>Price: {price}$</p>
        </div>
    )
}