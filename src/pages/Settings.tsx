import { IonToast, IonModal, IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar, createGesture } from '@ionic/react';
import { addCircleOutline, bookmarkOutline, callOutline, constructOutline, createOutline, imageOutline, imagesOutline, informationCircleOutline, locationOutline, peopleOutline, personAddOutline, personOutline, settingsOutline, trashBinOutline, trashOutline } from 'ionicons/icons';
import React from 'react';
import NavTabs from '../components/Nav';
import './style.css';
import './Login.css';
import TestImage4 from '../assets/Frans-eiken-set-rotated.jpg';


import { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore, storage } from '../config/controller';
import { getAuth, deleteUser } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Settings: React.FC = () => {
    const [userDetails, setUserDetails] = useState<any | null>(null);
    const [data, setData] = useState<{ img?: string }>({});
    const [file, setFile] = useState<File | null>(null);
    const [per, setPerc] = useState<number | null>(null);
    const usernameRef = useRef<HTMLIonInputElement>(null);
    
    const auth = getAuth();
    const user = auth.currentUser; 

    const [toast, setToast] = useState<{ show: boolean, message: string, color: string }>({ show: false, message: '', color: '' });
    const [deletePicture, setDeletePicture] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();

    // Fetch the current user's details from Firestore 
    useEffect(() => {
        const getUserDetails = async () => {
            // Check if user is logged in
            if (user) {
                try { 
                    // Creates a reference to the Firestore document for the current user using the user's UID.
                    const userDoc = doc(firestore, "users", user.uid);
                    // Fetch the document
                    const docSnap = await getDoc(userDoc);
                    
                    // If the document exists, it sets the user details in setUserDetails()
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data());
                        setData({ img: docSnap.data().profilePicture });
                        if (usernameRef.current) {
                            usernameRef.current.value = docSnap.data().username;
                        }
                    } else {
                        console.log("No such document found!");
                    }

                } catch (error) {
                    console.error(error);
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

    const updateUserDetails = async (event: any) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Check if a user is logged in
        if (user) {
            try {
                let profilePictureUrl = userDetails.profilePicture;
                let newUsername = usernameRef.current?.value || userDetails.username; // Use the current value of the username input field
                
                // Check if there's a file selected
                if (file) {
                    const name = new Date().getTime() + file.name;
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

                // Check if the delete picture flag is set
                if (deletePicture) {
                    // Reset the image URL to the default one
                    const defaultImgUrl = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
                    profilePictureUrl = defaultImgUrl;
                    setDeletePicture(false); 
                }

                // Update the user's profile details in the database
                const userDoc = doc(firestore, "users", user.uid);
                await updateDoc(userDoc, {
                    username: newUsername,
                    profilePicture: profilePictureUrl,
                });
                
                
                // Alert the user about successful update
                setToast({ show: true, message: 'User details updated successfully!', color: 'success' });
            } catch (error) {
                console.error("Error updating details: ", error);
                alert('Failed to update user details.');
            }
        }
    };

    const openFileDialog = () => {
        (document as any).getElementById("file").click();
    };

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
                console.error("Error updating details: ", error);
                alert('Failed to delete user');
            }
        }
    }

    return (
        <IonPage>
            {/* Back btn to profile */}
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonButtons>
                        <IonBackButton defaultHref='/profiel' text=""></IonBackButton> 
                    </IonButtons>
                    <IonTitle>Instellingen</IonTitle>
                </IonToolbar>
            </IonHeader>
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
                                    <IonInput type='text' className="register-input" mode="md" label="Gebruikersnaam" labelPlacement="floating" fill='outline' name="username" value={userDetails.username} ref={usernameRef} onIonChange={(e) => setUserDetails({ ...userDetails, username: e.detail.value })}></IonInput>
                                    <a className='underline' href='/forgot-password'>Wachtwoord aanpassen</a>
                                    <IonButton type='submit' mode="ios" className="ion-margin-top" expand='block' color={'secondary'} disabled={per !== null && per < 100}>Update account</IonButton>
                                </form>
                            )}
                            
                        </IonCol>
                    </IonRow> 
                    {/* Delete profile btn */}
                    <IonRow class="ion-justify-content-center ion-margin-top">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <hr className='ion-margin-bottom'/>
                            <h2 className='ion-text-center title-form ion-no-margin'>Account verwijderen</h2>
                            <h2 className='ion-text-center title-form ion-no-margin'>(dit kan niet ongedaan worden!)</h2>
                            {/* <IonButton mode="ios" className="ion-margin-top" expand='block' color={'danger'} onClick={handleDeleteUserClick}>Account verwijderen</IonButton> */}
                            
                            <IonButton mode="ios" className="ion-margin-top" expand='block' color={'danger'} onClick={() => setIsOpen(true)}>
                                Account verwijderen
                            </IonButton>
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
                </IonGrid> 
                <IonToast
                    isOpen={toast.show}
                    onDidDismiss={() => setToast({ ...toast, show: false })}
                    message={toast.message}
                    duration={2000}
                    color={toast.color}
                />
            </IonContent>
            {/* Nav */}
            <NavTabs />
        </IonPage>
    );
};

export default Settings;