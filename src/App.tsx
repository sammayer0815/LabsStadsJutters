import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordReset from './pages/PasswordReset';
import Lists from './pages/Lists';
import Home from './pages/Home';
import TabBar from './components/Nav';
import Help from './pages/Help';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import AuthRoute from './components/AuthRoute';
import Message from './pages/Message'; // Added your additional tabs
import Messages from './pages/Messages'; // Added your additional tabs

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Firebase 
import { initializeApp } from 'firebase/app';
import { config } from './config/config';

export const Firebase = initializeApp(config.firebaseConfig);

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Switch>
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/forgot-password" component={PasswordReset} exact />

            <AuthRoute>
              <Route path="/map" component={Map} exact />
              <Route path="/message" component={Message} exact />
              <Route path="/messages" component={Messages} exact />
              <Route component={Help} path="/help" exact />
              <Route component={Lists} path="/lists" exact />
              <Route component={Home} path="/home" exact />
              <Route component={Profile} path="/profiel" exact />
              <Route component={Settings} path="/profiel/instellingen" exact />
              <Route component={Contact} path="/profiel/contact" exact />
              <Route component={About} path="/profiel/over-ons" exact />
              <Route component={Admin} path="/profiel/admin" exact />
              <Redirect exact from="/" to="/home" />
              
            </AuthRoute>

            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
