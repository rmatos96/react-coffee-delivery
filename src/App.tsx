import { BrowserRouter, Router } from "react-router-dom";
import { Routers } from "./Router";
import "./global.scss"
import { CoffeContextProvider } from "./contexts/CoffeContext";

export function App() {

  return (
    <div>
      <BrowserRouter>
        <CoffeContextProvider>
          <Routers />
        </CoffeContextProvider>
      </BrowserRouter>
    </div>
  )
}

