import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Home from "../pages/Home/Home";
import Owner_Premises from "../pages/Owner_Premises";
import Login from "../components/Login/Login";
import { PrivateRoute } from "../utilities/PrivateRoute";
import Owner_NewPremises from "../pages/Owner_NewPremises";
import Registration from "../auth/Registration/Registration";
import UserProfile from "../pages/UserProfile/UserProfile";
import Owner_Locations from "../pages/Owner_Locations";
const AppRouter = () => {
  const { initialized } = useKeycloak();
  if (!initialized) {
    return <h3>Loading ... !!!</h3>;
  }

  return (
    <>
      <Router>
        <div>
          <main>
            {<Navbar />}
            <section>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/registration" component={Registration} />
                <Route path="/user-profile" component={UserProfile} />
                <PrivateRoute
                  roles={["owner"]}
                  path="/owner-premises"
                  component={Owner_Premises}
                />
                <PrivateRoute
                  roles={["owner"]}
                  path="/owner-premises-new"
                  component={Owner_NewPremises}
                />
                <PrivateRoute
                  roles={["owner"]}
                  path="/owner-locations"
                  component={Owner_Locations}
                />
              </Switch>
            </section>
          </main>
          <footer>{<Footer />}</footer>
        </div>
      </Router>
    </>
  );
};

export default AppRouter;
