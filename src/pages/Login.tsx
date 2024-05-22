import { IonContent, IonHeader, IonPage, IonText, IonRow, IonCol, IonButton, IonGrid, IonTitle, IonToolbar, IonCard, IonInput, IonCardContent, useIonRouter  } from '@ionic/react';
import React from 'react';
import Logo from '../assets/Logo.svg';
import './Login.css';

const Login: React.FC = () => {
    const router = useIonRouter();

    const doLogin = (event: any) => {
        event.preventDefault();
        router.push('/home');
    };

    return (
        <IonPage>
            <IonHeader>

            </IonHeader>

            <IonContent className="ion-padding">
                <IonGrid fixed> 
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
                                    <form action="" onSubmit={doLogin}>
                                        <h2 className='ion-text-center title-form'>Aanmelden bij Stadsjutters</h2>
                                        {/*Problem: Can't style it in a seperate css file*/}
                                        <IonInput type='email' className="ion-margin-top register-input" mode="md" label="Emailadress" labelPlacement="floating" fill='outline' placeholder='test@gmail.com'></IonInput>
                                        <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Wachtwoord" labelPlacement="floating" fill='outline' ></IonInput>
                                        <IonRow className="ion-justify-content-between ion-margin-top">
                                            <IonCol size="7">
                                                <a className='underline' href='/forgot-password'>Wachtwoord vergeten</a>
                                            </IonCol>
                                            <IonCol size="5" className='ion-text-end'>
                                                <a className='underline' href='/forgot-password'>Hulp nodig?</a>
                                            </IonCol>

                                        </IonRow>

                                        <IonButton type='submit' className="ion-margin-top" expand='block' color={'secondary'}>Login</IonButton>
                                        <IonButton routerLink='/register' type='button' fill='outline' className="ion-margin-top" expand='block' color={'secondary'}>Account Aanmaken</IonButton>
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

export default Login;