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
import "./style.css";

import firebase, { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { config } from "../config/config";
import { useHistory } from "react-router-dom";

import { getAuth, deleteUser } from "firebase/auth";
import placeHolder from "../assets/profile-place-holder.jpg";

const app = initializeApp(config.firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

const auth = getAuth();

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => doc.data());
      setUsers(userList);

      console.log(userList);
    };

    fetchUsers();
  }, []);

  const handlePromote = async (userId: any) => {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { role: "admin" }, { merge: true });
  };

  const handleDemote = async (userId: any) => {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { role: null }, { merge: true });
  };

  const handleDelete = async (userId: any) => {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
  };

  return (
    <IonPage>
      <IonHeader>{/* ... */}</IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {users.map((user) => (
            <IonItem key={user.userId}>
              <IonAvatar slot="start">
                <img
                  src={user.profilePicture || placeHolder}
                  alt={user.username}
                />
              </IonAvatar>
              <IonLabel>
                <IonRow>{user.username}</IonRow>
                <IonRow>{user.email}</IonRow>
              </IonLabel>
              {user.role !== "admin" ? (
                <IonButton
                  slot="end"
                  onClick={() => handlePromote(user.userId)}
                >
                  Promote
                </IonButton>
              ) : (
                <IonButton slot="end" onClick={() => handleDemote(user.userId)}>
                  Demote
                </IonButton>
              )}
              <IonButton slot="end" onClick={() => handleDelete(user.userId)}>
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

export default AdminUsers;
