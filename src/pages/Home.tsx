import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IonContent, IonHeader, IonPage, IonToolbar, IonSearchbar, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonItem, IonLabel, IonIcon } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import NavTabs from "../components/Nav";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs, query, limit, doc, getDoc } from "firebase/firestore"; // Import doc function here
import { initializeApp } from "firebase/app";
import { config } from "../config/config";
import queryString from "query-string";

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const Home: React.FC = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState([]);

  const handleButtonClick = () => {
    history.push(`/home/lists?searchQuery=${searchValue}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
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

      // Filter items based on search value
      const filteredItems = items.filter(item =>
        item.productName.toLowerCase().includes(searchValue.toLowerCase())
      );

      setItems(filteredItems);
    };

    fetchData();
  }, [searchValue]); // Update when search value changes

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
            onKeyUp={handleSearchKeyPress}
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

          <IonRow class="ion-justify-content-center ion-margin-top">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <p className="card-titles">Onlangs geüpload</p>
              <div className="cards-section">
                {items.map((item, index) => (
                  <IonCard
                    key={index}
                    className="scroll-card"
                    mode="ios"
                    button
                    onClick={() => history.push(`/home/lists/list?id=${item.productFile}`)}
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
            color="secondary"
            onClick={handleButtonClick}
          >
            Zie alle advertenties
          </IonButton>
        </IonGrid>
      </IonContent>
      <NavTabs />
    </IonPage>
  );
};

export default Home;