import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from "phosphor-react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CoffeContext } from "../../contexts/CoffeContext";
import { formatMoney } from "../../util/formatMoney";
import { CoffeeSelected } from "./components/CoffeeSelected/CoffeeSelected";
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import "./styles.scss";
import { useForm } from "react-hook-form";
import { PaymentMethod } from "./components/PaymentMethods/PaymentMethod";

const DELIVERY_PRICE = 3.50

enum PaymentMethods {
  credit = "credit",
  debit = "debit",
  money = "money",
}

export const paymentMethods = {
  credit: {
    label: "Cartão de Crédito",
    icon: <CreditCard size={20} style={{ color: "var(--purple)" }} />
  },
  debit: {
    label: "Cartão de Débito",
    icon: <Bank size={20} style={{ color: "var(--purple)" }} />
  },
  money: {
    label: "Dinheiro",
    icon: <Money size={20} style={{ color: "var(--purple)" }} />
  },
}

const schema = zod.object({
  cep: zod.string().min(1).max(8),
  rua: zod.string().min(1).max(100),
  numero: zod.string().min(1).max(5),
  bairro: zod.string().min(1).max(100),
  cidade: zod.string().min(1).max(100),
  uf: zod.string().min(1).max(2),
  formaPagamento: zod.nativeEnum(PaymentMethods, {
    errorMap: () => {
      return { message: 'Informe o método de pagamento' }
    }
  })
});

export type OrderData = zod.infer<typeof schema>

export function Checkout() {
  const { cartItens, cartItensTotal, cartQuantity, cleanCart } = useContext(CoffeContext)

  const total = DELIVERY_PRICE + cartItensTotal

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  function handleConfirmOrder(data: any) {
    console.log(data);
    navigate("/success", {
      state: data
    })
    cleanCart()
  }

  const formattedDelivery = formatMoney(DELIVERY_PRICE)
  const formattedCartItensTotal = formatMoney(cartItensTotal)
  const formattedTotalInCart = formatMoney(total)

  return (
    <div className="checkoutWrapper">
      <div className="adressAndPayment">
        <h1>Complete seu pedido</h1>
        <div className="adressInfo">
          <div className="adressTitleAndSubtitle">
            <h2>
              <MapPinLine size={22} style={{ color: "var(--yellow-dark)" }} />{" "}
              Endereço de entrega
            </h2>
            <p>Informe o endereço onde deseja receber seu pedido</p>
          </div>
          <div className="adressInputsForm">
            <input id="cep" type="text" placeholder="CEP *" style={{ border: `1px solid ${errors.cep ? "var(--base-error)" : "var(--base-button"}` }} {...register('cep')} />
            <input id="rua" type="text" placeholder="Rua *" style={{ border: `1px solid ${errors.rua ? "var(--base-error)" : "var(--base-button"}` }} {...register('rua')} />
            <div className="numeroComplemento">
              <input id="numero" type="text" placeholder="Número *" style={{ border: `1px solid ${errors.numero ? "var(--base-error)" : "var(--base-button"}` }} {...register('numero')} />
              <input id="complemento" type="text" placeholder="Complemento" />
            </div>
            <div className="bairroCidadeComplemento">
              <input id="bairro" type="text" placeholder="Bairro *" style={{ border: `1px solid ${errors.bairro ? "var(--base-error)" : "var(--base-button"}` }} {...register('bairro')} />
              <input id="cidade" type="text" placeholder="Cidade *" style={{ border: `1px solid ${errors.cidade ? "var(--base-error)" : "var(--base-button"}` }} {...register('cidade')} />
              <input id="uf" type="text" placeholder="UF *" style={{ border: `1px solid ${errors.uf ? "var(--base-error)" : "var(--base-button"}` }} {...register('uf')} />
              {errors.uf && <span>{"Preencha os campos obrigatórios marcados com (*)"}</span>}
            </div>
          </div>
        </div>

        <div className="paymentWrapper">
          <div className="paymentTitleAndSubtitle">
            <h1>
              <CurrencyDollar size={22} style={{ color: "var(--purple)" }} />{" "}
              Pagamento
            </h1>
            <p>
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </p>
          </div>
          <div className="paymentOptions">
            <div className="paymentMethods">
              {Object.entries(paymentMethods).map(([key, { label, icon }]) => (
                <PaymentMethod
                  key={label}
                  id={key}
                  icon={icon}
                  label={label}
                  value={key}
                  {...register("formaPagamento")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="finalCheckoutWrapper">
        <h1 className="tittleRightWrapper">Cafés selecionados</h1>
        <div className="finalCheckout">
          <div>
            {cartItens.map((cart) => {
              return (
                <CoffeeSelected key={cart.productName} coffe={cart} />
              )
            })}
          </div>
          <div className="total-payment">
            <div className="frame1">
              <span>Total de itens</span>
              <span>R$ {formattedCartItensTotal}</span>
            </div>
            <div className="frame2">
              <span>Entrega</span>
              <span>R$ {formattedDelivery}</span>
            </div>
            <div className="frame3">
              <h1>Total</h1>
              <h1>R$ {formattedTotalInCart}</h1>
            </div>
            <NavLink style={{ textDecoration: 'none' }} to={'/success'}>
              <button
                type="button"
                id="confirm-button"
                disabled={cartQuantity === 0}
                onClick={handleSubmit(handleConfirmOrder)}
              >
                CONFIRMAR PEDIDO</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

