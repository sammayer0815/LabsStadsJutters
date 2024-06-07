import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonModal,
  IonImg
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './style.css';
import { chatbubbleEllipsesOutline, locationOutline, personOutline } from 'ionicons/icons';
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
import NavTabs from '../components/Nav';
import { useLocation } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { config } from "../config/config";

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const List: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [username, setUsername] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // New state for selected image
    const currentUserId = "TfHL4seqQeOVmdl9eYE2IsNsQSR2"; // Assume this is the logged-in user's ID

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "Products", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const productData = docSnap.data();
                setData(productData);

                // Fetch the user document based on user_id
                const userRef = doc(db, "users", productData.user_id);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUsername(userSnap.data().username);
                } else {
                    console.log("No such user document!");
                }
            } else {
                console.log("No such document!");
            }
            setLoading(false);
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (data) {
            const fetchImages = async () => {
                const imagesRef = ref(storage, "/product-images");
                const imagesRes = await listAll(imagesRef);
                const imageUrls = await Promise.all(
                    imagesRes.items
                        .filter((item) => item.name.startsWith(data.product_id.toString()))
                        .map((item) => getDownloadURL(item))
                );
                setImages(imageUrls);
            };

            fetchImages();
        }
    }, [data]);

    const handleSendMessage = async () => {
        if (data) {
            const messageData = {
                listingId: id,
                receiverId: data.user_id,
                senderId: currentUserId,
                timestamp: new Date(),
            };

            try {
                await addDoc(collection(db, "messages"), messageData);
                console.log("Message sent!");
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                className="swiper"
                            >
                                {images.map((imageUrl, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            alt={`Product Image ${index + 1}`}
                                            src={imageUrl}
                                            onClick={() => handleImageClick(imageUrl)} // Click handler for image
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </IonCol>
                    </IonRow>
                    {/* Short info and message button */}
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <div className='flex-listing-info'>
                                {/* Title List */}
                                <p className='title-listing ion-margin-top'>{data.title}</p>
                                {/* Place and icon */}
                                <p className='icon-address-name ion-no-margin'>
                                    <IonIcon icon={locationOutline}></IonIcon>
                                    {data.location.display_name.split(",")[0]}
                                </p>
                                {/* Name and date */}
                                <div className='last-line-text'>
                                    <p className='icon-address-name ion-no-margin'>
                                        <IonIcon icon={personOutline}></IonIcon>
                                        {username}
                                    </p>
                                    <p className='date-style ion-no-margin'>{new Date(data.created_at.seconds * 1000).toLocaleDateString()}</p>
                                </div>
                            </div>
                            {/* Message btn */}
                            <IonButton className='ion-margin-top' mode='ios' expand='block' onClick={handleSendMessage}>
                                Stuur bericht
                                <IonIcon icon={chatbubbleEllipsesOutline} className='ion-margin-start'></IonIcon>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    {/* Description */}
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <p className='title-card'>Beschrijving</p>
                            <p className='date-style ion-no-margin'>{data.description}</p>
                        </IonCol>
                    </IonRow>
                    {/* Characteristics listing object */}
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <p className='title-card'>Eigenschappen</p>
                            <div className='last-line-text'>
                                <p className='date-style ion-no-margin'>Materiaal:</p>
                                <p className='date-style ion-no-margin'>{data.material}</p>
                            </div>
                            <div className='last-line-text'>
                                <p className='date-style ion-no-margin'>Categorie:</p>
                                <p className='date-style ion-no-margin'>Tafel</p> {/* Assuming category is "Tafel" */}
                            </div>
                            <div className='last-line-text'>
                                <p className='date-style ion-no-margin'>Conditie:</p>
                                <p className='date-style ion-no-margin'>{data.condition}</p>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            {/* Nav */}
            <NavTabs />
            {/* Image Modal */}
            <IonModal isOpen={!!selectedImage} onDidDismiss={closeModal}>
                <IonContent className="ion-padding">
                    <IonImg src={selectedImage || ''} />
                    <IonButton expand="block" onClick={closeModal}>
                        Close
                    </IonButton>
                </IonContent>
            </IonModal>
        </IonPage>
    );
};

export default List;
