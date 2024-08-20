export default function CartContent({
    id, title, price, image
}) {
    return (
        <div>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>Price: {price}$</p>
            <button>Remove</button>
        </div>
    )
}