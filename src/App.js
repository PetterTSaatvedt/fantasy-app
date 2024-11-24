import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import { BrowserRouter as BRouter } from 'react-router-dom';

function App() {
  return (
    <BRouter>
      <div className="App">
        <Nav />
        <Main />
      </div>
    </BRouter>
  );
}

export default App;
