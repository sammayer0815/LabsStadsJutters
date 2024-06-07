import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonText, IonToolbar, useIonRouter } from '@ionic/react';
import Logo from '../assets/Logo.svg';
import './Login.css';

// Consts for the ForgotPassword component
  const ChangePassword: React.FC = () => {
  const router = useIonRouter();
  const auth = getAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const requestPassword = async (event: any) => {
    event.preventDefault();
    setSending(true);
    // Error and success empty messages
    setError('');
    setSuccess('');

    try {
      // Check if email is not empty
      if (!email) {
        setError('Please enter your email.');
        return;
      }

      // Console log for seeing the email
      // console.log("Email:", email);

      // Send password reset email
      await sendPasswordResetEmail(auth, email);

      // Password reset email sent successfully
      setSuccess('Wachtwoord reset link is verzonden naar je e-mailadres. Controleer je inbox of spam folder.');
      setTimeout(() => {
        // Redirect to login page after 5 seconds after success message
        history.push("/login");
      }, 5000);
      // Error handling send mail
    } catch (error) {
      // Error messages
      console.error("Error mail verzenden:", error);
      setError('Wachtwoord reset link kon niet worden verzonden. Probeer het opnieuw.');
    } finally {
      setSending(false);
    }
  };

  // Frontend of the ForgotPassword component
  return (
    <IonPage>
      <IonHeader className="white-header" mode="ios">
        <IonButtons slot="start" className="ion-margin">
          <IonBackButton defaultHref='/profiel/instellingen'></IonBackButton>
        </IonButtons>
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
              <hr />
              <p className='ion-margin-top'>
                Wachtwoord aanpassen? Wat is je e-mailadres?
                Dan zenden we je binnen enkele minuten een linkje
                om een nieuw wachtwoord in te stellen.
              </p>
            </IonCol>
          </IonRow>

          {/* Form card */}
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
              <IonCard>
                <IonCardContent>
                  <form action="" onSubmit={requestPassword}>
                    <h2 className='ion-text-center title-form'>Wachtwoord Veranderen</h2>
                    <IonInput
                      type='email'
                      className="ion-margin-top register-input"
                      mode="md"
                      label="Email"
                      labelPlacement="floating"
                      fill='outline'
                      placeholder='test@gmail.com'
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value || '')}
                    ></IonInput>
                    <IonButton
                      type='submit'
                      className="ion-margin-top"
                      expand='block'
                      color={'secondary'}
                      disabled={!email}
                    >
                      Nieuw wachtwoord aanvragen
                    </IonButton>

                    {error && <IonText color="danger">{error}</IonText>}
                    {success && <IonText color="success">{success}</IonText>}

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

export default ChangePassword;


