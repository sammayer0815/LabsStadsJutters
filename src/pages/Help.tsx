import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import Logo from '../assets/Logo.svg';
import './Login.css';

const Help: React.FC = () => {
    const router = useIonRouter();
    
    const sendEmail = (event:any) => {
        event.preventDefault(); // Prevent the default form submission behavior
        router.push('/login'); 
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
                                Hulp nodig? Vul hieronder de formulier in of contacteer 
                                ons via mail of telefoon.
                            </p>
                        </IonCol>
                    </IonRow>
                    
                    {/*Form card*/} 
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
                            <IonCard>
                                <IonCardContent>
                                    <form action="" onSubmit={sendEmail}>
                                        <h2 className='ion-text-center title-form'>Contact formulier Stadsjutters</h2>
                                        <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Naam" labelPlacement="floating" fill='outline'></IonInput>
                                        <IonInput type='email' className="ion-margin-top register-input" mode="md" label="Email" labelPlacement="floating" fill='outline' placeholder='test@gmail.com'></IonInput>
                                        <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Titel Probleem" labelPlacement="floating" fill='outline'></IonInput>
                                        <IonTextarea className="ion-margin-top register-input" mode="md" label="Beschrijf probleem" labelPlacement="floating" fill='outline'></IonTextarea>
                                        <IonButton type='submit' mode="ios" className="ion-margin-top" expand='block' color={'secondary'}>Formulier versturen</IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    {/*Contactgegevens Stadsjutters*/} 
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
                            <IonCard>
                                <IonCardContent>
                                    
                                    <h2 className='ion-text-center title-form'>Contactgegevens Stadsjutters</h2>
                                    <p>Telefoon: 06-123456789</p>
                                    <p>Email:     stadsjuttersalmere@contact.com</p>
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

export default Help;