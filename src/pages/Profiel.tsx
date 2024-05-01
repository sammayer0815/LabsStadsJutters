import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Profiel.css";
import { IonItem, IonLabel, IonList, IonIcon } from "@ionic/react";
import { bookmarkOutline} from "ionicons/icons";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines="none">
          <IonItem className="profiel-link-item profiel-link-item-first">
            <IonIcon aria-hidden="true" icon={bookmarkOutline} slot="start"></IonIcon>
            <IonLabel>Opgeslagen advertenties</IonLabel>
          </IonItem>
          <IonItem className="profiel-link-item">
            <IonLabel>Mijn advertenties</IonLabel>
          </IonItem>
          <IonItem className="profiel-link-item">
            <IonLabel>Contact</IonLabel>
          </IonItem>
          <IonItem className="profiel-link-item">
            <IonLabel>Over ons</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
