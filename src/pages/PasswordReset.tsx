import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonText, IonToolbar, useIonRouter } from '@ionic/react';
import Logo from '../assets/Logo.svg';
import './Login.css';

const ForgotPassword: React.FC = () => {
    const router = useIonRouter();
    const auth = getAuth();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    

    const requestPassword = async (event: any) => {
      event.preventDefault(); // Prevent the default form submission behavior
      setSending(true);
      setError('');
      setSuccess('');
  
      try {
          // Check if email is not empty
          if (!email) {
              setError('Please enter your email.');
              return;
          }
  
          console.log("Email:", email);
  
          await sendPasswordResetEmail(auth, email);
  
          // Password reset email sent successfully
          setSuccess('Password reset email sent. Check your inbox.');
          setTimeout(() => {
              history.push("/login");
          }, 5000);
      } catch (error) {
          console.error("Error sending password reset email:", error);
          setError('Failed to send password reset email. Please try again.');
      } finally {
          setSending(false);
      }
  };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/login'></IonBackButton>
                    </IonButtons>
                </IonToolbar>
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
                                Vergeten is menselijk. Wat is je e-mailadres?
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
                                        <h2 className='ion-text-center title-form'>Wachtwoord Vergeten</h2>
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
                                          disabled={!email} // Disable the button if email is empty
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
                    <div className='rotated-bg'></div>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ForgotPassword;
