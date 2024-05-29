import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './style.css';
import TestImage4 from '../assets/Frans-eiken-set-rotated.jpg';
import TestImage3 from '../assets/16912-20.jpg';
import { chatbubbleEllipsesOutline, locationOutline, personOutline } from 'ionicons/icons';

// Install: npm install swiper@latest
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';



const List: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonButtons>
                        <IonBackButton defaultHref='/home/lists' text=""></IonBackButton> 
                    </IonButtons>
                    <IonTitle>Advertentie</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding-vertical'>
                <IonGrid fixed>
                    {/* Slide show with SwiperJS */}
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <Swiper
                                modules={[Pagination, Navigation]}
                                pagination={{
                                type: 'fraction',
                                }}
                                navigation={true}
                                zoom={true}
                                
                            >
                                <SwiperSlide>
                                    <img alt="Silhouette of mountains" src={TestImage4} />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img alt="Silhouette of mountains" src={TestImage3} />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img alt="Silhouette of mountains" src={TestImage4}  className='image-test' />
                                </SwiperSlide>
                            </Swiper>
                        </IonCol>
                    </IonRow>
                    {/* Short info and message button */}
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <div className='flex-listing-info'>
                                {/* Title List */}
                                <p className='title-listing ion-margin-top'>Houten tafel 80x80</p>
                                {/* Place and icon */}
                                <p className='icon-address-name ion-no-margin' >
                                    <IonIcon icon={locationOutline}></IonIcon>
                                    Almere
                                </p>
                                {/* Name and date */}
                                <div className='last-line-text'>
                                    <p className='icon-address-name ion-no-margin'>
                                        <IonIcon icon={personOutline}></IonIcon>
                                        Sadek
                                    </p>
                                    <p className='date-style ion-no-margin'>vandaag</p>
                                </div>
                            </div>
                            
                            {/* Message btn */}
                            <IonButton className='ion-margin-top' mode='ios' expand='block'>
                                Stuur bericht
                                <IonIcon icon={chatbubbleEllipsesOutline} className='ion-margin-start'></IonIcon>
                            </IonButton>

                            {/* Edit and delete listing */}
                            {/* <div className='edit-delete-btn ion-margin-top'>
                                <IonButton mode='ios' expand='block'>
                                    Advertentie aanpassen
                                </IonButton>
                                <IonButton  mode='ios' expand='block' color={'danger'}>
                                    Verwijderen
                                </IonButton>
                            </div> */}
                        </IonCol>
                    </IonRow>
                    {/* Description */}
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4" className=''>
                            <p className='title-card'>Beschrijving</p> 
                            <p className='date-style ion-no-margin'>
                                Deze prachtige houten tafel heeft door de jaren heen 
                                geleefd en draagt de sporen van zijn verleden met trots. 
                                Hoewel het oppervlak enkele kleine krassen, deukjes en 
                                vlekken vertoont, voegt dit alleen maar karakter toe aan 
                                zijn uitstraling.
                            </p>
                        </IonCol>
                    </IonRow>
                    {/* Characteristics listing object */}
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            {/* Title List */}
                            <p className='title-card'>Eigenschappen</p> 

                            {/* Material */}
                            <div className='last-line-text'>
                                <p className='date-style ion-no-margin'>Materiaal:</p>
                                <p className='date-style ion-no-margin'>Hout</p>
                            </div>
                            {/* Category */}
                            <div className='last-line-text'>
                                <p className='date-style ion-no-margin'>Categorie:</p>
                                <p className='date-style ion-no-margin'>Tafel</p>
                            </div>
                            {/* Condition */}
                            <div className='last-line-text'>
                                <p className='date-style ion-no-margin'>Conditie:</p>
                                <p className='date-style ion-no-margin'>Gebruikt</p>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default List;