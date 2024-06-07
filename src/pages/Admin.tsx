import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addCircleOutline, bookmarkOutline, callOutline, constructOutline, imageOutline, imagesOutline, informationCircleOutline, peopleOutline, personAddOutline, personOutline, settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import NavTabs from '../components/Nav';
import './style.css';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Redirect } from 'react-router-dom';

const Admin: React.FC = () => {

  const history = useHistory();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (userId) {
        const db = getFirestore();
        const userDoc = doc(db, 'users', userId);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
          setIsAdmin(userSnap.data().role === 'admin');
        }
      }
    };

    fetchUserRole();
  }, [userId]);

  return (
    <>
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
        <IonItem button onClick={() => history.push('/profiel/admin/users')}>
            <IonIcon className='ion-margin-end' aria-hidden="true" icon={peopleOutline} />
            <IonLabel>Bekijk alle gebruikers</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push('/profiel/admin/listings')}>
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
    </>
  );
};



export default Admin;
