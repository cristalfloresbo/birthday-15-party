import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GuestForm from "./GuestForm";
import GuestList from "./GuestList";
import GuestVerification from "./GuestVerification";
import NotFound from "./NotFound";
import GenerateGuestQR from "./GenerateGuestQR";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GuestList />} />
                <Route path="/guest-list" element={<GuestList />} />
                <Route path="/confirm-invite" element={<GuestForm />} />
                <Route path="/confirm-invite/generate-qr/:id" element={<GenerateGuestQR />} />
                <Route
                    path="/check-invite/:id"
                    element={<GuestVerification />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
