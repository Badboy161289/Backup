import './App.css';
import Form from './components/form'
import {BrowserRouter} from 'react-router-dom';
import Rout from './components/rout';

function App() {
  return (
    <>
      <BrowserRouter>
      <Rout/>
      </BrowserRouter>
    </>
  );
}

export default App;
