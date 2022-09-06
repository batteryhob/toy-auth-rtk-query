import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './views/main';
import Progressing from './views/progressing';
import Complete from './views/complete';

import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/progressing' element={<Progressing />} />
          <Route path='/completed' element={<Complete />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
