import './App.css';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Home from './modules/Home';
import MainLayout from './component/layouts/MainLayout';
import SignIn from './Auth/pages/SignIn/SignIn';
import SignUp from './Auth/pages/SignUp/SignUp';
import PageNcc from './modules/PageNcc/PageNcc';
import NhomNganhHang from './modules/NhomNganhHang/NhomNganhHang';
import PageDm from './modules/PageDm';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainLayout/>}>
              <Route index element={<Home/>}></Route>
              <Route path='/PageDm' element={<PageDm/>}></Route>
              <Route path='/PageNcc' element={<PageNcc/>}></Route>
              <Route path='/NhomNH' element={<NhomNganhHang/>}></Route>

              {/* <Route path="/sign-in" element={<SignIn/>} /> */}
            {/* <Route path="/sign-up" element={<SignUp/>} /> */}
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
