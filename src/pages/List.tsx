import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './style.css';
import TestImage4 from '../assets/Frans-eiken-set-rotated.jpg';
import TestImage3 from '../assets/16912-20.jpg';
import { locationOutline } from 'ionicons/icons';

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
                                <img alt="Silhouette of mountains" src={TestImage4}   />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img alt="Silhouette of mountains" src={TestImage3}   />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img alt="Silhouette of mountains" src={TestImage4}  className='image-test' />
                            </SwiperSlide>
                        </Swiper>

                    
                        {/* <Swiper
                            modules={[FreeMode, Navigation, Thumbs]}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{
                                swiper:
                                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                            }}
                        > */}
                            {/* <SwiperSlide>
                                <img alt="Silhouette of mountains" src={TestImage4} width={'100%'} className='image-test' />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img alt="Silhouette of mountains" src={TestImage3} width={'100%'} className='image-test' />
                                </SwiperSlide>
                            <SwiperSlide>
                                <img alt="Silhouette of mountains" src={TestImage4} width={'100%'} className='image-test' />
                                </SwiperSlide>
                        </Swiper> */}

                                    
                     
                                                <p className='title-card'>Daniel</p>
                                                <div className='last-line-text'>
                                                    <div className='icon-address-date'>
                                                        <IonIcon icon={locationOutline}></IonIcon>
                                                        {/* Address */}
                                                        <p className='date-style'>Almere</p>
                                                    </div>
                                                    {/* Date */}
                                                    <p className='date-style'>vandaag</p>
                                                </div>
                    
                        </IonCol>
                    </IonRow>
            </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default List;