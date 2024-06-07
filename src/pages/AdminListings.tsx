import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addCircleOutline, bookmarkOutline, callOutline, constructOutline, imageOutline, imagesOutline, informationCircleOutline, peopleOutline, personAddOutline, personOutline, settingsOutline } from 'ionicons/icons';
import React from 'react';
import NavTabs from '../components/Nav';
import './style.css';


const AdminListings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
          <IonButtons>
            <IonBackButton defaultHref='/profiel' text=""></IonBackButton> 
          </IonButtons>
          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className='list-profile'>
          <IonItem button>
            <IonIcon className='ion-margin-end' aria-hidden="true" icon={peopleOutline} />
            <IonLabel>Bekijk alle gebruikers</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon className='ion-margin-end' aria-hidden="true" icon={imagesOutline} />
            <IonLabel>Bekijk alle advertenties</IonLabel>
          </IonItem>
          {/* <IonItem button>
            <IonIcon className='ion-margin-end' aria-hidden="true" icon={constructOutline} />
            <IonLabel>Beheer categorie</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon className='ion-margin-end' aria-hidden="true" icon={constructOutline} />
            <IonLabel>Beheer materiaal</IonLabel>
          </IonItem> */}
        </IonList>
      </IonContent>
      {/* Nav */}
      <NavTabs />
    </IonPage>
  );
};

export default AdminListings;
