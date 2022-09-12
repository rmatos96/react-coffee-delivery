import { Minus, Plus, Trash } from 'phosphor-react'
import { useContext } from 'react'
import { CartItem, CoffeContext } from '../../../../contexts/CoffeContext'
import { formatMoney } from '../../../../util/formatMoney'

import './styles.scss'

interface CoffeCartProps {
    coffe: CartItem
}

export const CoffeeSelected = ({ coffe }: CoffeCartProps) => {
    const { changeCartItemQuantity, removeCartItem  } = useContext(CoffeContext)

    const totalPrice = coffe.price * coffe.quantity
    const totalPriceFormate = formatMoney(totalPrice)

    function handleIncrease() {
        changeCartItemQuantity(coffe.productName, "increase")
    }

    function handleDecrease() {
        if (coffe.quantity > 1)
            changeCartItemQuantity(coffe.productName, "decrease")
    }

    function hadnleRemove() {
        removeCartItem(coffe.productName)
    }

    return (
        <div className='coffe-wrapper'>
            <img src={coffe.productImage} alt="" />
            <div className='name-actions'>
                <h1>{coffe.productName}</h1>
                <div className='actions'>
                    <div className="icon-button-wrapper">
                        <Minus className="icon-increase-decrease" weight="bold" size={14} onClick={handleDecrease} />
                        <input type="number" value={coffe.quantity} readOnly />
                        <Plus className="icon-increase-decrease" weight="bold" size={14} onClick={handleIncrease} />
                    </div>
                    <button className='remove-button' onClick={hadnleRemove}>
                        <Trash size={16} style={{ color: "var(--purple)" }} />
                        REMOVER
                    </button>
                </div>
            </div>
            <span>
                R$ {totalPriceFormate}
            </span>
        </div>
    )
}
