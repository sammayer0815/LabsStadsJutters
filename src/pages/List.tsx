import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./style.css";
import TestImage4 from "../assets/Frans-eiken-set-rotated.jpg";
import TestImage3 from "../assets/16912-20.jpg";
import { locationOutline } from "ionicons/icons";

// Install: npm install swiper@latest
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/react/css/ionic-swiper.css";
import NavTabs from "../components/Nav";
import { useLocation } from "react-router-dom";

import firebase, { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  getFirestore,
  limit,
  query,
} from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { config } from "../config/config";

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const List: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "Products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
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
            .filter((item) => item.name.startsWith(data.product_id))
            .map((item) => getDownloadURL(item))
        );
        setImages(imageUrls);
      };

      fetchImages();
    }
  }, [data]);

  console.log(images);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"secondary"} className="custom-toolbar" mode="ios">
          <IonButtons>
            <IonBackButton defaultHref="/home/lists" text=""></IonBackButton>
          </IonButtons>
          <IonTitle>Advertentie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-vertical">
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                zoom={true}
              >
                {images.map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <img alt={`Product Image ${index + 1}`} src={imageUrl} />
                  </SwiperSlide>
                ))}
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

              <p className="title-card">{data.title}</p>
              <div className="last-line-text">
                <div className="icon-address-date">
                  <IonIcon icon={locationOutline}></IonIcon>
                  {/* Address */}
                  <p className="date-style">
                    {data.location.display_name.split(",")[0]}
                  </p>
                </div>
                {/* Date */}
                <p className="date-style">
                  {data.created_at.toDate().toLocaleDateString()}
                </p>

                {/* Voorbeeld hoe je rest van data kan pakken: 
                beschrijving = data.description
                materiaal = data.material
                Als je de materiaal icon wilt  die staat in assets/material-icons. de data is zelfde als afb naam dus src=data.material + ".svg"
                conditie = data.condition
                
                */}
                
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

export default List;
