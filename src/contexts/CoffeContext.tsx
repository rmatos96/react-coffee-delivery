import produce from "immer";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductsProps } from "../pages/Home/components/Products";

export interface CartItem extends ProductsProps {
    quantity: number
}

interface CartContexType {
    cartItens: CartItem[],
    cartQuantity: number,
    cartItensTotal: number,
    addCoffeToCart: (coffe: CartItem) => void,
    changeCartItemQuantity: (cartName: string, type: "increase" | "decrease") => void,
    removeCartItem: (cartName: string) => void,
    cleanCart: () => void
}

interface CoffeContextProviderProps {
    children: ReactNode
}

const COFFE_ITENS_STORAGE_KEY = "coffeDelivery:cartItens"

export const CoffeContext = createContext({} as CartContexType)

export function CoffeContextProvider({ children }: CoffeContextProviderProps) {
    const [cartItens, setCartItens] = useState<CartItem[]>(() => {
        const storedCartItens = localStorage.getItem(COFFE_ITENS_STORAGE_KEY);
        if (storedCartItens) {
            return JSON.parse(storedCartItens)
        }
        return []
    })

    const cartQuantity = cartItens.length

    const cartItensTotal = cartItens.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity
    }, 0)

    function addCoffeToCart(props: CartItem) {
        const coffeAlreadyExistsInCart = cartItens.findIndex((item) => item.productName === props.productName)

        const newCart = produce(cartItens, (draft) => {
            if (coffeAlreadyExistsInCart < 0) {
                draft.push(props)
            } else[
                draft[coffeAlreadyExistsInCart].quantity += props.quantity
            ]
        })

        setCartItens(newCart)
    }

    function changeCartItemQuantity(cartProductName: string, type: "increase" | "decrease") {
        const newCart = produce(cartItens, (draft) => {
            const coffeAlreadyExistsInCart = cartItens.findIndex((cartItem) => cartItem.productName === cartProductName)

            if (coffeAlreadyExistsInCart >= 0) {
                const item = draft[coffeAlreadyExistsInCart]
                draft[coffeAlreadyExistsInCart].quantity = type === "increase" ? item.quantity + 1 : item.quantity - 1
            }
        })

        setCartItens(newCart)
    }

    function removeCartItem(cartName: string) {
        const newCart = produce(cartItens, (draft) => {
            const coffeAlreadyExistsInCart = cartItens.findIndex((cartItem) => cartItem.productName === cartName)
            if (coffeAlreadyExistsInCart >= 0) {
                draft.splice(coffeAlreadyExistsInCart, 1)
            }
        })

        setCartItens(newCart)
    }

    function cleanCart () {
        setCartItens([])
    }

    useEffect(() => {
        localStorage.setItem(COFFE_ITENS_STORAGE_KEY, JSON.stringify(cartItens))
    }, [cartItens])

    return (
        <CoffeContext.Provider value={{ cartItens, cartQuantity, addCoffeToCart, changeCartItemQuantity, removeCartItem, cartItensTotal, cleanCart }}>
            {children}
        </CoffeContext.Provider>
    )

}