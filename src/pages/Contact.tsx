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
                Hulp nodig? Contacteer ons via mail of telefoon.
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
                    <p>Telefoon: 06-29315949</p>
                    <a href='mailto: stadsjuttersalmere@gmail.com' className='link-mail'>Email: stadsjuttersalmere@contact.com</a>
                  </div>
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
