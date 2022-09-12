import { Route, Routes } from "react-router-dom";
import { Header } from "./layouts/Header/Header";
import { Checkout } from "./pages/Checkout/Checkout";
import { Home } from "./pages/Home/Home";
import { SuccessBuy } from "./pages/Success/SuccessBuy";

export function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Header/>}>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<SuccessBuy />} />
            </Route>
        </Routes>
    )
}