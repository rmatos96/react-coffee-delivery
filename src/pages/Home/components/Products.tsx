import { Minus, ShoppingCart, Plus } from "phosphor-react"
import { useContext, useState } from "react"
import { CoffeContext } from "../../../contexts/CoffeContext"
import { formatMoney } from "../../../util/formatMoney"
import "./products.scss"

export interface ProductsProps {
    productImage: string,
    typeOfProduct1?: string,
    typeOfProduct2?: string,
    productName: string,
    description?: string,
    price: number,
}


export function Products(props: ProductsProps) {
    const [quantity, setQuantity] = useState(1)

    const { cartItens, addCoffeToCart } = useContext(CoffeContext)

    const priceFormatted = formatMoney(props.price)

    function handleIncrease() {
        setQuantity(state => state + 1)
    }

    function handleDecrease() {
        if (quantity > 1) {
            setQuantity(state => state - 1)
        } 
        return quantity
    }

    function handleAddToCart() {
        const addToCart = {
            ...props,
            quantity
        }
        addCoffeToCart(addToCart)
    }

    return (
        <div className="product-wrapper">
            <img src={props.productImage} alt="" />
            <span className="tag">{props.typeOfProduct1}</span>
            <h1>{props.productName}</h1>
            <p>{props.description}</p>
            <div className="price-checkout">
                <span>
                    <span className="rs-price">R$</span>
                    <span className="price-coffe">{priceFormatted}</span>
                </span>
                <div className="icon-button-wrapper">
                    <Minus className="icon-increase-decrease" weight="bold" size={14} onClick={handleDecrease} />
                    <input type="number" value={quantity} readOnly />
                    <Plus className="icon-increase-decrease" weight="bold" size={14} onClick={handleIncrease} />
                </div>
                <button onClick={handleAddToCart}>
                    <ShoppingCart size={22} weight='fill' />
                </button>
            </div>
        </div>
    )
}
