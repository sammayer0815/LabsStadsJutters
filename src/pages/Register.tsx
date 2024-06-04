import React, { useState, useRef  } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { IonContent, IonHeader, IonBackButton, IonButtons, IonPage, IonRow, IonCol, IonGrid, IonButton, IonCard, IonInput, IonCardContent, IonText } from '@ionic/react';
import Logo from '../assets/Logo.svg';
import './Login.css';

import { firestore } from '../config/controller';
import { setDoc, doc } from 'firebase/firestore';

const Register: React.FC = () => {
  const auth = getAuth();
  const history = useHistory();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Refs to handle input fields 
  // Couldn't use useState on these: an empty string would be send on the last filled field before submitting
  const usernameRef = useRef<HTMLIonInputElement>(null);
  const placeNameRef = useRef<HTMLIonInputElement>(null);

  const registerWithEmailAndPassword = async (event: any) => {
    event.preventDefault();

    // Get username & placeName value from the input fields using refs
    const username = usernameRef.current?.value as string;
    const placeName = placeNameRef.current?.value as string;

    // Confirm repeated password
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setAuthing(true); // Set authing state to true to indicate the authentication process is ongoing

    // Create new user using Firebase Authentication
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser; // Get the currently authenticated user

      // If the user is authenticated, save their data in Firestore in an users document
      if (user) {
        await setDoc(doc(firestore, "users", user.uid), {
          userId: user.uid,
          username: username,
          placeName: placeName,
          profilePicture: user.photoURL,
        });
      }

      // Redirect to the home page after successful registration
      history.replace("/home");

      // Handle errors during registration
    } catch (error) {
      console.error("Error registering with email/password:", error);
      setError("Registration failed. Please try again.");
      setAuthing(false); // Reset authing state
    }
  };

  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid fixed>
          {/* Back btn */}
          <IonButtons>
            <IonBackButton defaultHref='/login'></IonBackButton>
          </IonButtons>
          {/* Logo */}
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
              <div className='ion-text-center'>
                <img src={Logo} alt="Stadsjutters logo" width={"55%"} />
              </div>
            </IonCol>
          </IonRow>
          {/* Description */}
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6" className='ion-text-center'>
              <hr/>
              <h2>Betreed de wereld van Stadsjutters!</h2>
              <p>Ontdek een wereld van duurzaamheid en hergebruik.</p>
              <p>Klaar om mee te doen?</p>
            </IonCol>
          </IonRow>
          {/* Form card */}
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
              <IonCard>
                <IonCardContent>
                  <form onSubmit={registerWithEmailAndPassword}>
                    <h2 className='ion-text-center title-form'>Aanmelden bij Stadsjutters</h2>
                    {error && <IonText color="danger">{error}</IonText>}
                    <IonInput ref={usernameRef} type='text' className="ion-margin-top register-input" mode="md" label="Gebruikersnaam" name="username" labelPlacement="floating" fill='outline' />
                    <IonInput type='email' className="ion-margin-top register-input" mode="md" label="Email" name="email" labelPlacement="floating" fill='outline'  onIonChange={(e) => setEmail(e.detail.value!)} />
                    <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Wachtwoord" name="password" labelPlacement="floating" fill='outline'  onIonChange={(e) => setPassword(e.detail.value!)} />
                    <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Herhaal Wachtwoord" name="confirmPassword" labelPlacement="floating" fill='outline' onIonChange={(e) => setConfirmPassword(e.detail.value!)} />
                    <IonInput ref={placeNameRef} type='text' className="ion-margin-top register-input" mode="md" label="Plaats" name="placeName" labelPlacement="floating" fill='outline' />
                    <IonButton type='submit' mode='ios' className="ion-margin-top" expand='block' color='secondary' disabled={authing}>Register</IonButton>
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
