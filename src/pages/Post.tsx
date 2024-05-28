import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import NavTabs from '../components/Nav';
import './style.css';


const Post: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonTitle>Maak advertentie aan</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                Post
            </IonContent>
            {/* Nav */}
            <NavTabs />
        </IonPage>
    );
};

export default Post;