import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./style.css";
import { locationOutline } from "ionicons/icons";
import TestImage3 from "../assets/16912-20.jpg";
import NavTabs from "../components/Nav";
import { useHistory } from "react-router-dom";

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
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { config } from "../config/config";

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const Lists: React.FC = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  // Function for card click
  const handleCardClick = (item: any) => {
    // history.push(`/lists/${user.name.first}`);
    history.push(`/home/lists/list?id=${item.productFile}`);
  };

  const handleButtonClick = () => {
    history.push("/home/lists");
  };

  useEffect(() => {
    const fetchData = async () => {
      const productsCollection = collection(db, "Products");
      const productData = await getDocs(productsCollection);

      const items = await Promise.all(
        productData.docs.map(async (productDoc: any) => {
          const product = { ...productDoc.data(), id: productDoc.id };

          // Fetch the user
          const userDocRef = doc(db, "users", product.user_id);
          const userDoc = getDoc(userDocRef);

          // Fetch the image
          const storage = getStorage();
          const imagePath = `product-images/${product.product_id}-0`;
          const imageRef = ref(storage, imagePath);
          const imageUrl = getDownloadURL(imageRef);

          // Wait for both promises to resolve
          const [userData, imageUrlData] = await Promise.all([
            userDoc,
            imageUrl,
          ]);

          if (!userData.exists()) {
            // User doesn't exist error
            //console.error(`Geen gebruiker gevonden met id: ${product.user_id}`);
            return;
          }
          const user = userData.data();

          return {
            ...product,
            productName: product.title,
            imageUrl: imageUrlData,
            date: product.created_at.toDate().toLocaleDateString(),
            address: product.location.display_name.split(",")[0],
            productFile: product.id,
            material: product.material,
            condition: product.condition
          };
        })
      );

      setItems(items);
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"secondary"}></IonToolbar>
        <IonToolbar color={"secondary"}>
          <IonSearchbar
            className="radius-searchbar"
            color="light"
            placeholder="Zoek product..."
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonList className="filer-list-flex">
                <IonItem lines="none" className="scroll" >
                    <div className="filer-btn-gap">
                        <IonButton
                            color={"dark"}
                            fill="outline"
                            className="fixed-width-button"
                        >
                            <IonSelect
                            aria-label="materiaal"
                            placeholder="Materiaal"
                            onIonChange={(e) => setSelectedMaterial(e.detail.value)}
                            >
                            <IonSelectOption value="hout">Hout</IonSelectOption>
                            <IonSelectOption value="metaal">Metaal</IonSelectOption>
                            <IonSelectOption value="plastic">Plastic</IonSelectOption>
                            <IonSelectOption value="glas">Glas</IonSelectOption>
                            <IonSelectOption value="overig">Overig</IonSelectOption>
                            </IonSelect>
                        </IonButton>
                        <IonButton
                            color={"dark"}
                            fill="outline"
                            className="fixed-width-button"
                        >
                            <IonSelect
                            aria-label="conditie"
                            placeholder="Conditie"
                            onIonChange={(e) => setSelectedCondition(e.detail.value)}
                            >
                            <IonSelectOption value="nieuw">Nieuw</IonSelectOption>
                            <IonSelectOption value="zo-goed-als-nieuw">
                                Zo goed als nieuw
                            </IonSelectOption>
                            <IonSelectOption value="gebruikt">
                                Gebruikt
                            </IonSelectOption>
                            <IonSelectOption value="stuk">Stuk</IonSelectOption>
                            </IonSelect>
                        </IonButton>
                    </div>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <hr />
              {items
                .filter((item) => {
                  // Filter items based on selected options
                  if (
                    selectedCondition &&
                    item.condition !== selectedCondition
                  ) {
                    return false;
                  }
                  if (selectedMaterial && item.material !== selectedMaterial) {
                    return false;
                  }
                  return true;
                })
                .map((item, index) => (
                  <IonCard
                    key={index}
                    mode="ios"
                    button
                    onClick={() => handleCardClick(item)}
                  >
                    <img
                      alt="Silhouette of mountains"
                      src={TestImage3}
                      width={"100%"}
                      className="image-test"
                    />
                    <IonCardContent className="ion-no-padding">
                      <IonItem lines="none">
                        <IonLabel>
                          <p className="title-card">{item.productName}</p>
                          <div className="last-line-text">
                            <div className="icon-address-date">
                              <IonIcon icon={locationOutline}></IonIcon>
                              {/* Address */}
                              <p className="date-style">{item.address}</p>
                            </div>
                            {/* Date */}
                            <p className="date-style">{item.date}</p>
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
      {/* Nav */}
      <NavTabs />
    </IonPage>
  );
};

export default Lists;
