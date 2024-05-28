import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { IonContent, IonHeader, IonBackButton, IonButtons, IonPage, IonRow, IonCol, IonGrid, IonButton, IonCard, IonInput, IonCardContent, IonText } from '@ionic/react';
import Logo from '../assets/Logo.svg';
import './Login.css';

const Register: React.FC = () => {
  const auth = getAuth();
  const history = useHistory();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [error, setError] = useState('');

  const registerWithEmailAndPassword = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setAuthing(true);

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response.user.uid);
      history.replace("/home");
    } catch (error) {
      console.error("Error registering with email/password:", error);
      setError("Registration failed. Please try again.");
      setAuthing(false);
    }
  };

  const goToLoginPage = () => {
    history.push("/login");
  };

  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <IonButtons>
            <IonBackButton defaultHref='/login'></IonBackButton>
          </IonButtons>
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
                  <form onSubmit={registerWithEmailAndPassword}>
                    <h2 className='ion-text-center title-form'>Aanmelden bij Stadsjutters</h2>
                    {error && <IonText color="danger">{error}</IonText>}
                    <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Gebruikersnaam" labelPlacement="floating" fill='outline' value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
                    <IonInput type='email' className="ion-margin-top register-input" mode="md" label="Email" labelPlacement="floating" fill='outline' value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
                    <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Wachtwoord" labelPlacement="floating" fill='outline' value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
                    <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Herhaal Wachtwoord" labelPlacement="floating" fill='outline' value={confirmPassword} onIonChange={(e) => setConfirmPassword(e.detail.value!)} />
                    <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Plaats" labelPlacement="floating" fill='outline' value={placeName} onIonChange={(e) => setPlaceName(e.detail.value!)} />
                    <IonButton type='submit' className="ion-margin-top" expand='block' color='secondary' disabled={authing}>Register</IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <div className='rotated-bg'></div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
