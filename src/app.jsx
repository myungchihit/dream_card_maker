import styles from './app.module.css';
import Login from './components/login/login';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Maker from './components/maker/maker';

function App({authService}) {
  return (
    <div class={styles.app}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login authService={authService} />}/>
            <Route path="/maker" element={<Maker authService={authService} />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
