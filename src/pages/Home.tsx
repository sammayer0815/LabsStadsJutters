import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonSegment, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import './style.css';
import { locationOutline } from 'ionicons/icons';
import TestImage3 from '../assets/16912-20.jpg';
import TestImage1 from '../assets/image 56.svg';
import TestImage2 from '../assets/image 58.svg';
import TestImage4 from '../assets/Frans-eiken-set-rotated.jpg';
import NavTabs from '../components/Nav';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const history = useHistory();

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

    const handleCardClick = (user: any) => {
        // history.push(`/lists/${user.name.first}`);
        history.push(`/home/lists/list`);
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
                            <p className='category-title'>Categorie</p>
                                <div className="category-section">
                                    <div className='div-category'>
                                        <img alt="Silhouette of mountains" src={TestImage1} width={'100%'} className='image-category' />
                                    </div>
                                    <div className='div-category'>
                                        <img alt="Silhouette of mountains" src={TestImage2} width={'100%'} className='image-category' />
                                    </div>
                                    <div className='div-category'>
                                        <img alt="Silhouette of mountains" src={TestImage3} width={'100%'} className='image-category' />
                                    </div>
                                    <div className='div-category'>
                                        <img alt="Silhouette of mountains" src={TestImage3} width={'100%'} className='image-category' />
                                    </div>
                                    <div className='div-category'>
                                        <img alt="Silhouette of mountains" src={TestImage3} width={'100%'} className='image-category' />
                                    </div>
                                    <div className='div-category'>
                                        <img alt="Silhouette of mountains" src={TestImage3} width={'100%'} className='image-category' />
                                    </div>
                                    <div className='div-category'>
                                        <img alt="Silhouette of mountains" src={TestImage3} width={'100%'} className='image-category' />
                                    </div>
                                    <div className='div-category'>
                                        <img alt="Silhouette of mountains" src={TestImage3} width={'100%'} className='image-category' />
                                    </div>
                                </div>
                        </IonCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <p className='card-titles'>Onlangs geüpload</p>
                            <div className='cards-section'>
                                {users.map((user, index) => (
                                <IonCard key={index} className="scroll-card" mode='ios' button onClick={() => handleCardClick(user)}>
                                    <img alt="Silhouette of mountains" src={TestImage4} width={'100%'} className='image-test' />
                                    <IonCardContent className="ion-no-padding">
                                        <IonItem lines="none">
                                            <IonLabel>
                                                <p className='title-card'>{user.name.first} {user.name.last}</p>
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
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <p className='card-titles'>Lokale advertenties</p>
                            <div className='cards-section'>
                                {users.map((user, index) => (
                                <IonCard key={index} className="scroll-card" mode='ios'>
                                    <img alt="Silhouette of mountains" src={TestImage4} width={'100%'} className='image-test' />
                                    <IonCardContent className="ion-no-padding">
                                        <IonItem lines="none">
                                            <IonLabel>
                                                <p className='title-card'>{user.name.first} {user.name.last}</p>
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
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            {/* Nav */}
            <NavTabs />
        </IonPage>
    );
};

export default Home;