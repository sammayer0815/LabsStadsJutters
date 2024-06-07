import React, { useState, useRef  } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { IonContent, IonHeader, IonBackButton, IonButtons, IonPage, IonRow, IonCol, IonGrid, IonButton, IonCard, IonInput, IonCardContent, IonText, IonToast } from '@ionic/react';
import { firestore } from '../config/controller';
import { setDoc, doc, getDocs, collection }  from 'firebase/firestore';
import Logo from '../assets/Logo.svg';
import './Login.css';

const Register: React.FC = () => {
  const auth = getAuth();
  const history = useHistory();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ show: boolean, message: string, color: string }>({ show: false, message: '', color: '' });

  // Get username value from the input fields using refs 
  const usernameRef = useRef<HTMLIonInputElement>(null);

  // OnSubmit register form
  const registerWithEmailAndPassword = async (event: any) => {
    event.preventDefault();

    // Pattern for input text fields
    const inputTextPattern = /^[a-zA-Z0-9]+$/;

    // Get the current values
    const username = usernameRef.current?.value as string;

    // Check if username is empty or doesn't match the pattern
    if (!username.trim()) {
      // console.error("Username cannot be empty");
      setToast({ show: true, message: 'Error: Gebruikersnaam mag niet leeg zijn!', color: 'danger' });
      return;
    } else if (!inputTextPattern.test(username)) {
      // console.error("Username must contain only alphanumeric characters");
      setToast({ show: true, message: 'Error: Gebruikersnaam mag geen speciale tekens bevatten!', color: 'danger' });
      return;
    } 

    // Confirm repeated password
    if (password !== confirmPassword) {
      setToast({ show: true, message: 'Error: Wachtwoorden komen niet overeen!', color: 'danger' });
      return;
    }
    setAuthing(true); // Set authing state to true to indicate the authentication process is ongoing

    // Fetch all usernames from the database
    const usersCollection = collection(firestore, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usernames = usersSnapshot.docs
    .map(doc => doc.data().username) // Get usernames
    .filter(username => username) // Filter out undefined or null usernames
    .map(username => username.toLowerCase()); // Convert to lowercase

    // Check if the new username is already taken
    if (usernames.includes(username.toLowerCase())) {
      // console.error("Username is already taken");
      setToast({ show: true, message: 'Error: Deze gebruikersnaam is al in gebruik!', color: 'danger' });
      setAuthing(false);
      return;
    }

    try {
      // Create new user using Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser; 

      // If the user is authenticated, save their data in Firestore in an users document/table
      if (user) {
        await setDoc(doc(firestore, "users", user.uid), {
          userId: user.uid,
          username: username,
          profilePicture: user.photoURL,
        });
      }
      // Redirect to the home page after successful registration
      history.replace("/home");  

    } catch (error: any) {
      // Error for already used email
      if (error.code === 'auth/email-already-in-use') {
        setToast({ show: true, message: 'Error: Deze email is al in gebruik. Gebruik een ander e-mailadres.', color: 'danger' });
      } else {
        setToast({ show: true, message: 'Error: Registratie mislukt. Probeer het opnieuw.', color: 'danger' });
      }
      setAuthing(false);
    }
  };

  return (
    <IonPage>
      {/* Header */}
      <IonHeader className="white-header" mode="ios">
        <IonButtons slot="start" className="ion-margin">
          <IonBackButton defaultHref='/login'></IonBackButton>
        </IonButtons>
      </IonHeader>
      {/* Content */}
      <IonContent className="ion-padding-horizontal">
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
                    <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Gebruikersnaam" name="username" labelPlacement="floating" fill='outline' ref={usernameRef} maxlength={18} required/>
                    <IonInput type='email' className="ion-margin-top register-input" mode="md" label="Email" name="email" labelPlacement="floating" fill='outline'  onIonChange={(e) => setEmail(e.detail.value!)} required/>
                    <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Wachtwoord" name="password" labelPlacement="floating" fill='outline'  onIonChange={(e) => setPassword(e.detail.value!)} required/>
                    <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Herhaal Wachtwoord" name="confirmPassword" labelPlacement="floating" fill='outline' onIonChange={(e) => setConfirmPassword(e.detail.value!)} required/>
                    <IonButton type='submit' mode='ios' className="ion-margin-top" expand='block' color='secondary' disabled={authing}>Register</IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonToast
          isOpen={toast.show}
          onDidDismiss={() => setToast({ ...toast, show: false })}
          message={toast.message}
          duration={3000}
          color={toast.color}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
