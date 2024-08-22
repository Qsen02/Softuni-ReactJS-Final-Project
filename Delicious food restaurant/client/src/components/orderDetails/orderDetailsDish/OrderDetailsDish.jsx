import { errorHandler } from "../../../utils/imageErrorHandler";

export default function OrderDetailsDish({
    image, title, price
}) {
    return (
        <div>
            <img src={image} alt={title} onError={errorHandler} />
            <p>{title}</p>
            <p>Price: {price}$</p>
        </div>
    )
}