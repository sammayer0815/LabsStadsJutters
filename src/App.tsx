import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Post from "./pages/Post";
import Berichten from "./pages/Berichten";
import Profiel from "./pages/Profiel";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Map">
            <Map />
          </Route>
          <Route path="/Post">
            <Post />
          </Route>
          <Route path="/Berichten">
            <Berichten />
          </Route>
          <Route path="/Profiel">
            <Profiel />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href="/Home">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Map" href="/Map">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Map</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Post" href="/Post">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Post</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Berichten" href="/Berichten">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Berichten</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Profiel" href="/Profiel">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Profiel</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
