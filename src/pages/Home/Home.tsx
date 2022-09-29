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
          <img className='img' src="https://s3-alpha-sig.figma.com/img/731e/f48d/acb13d1b7c718c6f523d5dc02407a226?Expires=1665360000&Signature=VgxMNNlu73ffV3I5RsRI-5l8AaOUvsHdiP1Nlpyequwo9RipPZ9rlxuJxunrkRZEDsm-kqmmP1WTdsoaCe9-YDB2qLssOFkoljLEnEWB09-Th8ZOufmGRRpOoKdEnbsvG374wv-klXszRKN0WrIa4pq-NdiOOfzA8h14hNjTtQKicee3hdmkm8RgZ8ImadypRN7PEkPjRx8-10V4NAEZPjcMxtexZPznBeDRyDy5IFg07Jm5SHypL-vesYhfHLXB7qOqPSTz80mEDiOTkz7m4yW9jcbrMdCFGOXa68qYB3CP8gHXSemLwgxmhHOpKygX9URZ48OdMxWqXq8rrKeg5g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" />
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
