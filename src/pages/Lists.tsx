import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonSegment, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import './style.css'
import { locationOutline } from 'ionicons/icons';
import TestImage3 from '../assets/16912-20.jpg'

const Lists: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    useIonViewWillEnter(async () => {
        const users = await getUsers();
        console.log('🚀 ~ file: List.tsx:10 ~ useIonViewWillEnter ~ users:', users);
        setUsers(users);
        setLoading(false);
    });

    const getUsers = async () => {
        const data = await fetch('https://randomuser.me/api?results=10');
        const users = await data.json();
        return users.results;
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    
                </IonToolbar>
                <IonToolbar color={'secondary'}>
                    <IonSearchbar className='radius-searchbar' color="light" placeholder='Zoek product...'></IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid fixed>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            
                                <IonList >
                                    <IonItem lines="none" className='scroll'>
                                            <IonButton color={'dark'} fill='outline' className="fixed-width-button">
                                                <IonSelect aria-label="materiaal" placeholder='Materiaal' >
                                                    <IonSelectOption value="hout">Hout</IonSelectOption>
                                                    <IonSelectOption value="metaal">Metaal</IonSelectOption>
                                                    <IonSelectOption value="rest">Rest</IonSelectOption>
                                                </IonSelect>
                                            </IonButton>
                                            <IonButton color={'dark'} fill='outline' className="fixed-width-button">
                                                <IonSelect aria-label="conditie" placeholder='Conditie' >
                                                    <IonSelectOption value="nieuw">Nieuw</IonSelectOption>
                                                    <IonSelectOption value="zo-goed-als-nieuw">Zo goed als nieuw</IonSelectOption>
                                                    <IonSelectOption value="gebruikt">Gebruikt</IonSelectOption>
                                                    <IonSelectOption value="stuk">Stuk</IonSelectOption>
                                                </IonSelect>
                                            </IonButton>
                                            <IonButton color={'dark'} fill='outline' className="fixed-width-button" >
                                                <IonSelect aria-label="afstand" placeholder='Afstand' >
                                                    <IonSelectOption value="<5km">&lt; 5km</IonSelectOption>
                                                    <IonSelectOption value="<10km">&lt; 10km</IonSelectOption>
                                                    <IonSelectOption value="<15km">&lt; 15km</IonSelectOption>
                                                    <IonSelectOption value=">15km">&gt; 15km</IonSelectOption>
                                                </IonSelect>
                                            </IonButton>
                                    </IonItem>
                                </IonList>
                            
                        </IonCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <hr />
                            {users.map((user, index) => (
                                <IonCard key={index} mode='ios'>
                                    <img alt="Silhouette of mountains" src={TestImage3} width={'100%'} className='image-test' />
                                    <IonCardContent className="ion-no-padding">
                                        <IonItem lines="none">
                                            <IonLabel>
                                                <h1>{user.name.first} {user.name.last}</h1>
                                                <div className='last-line-text'>
                                                    <div className='icon-address-date'>
                                                        <IonIcon icon={locationOutline}></IonIcon>
                                                        {/* Address */}
                                                        <p className='date-style'>{user.name.first}</p>
                                                    </div>
                                                    {/* Date */}
                                                    <p className='date-style'>{user.name.last}</p>
                                                </div>
                                            </IonLabel>
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            ))}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Lists;