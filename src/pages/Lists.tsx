import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IonContent, IonHeader, IonPage, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonItem, IonLabel, IonIcon, IonSearchbar } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import NavTabs from "../components/Nav";
import { config } from "../config/config";
import queryString from "query-string";

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const Lists: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { search } = location;
  const { searchQuery } = queryString.parse(search);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState(searchQuery || '');

  useEffect(() => {
    const fetchData = async () => {
      const productsCollection = collection(db, "Products");
      const querySnapshot = await getDocs(productsCollection);

      const filteredItems = await Promise.all(querySnapshot.docs.map(async doc => {
        const product = { ...doc.data(), id: doc.id };

        // Fetch the image
        const imagePath = `product-images/${product.product_id}-0`;
        const imageRef = ref(storage, imagePath);
        const imageUrl = await getDownloadURL(imageRef);

        return {
          ...product,
          productName: product.title,
          imageUrl: imageUrl,
          date: product.created_at.toDate().toLocaleDateString(),
          address: product.location.display_name.split(",")[0],
          productFile: product.id,
        };
      }));

      // Filter the items based on the search value
      const filteredItemsWithSearch = filteredItems.filter(item => {
        return item.productName.toLowerCase().includes(searchValue.toLowerCase());
      });

      setItems(filteredItemsWithSearch);
    };

    fetchData();
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary"></IonToolbar>
        <IonToolbar color="secondary">
          <IonSearchbar
            className="radius-searchbar"
            color="light"
            placeholder="Zoek product..."
            value={searchValue}
            onIonChange={handleSearchChange}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
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
                    width="100%"
                    className="image-test"
                  />
                  <IonCardContent className="ion-no-padding">
                    <IonItem lines="none">
                      <IonLabel>
                        <p className="title-card">{item.productName}</p>
                        <div className="last-line-text">
                          <div className="icon-address-date">
                            <IonIcon icon={locationOutline}></IonIcon>
                            <p className="date-style">{item.address}</p>
                          </div>
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
      <NavTabs />
    </IonPage>
  );
};

export default Lists;