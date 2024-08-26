import './App.css';
import Form from './components/form'
import {BrowserRouter} from 'react-router-dom';
import Rout from './components/rout';
import { FluentProvider } from '@fluentui/react-components';

function App() {
  return (
    <FluentProvider>
      <BrowserRouter>
      <Rout/>
      </BrowserRouter>
    </FluentProvider>
  );
}

export default App;
