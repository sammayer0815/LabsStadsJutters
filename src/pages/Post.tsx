import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import React, { useState } from "react";
import NavTabs from "../components/Nav";
import "./style.css";

import axios from "axios";
import { config } from "../config/config";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  Timestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useUserId } from "../components/AuthRoute";
import { getAuth } from "firebase/auth";
import postPlusImage from "../assets/post-plus-image.svg"; // Adjust the path as needed
import "./Post.css";
import { useHistory } from "react-router-dom";

const app = initializeApp(config.firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

const counterRef = doc(db, "counters", "products");

const Post: React.FC = () => {
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState("");
  const [material, setMaterial] = useState("");
  const [streetName, setStreetName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const userId = getAuth().currentUser?.uid;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    

    // Get the current counter value
    const counterSnap = await getDoc(counterRef);
    const counter = counterSnap.exists() ? counterSnap.data().count : 0;
    const fileInputs = document.querySelectorAll('input[type="file"]');

    // Increment the counter
    await updateDoc(counterRef, { count: increment(1) });

    const response = await axios.get(
      `https://geocode.maps.co/search?q=${streetName}&api_key=${config.geocodeConfig.apiKey}`
    );
    const location = response.data;

    console.log(streetName)
  
    if (!location[0].display_name.includes('Netherlands')) {
      console.log('Post failed: location does not contain "Netherlands".');
      return;
    }
  

    if (location.length > 0) {
      let fileInputIndex = 0;

      fileInputs.forEach((fileInput: HTMLInputElement) => {
        const images = fileInput.files;

        if (!images) {
          return;
        }

        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `product-images/${counter + 1}-${fileInputIndex}`
          );
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.error(error);
            }
          );
        }

        fileInputIndex++;
      });

      // Save data to Firestore
      const postsCollection = collection(db, "Products");
      const newPostRef = doc(postsCollection);

      await setDoc(newPostRef, {
        product_id: counter + 1,
        user_id: userId,
        title: title,
        condition: condition,
        material: material,
        streetName: streetName,
        description: description,
        location: location[0],
        created_at: Timestamp.now(),
      });

      history.push('/home/lists');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"secondary"} className="custom-toolbar" mode="ios">
          <IonTitle>Maak advertentie aan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem
            lines="none"
            className="ion-margin-bottom custom-file-upload-flex"
          >
            <label htmlFor="file-upload-1" className="custom-file-upload">
              <img src={postPlusImage} alt="Upload" />
            </label>
            <input id="file-upload-1" type="file" style={{ display: "none" }} />
            <label htmlFor="file-upload-2" className="custom-file-upload-small">
              <img src={postPlusImage} alt="Upload" />
            </label>
            <input id="file-upload-2" type="file" style={{ display: "none" }} />
            <label htmlFor="file-upload-3" className="custom-file-upload-small">
              <img src={postPlusImage} alt="Upload" />
            </label>
            <input id="file-upload-3" type="file" style={{ display: "none" }} />
            <label htmlFor="file-upload-4" className="custom-file-upload-small">
              <img src={postPlusImage} alt="Upload" />
            </label>
            <input id="file-upload-4" type="file" style={{ display: "none" }} />
            <label htmlFor="file-upload-5" className="custom-file-upload-small">
              <img src={postPlusImage} alt="Upload" />
            </label>
            <input id="file-upload-5" type="file" style={{ display: "none" }} />
            <label htmlFor="file-upload-6" className="custom-file-upload-small">
              <img src={postPlusImage} alt="Upload" />
            </label>
            <input id="file-upload-6" type="file" style={{ display: "none" }} />
          </IonItem>

          <IonLabel>Titel</IonLabel>
          <IonInput
            className="ion-margin-top ion-margin-bottom register-input"
            fill="outline"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
          <IonLabel>Conditie</IonLabel>
          <IonSelect
            className="ion-margin-top ion-margin-bottom register-input"
            fill="outline"
            label="Kies conditie"
            value={condition}
            onIonChange={(e) => setCondition(e.detail.value)}
          >
            <IonSelectOption value="nieuw">Nieuw</IonSelectOption>
            <IonSelectOption value="zo-goed-als-nieuw">
              Zo goed als nieuw
            </IonSelectOption>
            <IonSelectOption value="gebruikt">Gebruikt</IonSelectOption>
            <IonSelectOption value="stuk">Stuk</IonSelectOption>
          </IonSelect>

          <IonLabel>Materiaal</IonLabel>
          <IonSelect
            className="ion-margin-top ion-margin-bottom register-input"
            fill="outline"
            label="Kies materiaal"
            value={material}
            onIonChange={(e) => setMaterial(e.detail.value)}
          >
                <IonSelectOption value="hout">Hout</IonSelectOption>
                <IonSelectOption value="metaal">Metaal</IonSelectOption>
                <IonSelectOption value="plastic">Plastic</IonSelectOption>
                <IonSelectOption value="glas">Glas</IonSelectOption>
                <IonSelectOption value="overig">Overig</IonSelectOption>
          </IonSelect>

          <IonLabel>Straatnaam</IonLabel>
          <IonInput
            className="ion-margin-top ion-margin-bottom register-input"
            fill="outline"
            placeholder="Straatnaam (Zonder huisnummer)"
            value={streetName}
            onIonChange={(e) => setStreetName(e.detail.value!)}
          />

          <IonLabel>Beschrijving</IonLabel>
          <IonTextarea
            className="ion-margin-top ion-margin-bottom register-input"
            fill="outline"
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
          <IonButton
            type="submit"
            className="ion-margin-top"
            expand="block"
            color={"secondary"}
          >
            Plaats advertentie
          </IonButton>
        </form>
      </IonContent>
      {/* Nav */}
      <NavTabs />
    </IonPage>
  );
};

export default Post;
