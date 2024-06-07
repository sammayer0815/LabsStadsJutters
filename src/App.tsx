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
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from './pages/Home'; 
import Map from './pages/Map'; 
import Post from './pages/Post'; 
import Message from './pages/Message'; 
import Profile from './pages/Profile';
import Messages from './pages/Messages'; 
import AuthRoute from './components/AuthRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordReset from './pages/PasswordReset';
import Lists from './pages/Lists';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import About from './pages/About';
import Admin from './pages/Admin';

import AdminUsers from './pages/AdminUsers';
import AdminListings from './pages/AdminListings';

import List from './pages/List';
import Help from './pages/Help';
import ChangePassword from './pages/ChangePassword';
import Mijnadvertenties from './pages/Mijnadvertenties'
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

// Initialize Firebase
export const Firebase = initializeApp(config.firebaseConfig);

setupIonicReact();

const App: React.FC = () => (
<IonApp>
  <IonReactRouter>
      <IonRouterOutlet>
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/forgot-password" component={PasswordReset} exact />
          <Route path="/help" component={Help} exact />

          <AuthRoute>
            <Route path="/home" component={Home} exact />
            <Route path="/map" component={Map} exact />
            <Route path="/post" component={Post} exact />
            <Route path="/home/lists" component={Lists} exact />
            <Route path="/home/lists/list" component={List} exact />
            <Route path="/berichten" component={Message} exact />
            <Route path="/berichten/:messageId" component={Messages} exact />
            <Route path="/profiel" component={Profile} exact />
            <Route path="/profiel/instellingen" component={Settings} exact />
            <Route path="/profiel/contact" component={Contact}  exact />
            <Route path="/profiel/over-ons" component={About} exact />
            <Route path="/profiel/admin" component={Admin} exact />
            <Route path="/profiel/admin/users" component={AdminUsers} exact />
            <Route path="/profiel/admin/listings" component={AdminListings} exact />
            <Route path="/profiel/wachtwoord-aanpassen" component={ChangePassword} exact />
            <Route path="/profiel/mijn-advertenties" component={Mijnadvertenties} exact />
          </AuthRoute>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);

export default App;
