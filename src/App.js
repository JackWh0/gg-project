import './styles/App.css';
import Home from './pages/Home.js';
import About from './pages/Info.js';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App-background">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/info/:id" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
