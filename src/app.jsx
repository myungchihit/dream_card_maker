import styles from './app.module.css';
import Login from './components/login/login';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; // v6
import Maker from './components/maker/maker';

function App({ FileInput, authService }) {
  return (
    <div className={styles.app}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login authService={authService} />}/>
            <Route path="/maker" element={<Maker FileInput={FileInput} authService={authService} />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;