import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import { useContext } from 'react'
import { CoffeContext } from '../../contexts/CoffeContext'
import { products } from '../../mocks/products-mock'
import { Products } from './components/Products'
import './styles.scss'

export const Home = () => {
  /* const { description, price, productImage, typeOfProduct, productName } = useContext(CoffeContext) */
  return (
    <>
      <div className='main-wrapper'>
        <div className='text'>
          <h1>Encontre o café perfeito para qualquer hora do dia</h1>
          <p>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</p>
          <div className='icons'>
            <span>
              <ShoppingCart size={16} weight='fill' className='shopping-cart' />
              Compra simples e segura
            </span>
            <span>
              <Package size={16} weight='fill' className='package' />
              Embalagem mantém o café intacto
            </span>
            <span>
              <Timer size={16} weight='fill' className='timer' />
              Entrega rápida e rastreada
            </span>
            <span>
              <Coffee size={16} weight='fill' className='coffe' />
              O café chega fresquinho até você
            </span>
          </div>
        </div>
        <div className='img'>
          <img src="src\assets\Imagem.svg" alt="" />
        </div>
      </div>

      <div className="products-container">
        <h2>Nossos Cafés</h2>
        <div className="products-Wrapper">
          {products.map((product) => {
            return (
              <Products
                key={product.productName}
                productImage={product.productImage}
                typeOfProduct1={product.typeOfProduct1}
                productName={product.productName}
                description={product.description}
                price={product.price} />
            )
          })}
        </div>
      </div>
    </>
  )
}
