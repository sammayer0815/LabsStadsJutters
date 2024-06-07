import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addCircleOutline, bookmarkOutline, callOutline, constructOutline, imageOutline, imagesOutline, informationCircleOutline, peopleOutline, personAddOutline, personOutline, settingsOutline } from 'ionicons/icons';
import React from 'react';
import NavTabs from '../components/Nav';
import './style.css';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
          <IonButtons>
            <IonBackButton defaultHref='/profiel' text=""></IonBackButton> 
          </IonButtons>
          <IonTitle>Over Ons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Test
      </IonContent>
      {/* Nav */}
      <NavTabs />
    </IonPage>
  );
};

export default About;
