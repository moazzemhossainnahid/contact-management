
import { ToastContainer } from "react-toastify";
import './App.css'
import { Route, Routes } from "react-router-dom";
import AddContacts from "./pages/AddContacts/AddContacts";
import AllContacts from "./pages/AllContacts/AllContacts";
import Header from "./pages/Shared/Header/Header";
import Footer from "./pages/Shared/Footer/Footer";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
        <Header />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<AddContacts />} />
            <Route path="/allcontacts" element={<AllContacts />} />
          </Routes>
        </div>
        <Footer />
      <ToastContainer />

    </>
  )
}

export default App
