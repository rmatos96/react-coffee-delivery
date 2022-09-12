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
        <div >
          <img className='img' src="https://s3-alpha-sig.figma.com/img/731e/f48d/acb13d1b7c718c6f523d5dc02407a226?Expires=1664150400&Signature=hUzXYhJxnvS5a6X-7Fjkk0PuSn8GhK4ntrN0upIq2UWAfCvZAfUjvZWJvB9qP7c3RL0NvX8V1N1eE69uI6ExM66PiAGjEEODbt6Lcl8SYKEIaOEdg02652gdjY8kDWhn0Lw2A1~ql8uteWInNAkSyUdZ~n~MYr2I80mgFimJA6HEm7qcLb3nd8ed1BnCrEDQnv6kh~kmMyAmHwyqg5mpVkyYXWXzFHCdIMMIGVKrs5qgSn68P1EsV~KEGmSic5ju47eE0z9cQl7VDZN9q--JfqDZVIwZimgwOY8Wg6jD2zVum6iK-KgnR1LP~3SC9SG2he7bBhC~SRBrrwkeYiNq9A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" />
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
