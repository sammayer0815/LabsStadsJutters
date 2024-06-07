import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonRow,
  IonCol,
  IonSearchbar,
} from "@ionic/react";
import {
  addCircleOutline,
  bookmarkOutline,
  callOutline,
  constructOutline,
  imageOutline,
  imagesOutline,
  informationCircleOutline,
  peopleOutline,
  personAddOutline,
  personOutline,
  settingsOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import NavTabs from "../components/Nav";
import "./AdminUsers.css";

import firebase, { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { config } from "../config/config";
import { useHistory } from "react-router-dom";

import { getAuth, deleteUser } from "firebase/auth";
import placeHolder from "../assets/placeholder-image.svg";
import { ref, getDownloadURL } from "firebase/storage";

const app = initializeApp(config.firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

const auth = getAuth();

const AdminListings: React.FC = () => {
  const [items, setItems] = useState([]);

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
            console.error(`No user document found with ID: ${product.user_id}`);
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
            condition: product.condition,
            username: user.username
          };
        })
      );

      setItems(items);
    };

    fetchData();
  }, []);

  const handleDelete = async (userId: any) => {
    const userRef = doc(db, 'Products', userId);
    await deleteDoc(userRef);
  };

  return (
    <IonPage>
       <IonHeader>
        <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
          <IonButtons>
            <IonBackButton defaultHref='profiel/admin' text=""></IonBackButton> 
          </IonButtons>
          <IonTitle>Bekijk alle advertentie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {items.map((product) => (
            <IonItem key={product.userId}>
              <IonAvatar slot="start">
                <img
                  src={product.imageUrl || placeHolder}
                  alt={product.title}
                />
              </IonAvatar>
              <IonLabel>
                <IonRow>{product.productName}</IonRow>
                <IonRow>{product.username}</IonRow>
              </IonLabel>
              <IonButton color={"danger"} slot="end" onClick={() => handleDelete(product.productFile)}>
                Delete
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      {/* Nav */}
      <NavTabs />
    </IonPage>
  );
};

export default AdminListings;
