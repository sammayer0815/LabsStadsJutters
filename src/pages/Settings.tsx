import { IonToast, IonModal, IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { createOutline } from 'ionicons/icons';
import React from 'react';
import NavTabs from '../components/Nav';
import './style.css';
import './Login.css';
import { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { firestore, storage } from '../config/controller';
import { getAuth, deleteUser } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Settings: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [data, setData] = useState<{ img?: string }>({});
  const [file, setFile] = useState<File | null>(null);
  const [per, setPerc] = useState<number | null>(null);
  const usernameRef = useRef<HTMLIonInputElement>(null);
  const [toast, setToast] = useState<{ show: boolean, message: string, color: string }>({ show: false, message: '', color: '' });
  const [deletePicture, setDeletePicture] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();  
  
  // Authentication user
  const auth = getAuth();
  const user = auth.currentUser; 


  // Fetch the current user's details from Firestore 
  useEffect(() => {
    const getUserDetails = async () => {
      // Check if user is logged in
      if (user) {
        try {
          
          // Fetch the document 
          const userDoc = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(userDoc);
          
          // If the document exists, it sets the user details in setUserDetails()
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            setData({ img: docSnap.data().profilePicture });
            if (usernameRef.current) {
              usernameRef.current.value = docSnap.data().username;
            }
          } else {
            setToast({ show: true, message: 'Error: Geen document is niet gevonden!', color: 'danger' });
          }

        } catch (error) {
          setToast({ show: true, message: 'Error: ' + error, color: 'danger' });
        }
      }
    };
    getUserDetails();
  }, [user]);

  // Function to handle the "Delete picture" link click
  const handleDeletePictureClick = () => {
    setDeletePicture(true);
    const defaultImgUrl = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
    setData((prev) => ({ ...prev, img: defaultImgUrl })); // Reset the image URL to the default one
  };

  // Update user details
  const updateUserDetails = async (event: any) => {
    event.preventDefault(); 
  
    // Check if a user is logged in
    if (!user) return;
  
    try {
      let profilePictureUrl = userDetails.profilePicture;
      const newUsername = usernameRef.current?.value?.toString().trim();
  
      // Check if the username is empty 
      if (!newUsername) {
        console.error("Username cannot be empty");
        setToast({ show: true, message: 'Error: Gebruikersnaam mag niet leeg zijn', color: 'danger' });
        return; 
      }

      // Check if the username has special chars and/or spacings
      const usernamePattern = /^[a-zA-Z0-9]+$/;
      if (!usernamePattern.test(newUsername)) {
        // console.error("Username can only contain alphanumeric characters");
        setToast({ show: true, message: 'Error: Username mag geen speciale tekens of spaties bevatten!', color: 'danger' });
        return;
      }
  
      // Fetch all usernames from the database
      const usersCollection = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const existingUsernames = usersSnapshot.docs.map(doc => doc.data().username?.toLowerCase());

      // Check if the new username is already taken
      if (existingUsernames.includes(newUsername.toLowerCase()) && newUsername.toLowerCase() !== userDetails.username.toLowerCase()) {
        setToast({ show: true, message: 'Error: Username bestaat al!', color: 'danger' });
        return;
      }

      // Check if there's a file selected
      if (file) {
        // Upload image in folder with  timestamp in milliseconds in the name to avoid file name collisions.
        const name = `profile-pictures/${new Date().getTime()}-${file.name}`;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Monitor the state of the upload task
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Update the upload progress
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setPerc(progress);
            },
            (error) => {
              console.log(error);
              reject(error);
            },
            async () => {
              // Once the upload is complete, get the download URL
              profilePictureUrl = await getDownloadURL(uploadTask.snapshot.ref);
              setData((prev) => ({ ...prev, img: profilePictureUrl }));
              resolve();
            }
          );
        });
      }

      // Check if the delete picture is set
      if (deletePicture) {
        // Reset the image URL to the default one
        const defaultImgUrl = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
        profilePictureUrl = defaultImgUrl;
        setDeletePicture(false); 
      }

      // Update user details in the database
      const userDoc = doc(firestore, "users", user.uid);
      await updateDoc(userDoc, {
        username: newUsername,
        profilePicture: profilePictureUrl,
        
      });

      // Update the userDetails state
      setUserDetails({
        ...userDetails,
        username: newUsername,
        profilePicture: profilePictureUrl
      });
      // Successful toast update
      setToast({ show: true, message: 'Gebruikersgegevens zijn succesvol bijgewerkt!', color: 'success' });
    } catch (error) {
      console.error("Error updating details: ", error);
      setToast({ show: true, message: 'Error: kan gebruikersgegevens niet bijwerken.', color: 'danger' });
    }
  };

  // Open file
  const openFileDialog = () => {
    (document as any).getElementById("file").click();
  };

  // Preview profile picture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Read the file as a data URL and update the data state
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imgUrl = event.target.result.toString();
          setData((prev) => ({ ...prev, img: imgUrl }));
        }
      };
      reader.readAsDataURL(selectedFile);

      // Update the file state
      setFile(selectedFile);
      e.target.value = '';
    }
  };

  // Delete user
  const handleDeleteUserClick = async () => {
    if (user) {
      try {
        // Delete user and users document from Firestore
        const usersDoc = doc(firestore, "users", user.uid);
        await deleteDoc(usersDoc);
        await deleteUser(user);
        history.push({
          pathname: '/login',
          state: { showToast: true, toastMessage: 'You have successfully deleted your account!', toastColor: 'success' }
        });
      } catch (error) {
          setToast({ show: true, message: 'Kan gebruiker niet verwijderen', color: 'success' });
      }
    }
  }

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
          {/* Back btn to profile */}
          <IonButtons>
            <IonBackButton defaultHref='/profiel' text=""></IonBackButton> 
          </IonButtons>
          <IonTitle>Instellingen</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* Content */}
      <IonContent className="ion-padding">
        <IonGrid fixed>
          {/* Display profile and change profile picture */}
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <div className='flex-profile-picture-text'>
                <IonAvatar className='profile-picture'>
                  <img
                    src={
                        data.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt="profile picture"
                  />
                </IonAvatar>
                <div className='space-text-change'>
                  <h6 className='ion-no-margin'>{userDetails?.username}</h6>
                  <div className='inline-icon-text'>
                    <IonIcon aria-hidden="true" icon={createOutline} />
                    <input
                        type="file"
                        id="file"
                        accept="image/*" 
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <a className='ion-no-margin' style={{ color: 'black' }} onClick={openFileDialog}>Foto aanpassen</a>
                  </div>
                  <div className='inline-icon-text'>
                    <IonIcon aria-hidden="true" icon={createOutline} />
                    <a className='ion-no-margin' style={{ color: 'black' }} onClick={handleDeletePictureClick} >Delete picture</a>
                  </div>
                </div>
              </div>
              <hr className='ion-margin-top'/>
            </IonCol>
          </IonRow>
          {/* Form of user details */}
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              {/*  If userDetails exists, show the form */}
              {userDetails && (
                <form onSubmit={updateUserDetails} className='gap-form'>
                  <h2 className='ion-text-center title-form'>Account gegevens</h2>
                  <IonInput type='email' className="register-input" mode="md" label="Email" labelPlacement="floating" fill='outline' name="email" value={user?.email} disabled={true}></IonInput>
                  <IonInput type='text' className="register-input" mode="md" label="Gebruikersnaam" labelPlacement="floating" fill='outline' name="username" value={userDetails?.username || ''} ref={usernameRef} onIonChange={(e) => setUserDetails({ ...userDetails, username: e.detail.value?.trim() })}></IonInput>
                  <span><a href='/profiel/wachtwoord-aanpassen' className='underline'>Wachtwoord aanpassen</a></span>
                  <IonButton type='submit' mode="ios" className="ion-margin-top" expand='block' color={'secondary'} disabled={per !== null && per < 100}>Update account</IonButton>
                </form>
              )}
            </IonCol>
          </IonRow> 
          {/* Delete profile section */}
          <IonRow class="ion-justify-content-center ion-margin-top">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <hr className='ion-margin-bottom'/>
              <h2 className='ion-text-center title-form ion-no-margin'>Account verwijderen</h2>
              <h2 className='ion-text-center title-form ion-no-margin'>(dit kan niet ongedaan worden!)</h2>
              <IonButton mode="ios" className="ion-margin-top" expand='block' color={'danger'} onClick={() => setIsOpen(true)}>
                Account verwijderen
              </IonButton>
              {/* Delete modal */}
              <IonModal isOpen={isOpen}>
                <IonHeader>
                  <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonTitle>Account verwijderen</IonTitle>
                    <IonButtons slot="end">
                      <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                    </IonButtons>
                  </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                  <h2 className='ion-text-center title-form'>Laatste kans...</h2>
                  <h2 className='ion-text-center title-form ion-no-margin'>(dit kan niet ongedaan worden!)</h2>
                  <IonButton mode="ios" className="ion-margin-top" expand='block' color={'danger'} onClick={handleDeleteUserClick}>Account verwijderen</IonButton>
                </IonContent>
              </IonModal>
            </IonCol>
          </IonRow>
          <IonToast
          isOpen={toast.show}
          onDidDismiss={() => setToast({ ...toast, show: false })}
          message={toast.message}
          duration={2000}
          color={toast.color}
          />
        </IonGrid> 
      </IonContent>
      {/* Nav */}
      <NavTabs />
    </IonPage>
  );
};

export default Settings;