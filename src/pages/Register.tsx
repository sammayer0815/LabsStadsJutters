import { IonContent, IonHeader, IonBackButton, IonButtons, IonPage, IonText, IonRow, IonCol, IonButton, IonGrid, IonTitle, IonToolbar, IonCard, IonInput, IonCardContent  } from '@ionic/react';
import React from 'react';
import Logo from '../assets/Logo.svg';
import './Login.css';

const Register: React.FC = () => {

    const doRegister = (event: any) => {
        event.preventDefault();
        console.log('doLogin');
        // router.push('/home', 'root');
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
                    {/*Logo*/} 
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
                    
                    {/*Form card*/} 
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
                            <IonCard>
                                <IonCardContent>
                                    <form action="" onSubmit={doRegister}>
                                        <h2 className='ion-text-center title-form'>Aanmelden bij Stadsjutters</h2>
                                        {/*Problem: Can't style it in a seperate css file*/}
                                        <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Gebruikersnaam" labelPlacement="floating" fill='outline' ></IonInput>
                                        <IonInput type='email' className="ion-margin-top register-input" mode="md" label="Email" labelPlacement="floating" fill='outline' placeholder='test@gmail.com'></IonInput>
                                        <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Wachtwoord" labelPlacement="floating" fill='outline' ></IonInput>
                                        <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Herhaal Wachtwoord" labelPlacement="floating" fill='outline' ></IonInput>
                                        <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Plaats" labelPlacement="floating" fill='outline' ></IonInput>
                                        <IonButton mode="ios" type='submit' className="ion-margin-top" expand='block' color={'secondary'}>Login</IonButton>
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