import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { bookmarkOutline, callOutline, imageOutline, informationCircleOutline, personAddOutline, personOutline, settingsOutline } from 'ionicons/icons';
import React from 'react';
import NavTabs from '../components/Nav';
import { useHistory } from 'react-router-dom';
import './style.css';

const Profile: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonTitle>Profiel</IonTitle>
                    <IonButtons slot='end' onClick={() => history.push('/profiel/instellingen')}>
                        <IonButton slot='end' >
                            <IonIcon aria-hidden="true" icon={settingsOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList className='list-profile'>
                    <IonItem button onClick={() => history.push('/profiel/opgeslagen-advertenties')}>
                        <IonIcon className='ion-margin-end' aria-hidden="true" icon={bookmarkOutline} />
                        <IonLabel>Opgeslagen advertenties</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => history.push('/profiel/mijn-advertenties')}>
                        <IonIcon className='ion-margin-end' aria-hidden="true" icon={imageOutline} />
                        <IonLabel>Mijn advertenties</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => history.push('/profiel/contact')}>
                        <IonIcon className='ion-margin-end'  aria-hidden="true" icon={callOutline} />
                        <IonLabel>Contact</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => history.push('/profiel/over-ons')}>
                        <IonIcon className='ion-margin-end'  aria-hidden="true" icon={informationCircleOutline} />
                        <IonLabel>Over ons</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => history.push('/profiel/admin')}>
                        <IonIcon className='ion-margin-end'  aria-hidden="true" icon={personOutline} />
                        <IonLabel>Admin</IonLabel>
                    </IonItem>
                    <IonButton className='ion-margin-top' mode='ios'>Uitloggen</IonButton>
                </IonList>
            </IonContent>
            {/* Nav */}
            <NavTabs />
        </IonPage>
    );
};

export default Profile;