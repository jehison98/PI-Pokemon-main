import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import store from "./store/index";

//Components
import { Home } from "./components/Home/Home";
import Search from "./components/Search/Search";
import PokemonId from "./components/PokemonId/PokemonId";
import Create from "./components/Create/Create";
import { Navbar } from "./components/Navbar/Navbar";
//Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/pokemon/search/:id" component={PokemonId} />
          <Route exact path="/pokemon/create" component={Create} />
          <Route path="*">
            <h1>404 Not found</h1>
          </Route>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
