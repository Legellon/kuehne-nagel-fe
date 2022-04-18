import ShipmentsDashboard from "./pages/shipment-dashboard";
import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ShipmentsDashboard />} />
                <Route path='*' element={<>Page not found</>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
