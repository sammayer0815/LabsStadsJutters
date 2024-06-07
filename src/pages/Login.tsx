import React, { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory, useLocation  } from "react-router-dom";
import { IonToast, IonContent, IonHeader, IonPage, IonText, IonRow, IonCol, IonButton, IonGrid, IonTitle, IonToolbar, IonCard, IonInput, IonCardContent, useIonRouter } from '@ionic/react';
import Logo from '../assets/Logo.svg';
import './Login.css';

  // Variables for Login page
  const Login: React.FC = () => {
  const auth = getAuth();
  const history = useHistory();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const location = useLocation(); 
  const [toast, setToast] = useState<{ show: boolean, message: string, color: string }>({ show: false, message: '', color: '' });
  
  useEffect(() => {
    // Check if there's a toast message
    if (location.state && (location.state as any).showToast) {
      const state = location.state as any;
      // Set the toast message state
      setToast({ show: true, message: state.toastMessage, color: state.toastColor });
      // Clear the state after showing the toast
      history.replace({ ...history.location, state: {} });
    }
  }, [location, history]);

  // Function for signing in with Google
  const signInWithGoogle = async () => {
    setAuthing(true);

    // Sign in with Google
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(response.user.uid);
      // Redirect to home page after successful sign-in
      history.replace("/home");
    } catch (error) {
      // Error handling for Google sign-in
      //console.error("Error signing in with Google:", error);
      setError("Google sign-in failed. Please try again.");
      setAuthing(false);
    }
  };

  // Function for signing in with email and password
  const signInWithEmailPassword = async (event: any) => {
    event.preventDefault();
    setAuthing(true);

    // Sign in with email and password
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user.uid);
      // Redirect to home page after successful sign-in
      history.replace("/home");
      // Error handling for email and password sign-in
    } catch (error) {
      //console.error("Error signing in with email/password:", error);
      setError("Email/password inloggen mislukt. Probeer het opnieuw.");
      setAuthing(false);
    }
  };

  const goToPasswordResetPage = () => {
    history.push("/passwordreset");
  };

  const goToRegisterPage = () => {
    history.push("/register");
  };

  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
              <div className='ion-text-center'>
                <img src={Logo} alt="Stadsjutters logo" width={"55%"} />
              </div>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6" className='ion-text-center'>
              <hr/>
              <h2>Betreed de wereld van Stadsjutters!</h2>
              <p>Ontdek een wereld van duurzaamheid en hergebruik.</p>
              <p>Klaar om mee te doen?</p>
            </IonCol>
          </IonRow>
          
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
              <IonCard>
                <IonCardContent>
                  <form onSubmit={signInWithEmailPassword}>
                    <h2 className='ion-text-center title-form'>Aanmelden bij Stadsjutters</h2>
                    {error && <IonText color="danger">{error}</IonText>}
                    <IonInput 
                      type='email' 
                      className="ion-margin-top register-input" 
                      mode="md" 
                      label="Emailadress" 
                      labelPlacement="floating" 
                      fill='outline' 
                      placeholder='test@gmail.com'
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                    <IonInput 
                      type='password' 
                      className="ion-margin-top register-input" 
                      mode="md" 
                      label="Wachtwoord" 
                      labelPlacement="floating" 
                      fill='outline' 
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                    <IonRow className="ion-justify-content-between ion-margin-top">
                      <IonCol size="7">
                        <a className='underline' href='/forgot-password'>Wachtwoord vergeten</a>
                      </IonCol>
                      <IonCol size="5" className='ion-text-end'>
                        <a className='underline' href='/help'>Hulp nodig?</a>
                      </IonCol>
                    </IonRow>

                    <IonButton 
                      type='submit' 
                      className="ion-margin-top" 
                      expand='block' 
                      color={'secondary'}
                      mode="ios"
                      disabled={authing}
                    >
                      Login
                    </IonButton>
                    {/* <IonButton 
                      type='button'
                      onClick={signInWithGoogle} 
                      className="ion-margin-top" 
                      expand='block' 
                      color={'secondary'} 
                      disabled={authing}
                    >
                      Sign in with Google
                    </IonButton> */}
                    <IonButton 
                      routerLink='/register' 
                      type='button' 
                      fill='outline' 
                      className="ion-margin-top" 
                      expand='block' 
                      mode="ios"
                      color={'secondary'}
                    >
                      Account Aanmaken
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonToast
            isOpen={toast.show}
            onDidDismiss={() => setToast({ ...toast, show: false })}
            message={toast.message}
            duration={2000}
            color={toast.color}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
