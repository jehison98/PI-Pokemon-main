import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import store from "./store/index";

//Components
import { Home } from "./components/Home/Home";
import Search from "./components/Search/Search";
/* import { PokemonDetails } from "./components/PokemonDetails/PokemonDetails";
import { PokemonCreate } from "./components/PokemonCreate/PokemonCreate";
import { Navbar } from "./components/Nav/Nav"; */
//Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/search" component={Search} />
          {/*<Route exact path="/pokemon/create" component={PokemonCreate} />
          <Route exact path="/pokemon/search/:id" component={PokemonDetails} /> */}
          <Route path="*">
            <h1>404 Not found</h1>
          </Route>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
