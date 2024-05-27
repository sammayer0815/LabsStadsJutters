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
import { homeOutline, mapOutline, addCircleOutline, personOutline, chatbubbleEllipsesOutline } from 'ionicons/icons';


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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot-Password';
import ResetPassword from './pages/Reset-Password';
import Lists from './pages/Lists';
import Home from './pages/Home';
import Menu from './pages/Menu';
import TabBar from './components/Nav';
import Help from './pages/Help';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
            <Route component={Login} path="/login" exact />
            <Route component={Register} path="/register" exact />
            <Route component={ForgotPassword} path="/forgot-password" exact />
            <Route component={ResetPassword} path="/reset-password" exact />
            <Route component={Help} path="/help" exact />
            <Route component={Lists} path="/lists" exact />
            <Route component={Home} path="/home" exact />
            <Route component={Menu} path="/app" />
            <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
