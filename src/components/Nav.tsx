import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { addCircleOutline, chatbubbleEllipsesOutline, homeOutline, mapOutline, personOutline } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route, useLocation } from 'react-router';


const Nav: React.FC = () => {
    return (
        <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true" icon={homeOutline} />
                <IonLabel>Home</IonLabel>
            </IonTabButton>
        
            <IonTabButton tab="map" href="/map">
                <IonIcon aria-hidden="true" icon={mapOutline} />
                <IonLabel>Map</IonLabel>
            </IonTabButton>
        
            <IonTabButton tab="post" href="/post">
                <IonIcon aria-hidden="true" icon={addCircleOutline} />
                <IonLabel>Post</IonLabel>
            </IonTabButton>
        
            <IonTabButton tab="message" href="/berichten">
                <IonIcon aria-hidden="true" icon={chatbubbleEllipsesOutline} />
                <IonLabel>Berichten</IonLabel>
            </IonTabButton>
        
            <IonTabButton tab="profile" href="/profiel">
                <IonIcon aria-hidden="true" icon={personOutline} />
                <IonLabel>Profiel</IonLabel>
            </IonTabButton>
        </IonTabBar>
    );
};

export default Nav;