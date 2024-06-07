import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./style.css";
import NavTabs from "../components/Nav";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useIonViewDidEnter } from "@ionic/react";

import { useEffect, useState } from "react";
import firebase, { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { config } from "../config/config";
import { useHistory } from "react-router-dom";

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const fetchData = async () => {
  const productsCollection = collection(db, "Products");
  const data = await getDocs(productsCollection);
  return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
};

let itemsPromise = fetchData();

const Map: React.FC = () => {
  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event("resize"));
  });

  const [items, setItems] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  useEffect(() => {
    itemsPromise.then((items) => {
      setItems(items);
      console.log(items);
    });
  }, []);

  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"secondary"} className="custom-toolbar" mode="ios">
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Filter buttons */}
        <IonList className="ion-margin-top filer-list-flex">
          <IonItem lines="none" className="scroll">
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
                  <IonSelectOption value="gebruikt">Gebruikt</IonSelectOption>
                  <IonSelectOption value="stuk">Stuk</IonSelectOption>
                </IonSelect>
              </IonButton>
            </div>
            
          </IonItem>
        </IonList>
        <hr/>
        <MapContainer
          center={[52.4001, 5.509]}
          zoom={11}
          style={{ height: "70vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {items
            .filter((item) => {
              // Filter items based on selected options
              if (selectedCondition && item.condition !== selectedCondition) {
                return false;
              }
              if (selectedMaterial && item.material !== selectedMaterial) {
                return false;
              }
              return true;
            })
            .map((item) => {
              const myIcon = new Icon({
                iconUrl: `/src/assets/material-icons/${item.material}.svg`,
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41],
              });

              return (
                <Marker
                  position={[item.location.lat, item.location.lon]}
                  icon={myIcon}
                  key={item.id}
                  eventHandlers={{
                    click: () => {
                      history.push('/home/lists/list?id=' + item.id);
                    },
                  }}
                />
              );
            })}
        </MapContainer>

        {/* <ExploreContainer name="Map page" /> */}
      </IonContent>
      {/* Nav */}
      <NavTabs />
    </IonPage>
  );
};

export default Map;
