import {
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
} from "@ionic/react";
import {
  bookmarkOutline,
  callOutline,
  imageOutline,
  informationCircleOutline,
  personAddOutline,
  personOutline,
  settingsOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import NavTabs from "../components/Nav";
import "./style.css";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Profile: React.FC = () => {
  const history = useHistory();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Redirect to the login page or any other desired route
      history.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (userId) {
        const db = getFirestore();
        const userDoc = doc(db, "users", userId);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
          setIsAdmin(userSnap.data().role === "admin");
        }
      }
    };

    fetchUserRole();
  }, [userId]);

  console.log(isAdmin);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"secondary"} className="custom-toolbar" mode="ios">
          <IonTitle>Profiel</IonTitle>
          <IonButtons
            slot="end"
            onClick={() => history.push("/profiel/instellingen")}
          >
            <IonButton slot="end">
              <IonIcon aria-hidden="true" icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className="list-profile">
          <IonItem
            button
            onClick={() => history.push("/profiel/opgeslagen-advertenties")}
          >
            <IonIcon
              className="ion-margin-end"
              aria-hidden="true"
              icon={bookmarkOutline}
            />
            <IonLabel>Opgeslagen advertenties</IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={() => history.push("/profiel/mijn-advertenties")}
          >
            <IonIcon
              className="ion-margin-end"
              aria-hidden="true"
              icon={imageOutline}
            />
            <IonLabel>Mijn advertenties</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/profiel/contact")}>
            <IonIcon
              className="ion-margin-end"
              aria-hidden="true"
              icon={callOutline}
            />
            <IonLabel>Contact</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/profiel/over-ons")}>
            <IonIcon
              className="ion-margin-end"
              aria-hidden="true"
              icon={informationCircleOutline}
            />
            <IonLabel>Over ons</IonLabel>
          </IonItem>
          {isAdmin && (
            <IonItem button onClick={() => history.push("/profiel/admin")}>
              <IonIcon
                className="ion-margin-end"
                aria-hidden="true"
                icon={personOutline}
              />
              <IonLabel>Admin</IonLabel>
            </IonItem>
          )}
          {/* Logout Button */}
          <IonButton
            className="ion-margin-top"
            mode="ios"
            onClick={handleLogout}
          >
            Uitloggen
          </IonButton>
        </IonList>
      </IonContent>
      {/* Nav */}
      <NavTabs />
    </IonPage>
  );
};

export default Profile;
