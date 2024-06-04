import {
  IonAvatar,
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

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const Home: React.FC = () => {
  //   const [loading, setLoading] = useState<boolean>(true);
  //   const [users, setUsers] = useState<any[]>([]);
  //   const [selectedUser, setSelectedUser] = useState<any>(null);
  const history = useHistory();
  const [items, setItems] = useState([]);

  //   useIonViewWillEnter(async () => {
  //     const users = await getUsers();
  //     console.log("🚀 ~ file: List.tsx:10 ~ useIonViewWillEnter ~ users:", users);
  //     setUsers(users);
  //     setLoading(false);
  //   });

  //   const getUsers = async () => {
  //     const data = await fetch("https://randomuser.me/api?results=10");
  //     const users = await data.json();
  //     return users.results;
  //   };

  const handleCardClick = (item: any) => {
    // history.push(`/lists/${user.name.first}`);
    history.push(`/home/lists/list?id=${item.productFile}`);
  };

  const handleButtonClick = () => {
    history.push('/home/lists');
  };

  useEffect(() => {
    const fetchData = async () => {
      const productsCollection = collection(db, "Products");
      const q = query(productsCollection, limit(10)); // Limit to 10 documents
      const productData = await getDocs(q);

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
            console.error(`No user document found with ID: ${product.user_id}`);
            return;
          }
          const user = userData.data();
          console.log("test");
          return {
            ...product,
            productName: product.title,
            imageUrl: imageUrlData,
            date: product.created_at.toDate().toLocaleDateString(),
            address: product.location.display_name.split(",")[0],
            productFile: product.id,
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
              <p className="category-title">Categorie</p>
              <div className="category-section">
                <div className="div-category">
                  <img
                    alt="Silhouette of mountains"
                    src={"/src/assets/material-icons/hout.svg"}
                    width={"100%"}
                    className="image-category"
                  />
                </div>
                <div className="div-category">
                  <img
                    alt="Silhouette of mountains"
                    src={"src/assets/material-icons/metaal.svg"}
                    width={"100%"}
                    className="image-category"
                  />
                </div>
                <div className="div-category">
                  <img
                    alt="Silhouette of mountains"
                    src={"src/assets/material-icons/plastic.svg"}
                    width={"100%"}
                    className="image-category"
                  />
                </div>
                <div className="div-category">
                  <img
                    alt="Silhouette of mountains"
                    src={"src/assets/material-icons/glas.svg"}
                    width={"100%"}
                    className="image-category"
                  />
                </div>
                <div className="div-category">
                  <img
                    alt="Silhouette of mountains"
                    src={"src/assets/material-icons/overig.svg"}
                    width={"100%"}
                    className="image-category"
                  />
                </div>
              </div>
            </IonCol>
          </IonRow>

          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <p className="card-titles">Onlangs geüpload</p>
              <div className="cards-section">
                {items.map((item, index) => (
                  <IonCard
                    key={index}
                    className="scroll-card"
                    mode="ios"
                    button
                    onClick={() => handleCardClick(item)}
                  >
                    <img
                      alt="Product image"
                      src={item.imageUrl}
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
              </div>
            </IonCol>
          </IonRow>

          <IonButton
            type="submit"
            className="ion-margin-top"
            expand="block"
            color={"secondary"}
            onClick={handleButtonClick}
          >
            Zie alle advertenties
          </IonButton>

          {/* <IonRow class="ion-justify-content-center">
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
                                                        <IonIcon icon={locationOutline}></IonIcon> */}
          {/* Address */}
          {/* <p className='date-style'>{user.name.first}</p>
                                                    </div> */}
          {/* Date */}
          {/* <p className='date-style'>{user.name.last}</p>
                                                </div>
                                            </IonLabel>
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                                ))}
                            </div>
                        </IonCol>
                    </IonRow> */}
        </IonGrid>
      </IonContent>
      {/* Nav */}
      <NavTabs />
    </IonPage>
  );
};

export default Home;
