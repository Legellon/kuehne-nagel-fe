import ShipmentsPage from "./pages/shipments-page";
import {Routes, Route} from "react-router";

function App() {
    return (
        <Routes>
            <Route path='/' element={<ShipmentsPage />} />
        </Routes>
    );
}

export default App;
