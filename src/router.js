import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages";

function router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default router;
