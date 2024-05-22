import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import Logo from '../assets/Logo.svg';
import './Login.css';

const ForgotPassword: React.FC = () => {
    const router = useIonRouter();
    
    const requestPassword = (event:any) => {
        event.preventDefault(); // Prevent the default form submission behavior
        router.push('/reset-password'); 
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
                            <p className='ion-margin-top'>
                                Vergeten is menselijk. Wat is je e-mailadres? 
                                Dan zenden we je binnen enkele minuten een linkje 
                                om een nieuw wachtwoord in te stellen.
                            </p>
                        </IonCol>
                    </IonRow>
                    
                    {/*Form card*/} 
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
                            <IonCard>
                                <IonCardContent>
                                    <form action="" onSubmit={requestPassword}>
                                        <h2 className='ion-text-center title-form'>Wachtwoord Vergeten</h2>
                                        <IonInput type='email' className="ion-margin-top register-input" mode="md" label="Email" labelPlacement="floating" fill='outline' placeholder='test@gmail.com'></IonInput>
                                        <IonButton type='submit'  className="ion-margin-top" expand='block' color={'secondary'}>Nieuw wachtwoord aanvragen</IonButton>
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