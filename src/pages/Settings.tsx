import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar, createGesture } from '@ionic/react';
import { addCircleOutline, bookmarkOutline, callOutline, constructOutline, createOutline, imageOutline, imagesOutline, informationCircleOutline, locationOutline, peopleOutline, personAddOutline, personOutline, settingsOutline, trashBinOutline, trashOutline } from 'ionicons/icons';
import React from 'react';
import NavTabs from '../components/Nav';
import './style.css';
import TestImage4 from '../assets/Frans-eiken-set-rotated.jpg';

const Settings: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonButtons>
                        <IonBackButton defaultHref='/profiel' text=""></IonBackButton> 
                    </IonButtons>
                    <IonTitle>Instellingen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid fixed>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <div className='flex-profile-picture-text'>
                                <IonAvatar>
                                    <img alt="Silhouette of mountains" src={TestImage4} className='settings-profile-picture' />
                                </IonAvatar>
                                <div className='space-text-change'>
                                    <div className='space-text'>
                                        <p className='ion-no-margin'>Henk123</p>
                                        <div className='inline-icon-text'>
                                            <IonIcon className='grey-text' aria-hidden="true" icon={locationOutline} />
                                            <p className='ion-no-margin grey-text'>Amsterdam</p>
                                        </div>
                                    </div>
                                    <div className='ion-margin-top'>
                                        <div className='inline-icon-text'>
                                            <IonIcon aria-hidden="true" icon={createOutline} />
                                            <p className='ion-no-margin'>Foto aanpassen</p>
                                        </div>
                                        <div className='inline-icon-text'>
                                            <IonIcon aria-hidden="true" icon={trashOutline} />
                                            <p className='ion-no-margin'>Foto Verwijderen</p>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className='ion-margin-top'/>
                        </IonCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <form action="" >
                                <h2 className='ion-text-center title-form'>Aanmelden bij Stadsjutters</h2>
                                <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Gebruikersnaam" labelPlacement="floating" fill='outline' value={'Henk123'}  ></IonInput>
                                <IonInput type='email' className="ion-margin-top register-input" mode="md" label="Email" labelPlacement="floating" fill='outline' placeholder='test@gmail.com' value={'test@gmail.com'} ></IonInput>
                                <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Nieuw Wachtwoord" labelPlacement="floating" fill='outline'></IonInput>
                                <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Plaats" labelPlacement="floating" fill='outline' value={'Amsterdam'} ></IonInput>
                                <IonButton type='submit' mode="ios" className="ion-margin-top" expand='block' color={'secondary'}>Gegevens updaten</IonButton>
                            </form>
                        </IonCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-center ion-margin-top">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <hr className='ion-margin-bottom'/>
                            <h2 className='ion-text-center title-form ion-no-margin'>Account verwijderen</h2>
                            <h2 className='ion-text-center title-form ion-no-margin'>(dit kan niet ongedaan worden!)</h2>
                            <IonButton type='submit' mode="ios" className="ion-margin-top" expand='block' color={'danger'}>Account verwijderen</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid> 
            </IonContent>
            {/* Nav */}
            <NavTabs />
        </IonPage>
    );
};

export default Settings;