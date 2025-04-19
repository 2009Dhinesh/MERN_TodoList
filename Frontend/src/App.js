// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './component/Header';
// import Home from './component/Home';
// import Doctors from './component/Doctors';
// // import About from './component/About';
// // import Services from './component/Services';
// // import Contact from './component/Contact';
// import Login from './component/Login';
// import Signup from './component/Signup';
import Todo from './Todo';
import './App.css'
function App() {
  // return (
  //   <BrowserRouter>
  //     <Header />
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/doctors" element={<Doctors />} />
  //       {/* <Route path="/about" element={<About />} />
  //       <Route path="/services" element={<Services />} />
  //       <Route path="/contact" element={<Contact />} /> */}
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/signup" element={<Signup />} />
  //     </Routes>
  //   </BrowserRouter>
  // );

  return(<>
    <Todo />
  </>)
}

export default App;
