import { NavLink, Outlet } from 'react-router-dom'
import { MapPin, ShoppingCart, ShoppingCartSimple } from 'phosphor-react'
import "./styles.scss"
import { useContext } from 'react'
import { CoffeContext } from '../../contexts/CoffeContext'

export const Header = () => {
  const {cartQuantity} = useContext(CoffeContext)
  
  return (
    <div>
      <nav>
        <NavLink to={'/'}>
          <img src="https://uploaddeimagens.com.br/images/004/020/003/original/Logo.png?1663024311" alt="" />
        </NavLink>
        <div className="LocationAndCheckout">
          <div className="Location">
            <MapPin color="var(--purple)" weight="fill" size={22} />
            <span>São Paulo, SP</span>
          </div>
          <NavLink to={'/checkout'}>
            <button >
              {cartQuantity >= 1 && <span>{cartQuantity}</span>}
              <ShoppingCart weight="fill" size={30} />
            </button>
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
