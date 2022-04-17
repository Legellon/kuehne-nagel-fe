import ShipmentsPage from "./pages/shipments-page";
import {Routes, Route} from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ShipmentsPage />} />
                <Route path='*' element={<>Page not found</>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
