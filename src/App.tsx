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
import Home from './pages/Home'; // Renamed Tab1 to Home for consistency
import Map from './pages/Tab1'; // Renamed Tab2 to Map for consistency
import Post from './pages/Tab2'; // Renamed Tab3 to Post for consistency
import Message from './pages/Message'; // Added your additional tabs
import Profile from './pages/Tab3'; // Added your additional tabs
import Messages from './pages/Messages'; // Added your additional tabs
import AuthRoute from './components/AuthRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordReset from './pages/PasswordReset';

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
        <IonRouterOutlet>
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/forgot-password" component={PasswordReset} exact />

          <AuthRoute>
            <Route path="/home" component={Home} exact />
            <Route path="/map" component={Map} exact />
            <Route path="/post" component={Post} exact />
            <Route path="/message" component={Message} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/messages" component={Messages} exact />
          </AuthRoute>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="map" href="/map">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Map</IonLabel>
          </IonTabButton>
          <IonTabButton tab="post" href="/post">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Post</IonLabel>
          </IonTabButton>
          <IonTabButton tab="message" href="/message">
            <IonIcon aria-hidden="true" icon="/icons/message.svg" />
            <IonLabel>Message</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon aria-hidden="true" icon="/icons/profile.svg" />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
