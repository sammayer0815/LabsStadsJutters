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
                                Hulp nodig? Contacteer 
                                ons via mail of telefoon.
                            </p>
                        </IonCol>
                    </IonRow>
                    {/*Contactgegevens Stadsjutters*/} 
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
                            <IonCard>
                                <IonCardContent>
                                    <h2 className='ion-text-center title-form'>Contactgegevens Stadsjutters</h2>
                                    <div className='ion-margin-top'>
                                        <p>Telefoon: 06-123456789</p>
                                        <a href='mailto: stadsjuttersalmere@contact.com' className='link-mail'>Email: stadsjuttersalmere@contact.com</a>
                                    </div>
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