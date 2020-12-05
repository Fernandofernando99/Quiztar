import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/questions">
              <GamePage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
