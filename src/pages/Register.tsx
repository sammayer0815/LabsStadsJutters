import React, { useState, useRef  } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { IonContent, IonHeader, IonBackButton, IonButtons, IonPage, IonRow, IonCol, IonGrid, IonButton, IonCard, IonInput, IonCardContent, IonText } from '@ionic/react';
import Logo from '../assets/Logo.svg';
import './Login.css';

import { firestore } from '../config/controller';
import { setDoc, doc, query, where, getDocs, collection }  from 'firebase/firestore';

const Register: React.FC = () => {
  const auth = getAuth();
  const history = useHistory();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Refs to handle username input fields
  const usernameRef = useRef<HTMLIonInputElement>(null);
  

  const registerWithEmailAndPassword = async (event: any) => {
    event.preventDefault();

    // Get username value from the input fields using refs
    const username = usernameRef.current?.value as string;

    // Pattern for input text fields
    const inputTextPattern = /^[a-zA-Z0-9]+$/;

    // Check if username is empty or doesn't match the pattern
    if (!username.trim()) {
      console.error("Gebuikersnaam kan niet leeg zijn");
      alert("Username cannot be empty");
      return;
    } else if (!inputTextPattern.test(username)) {
      console.error("Gebruikersnaam kan geen speciale tekens bevatten");
      alert("Username can't have special chars");
      return;
    }

    // Confirm repeated password
    if (password !== confirmPassword) {
      setError("Wachtwoorden komen niet overeen");
      return;
    }
    setAuthing(true); // Set authing state to true to indicate the authentication process is ongoing

    // Fetch all usernames from the database
    const usersCollection = collection(firestore, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usernames = usersSnapshot.docs.map(doc => doc.data().username);

    // Check if the new username is already taken
    if (usernames.includes(username)) {
      console.error("Gebruikersnaam is al in gebruik");
      alert("Deze gebruikersnaam is al in gebruik!");
      setAuthing(false);
      return;
    }

    // Create new user using Firebase Authentication
    try {
      
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser; // Get the currently authenticated user

      // If the user is authenticated, save their data in Firestore in an users document
      if (user) {
        await setDoc(doc(firestore, "users", user.uid), {
          userId: user.uid,
          username: username,
          profilePicture: user.photoURL,
        });
      }

      // Redirect to the home page after successful registration
      history.replace("/home");

      // Handle errors during registration
    } catch (error: any) {
      //console.error("Error registering with email/password:", error);
  
      // Handling specific error codes
      if (error.code === 'auth/email-already-in-use') {
        setError("Dit emailadres is al in gebruik. Probeer een ander emailadres.");
      } else {
        setError("Registratie mislukt. Probeer het opnieuw.");
      }
      setAuthing(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="white-header" mode="ios">
        <IonButtons slot="start" className="ion-margin">
          <IonBackButton defaultHref='/login'></IonBackButton>
        </IonButtons>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid fixed>
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
                    <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Gebruikersnaam" name="username" labelPlacement="floating" fill='outline' ref={usernameRef}  required/>
                    <IonInput type='email' className="ion-margin-top register-input" mode="md" label="Email" name="email" labelPlacement="floating" fill='outline'  onIonChange={(e) => setEmail(e.detail.value!)} required/>
                    <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Wachtwoord" name="password" labelPlacement="floating" fill='outline'  onIonChange={(e) => setPassword(e.detail.value!)} required/>
                    <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Herhaal Wachtwoord" name="confirmPassword" labelPlacement="floating" fill='outline' onIonChange={(e) => setConfirmPassword(e.detail.value!)} required/>
                    <IonButton type='submit' mode='ios' className="ion-margin-top" expand='block' color='secondary' disabled={authing}>Register</IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
