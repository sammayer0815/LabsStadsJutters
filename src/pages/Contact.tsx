import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { addCircleOutline, bookmarkOutline, callOutline, constructOutline, imageOutline, imagesOutline, informationCircleOutline, peopleOutline, personAddOutline, personOutline, settingsOutline } from 'ionicons/icons';
import React from 'react';
import NavTabs from '../components/Nav';
import './Login.css';
import './style.css';

const Contact: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonButtons>
                        <IonBackButton defaultHref='/profiel' text=""></IonBackButton> 
                    </IonButtons>
                    <IonTitle>Contact</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid fixed> 
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6" className='ion-text-center'>
                            <p className='ion-margin-top'>
                                Hulp nodig? Vul hieronder de formulier in of contacteer 
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
                                    <p>Telefoon: 06-123456789</p>
                                    <p>Email: stadsjuttersalmere@contact.com</p>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    
                    {/*Form card*/} 
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
                            <IonCard>
                                <IonCardContent>
                                    <form action="" >
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
                </IonGrid>

            </IonContent>
            {/* Nav */}
            <NavTabs />
        </IonPage>
    );
};

export default Contact;