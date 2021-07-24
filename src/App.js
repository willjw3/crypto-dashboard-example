
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import CoinPage from './templates/coinpage';


function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/coin/:id">
        <CoinPage />
      </Route>
    </Router>
  );
}

export default App;
