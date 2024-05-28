import { IonButton, IonContent, IonHeader, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './style.css';
import NavTabs from '../components/Nav';

const Map: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
            <IonTitle>Maak advertentie aan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Filter buttons */}
        <IonList className='ion-margin-top'>
          <IonItem lines="none" className='scroll'>
            <IonButton color={'dark'} fill='outline' className="fixed-width-button" >
              <IonSelect aria-label="Categorie" placeholder='Categorie' >
                <IonSelectOption value="<5km">&lt; 5km</IonSelectOption>
                <IonSelectOption value="<10km">&lt; 10km</IonSelectOption>
                <IonSelectOption value="<15km">&lt; 15km</IonSelectOption>
                <IonSelectOption value=">15km">&gt; 15km</IonSelectOption>
              </IonSelect>
            </IonButton>
            <IonButton color={'dark'} fill='outline' className="fixed-width-button">
              <IonSelect aria-label="materiaal" placeholder='Materiaal' >
                <IonSelectOption value="hout">Hout</IonSelectOption>
                <IonSelectOption value="metaal">Metaal</IonSelectOption>
                <IonSelectOption value="rest">Rest</IonSelectOption>
              </IonSelect>
            </IonButton>
            <IonButton color={'dark'} fill='outline' className="fixed-width-button">
              <IonSelect aria-label="conditie" placeholder='Conditie' >
                <IonSelectOption value="nieuw">Nieuw</IonSelectOption>
                <IonSelectOption value="zo-goed-als-nieuw">Zo goed als nieuw</IonSelectOption>
                <IonSelectOption value="gebruikt">Gebruikt</IonSelectOption>
                <IonSelectOption value="stuk">Stuk</IonSelectOption>
              </IonSelect>
            </IonButton>
          </IonItem>
        </IonList>

        {/* Map: Do NOT forget className='ion-margin-top'*/}
        Map

        {/* ??? */}
        {/* <ExploreContainer name="Map page" /> */}
      </IonContent>
    {/* Nav */}
    <NavTabs />
    </IonPage>
  );
};

export default Map;
