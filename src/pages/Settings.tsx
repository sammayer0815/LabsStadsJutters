import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar, createGesture } from '@ionic/react';
import { addCircleOutline, bookmarkOutline, callOutline, constructOutline, createOutline, imageOutline, imagesOutline, informationCircleOutline, locationOutline, peopleOutline, personAddOutline, personOutline, settingsOutline, trashBinOutline, trashOutline } from 'ionicons/icons';
import React from 'react';
import NavTabs from '../components/Nav';
import './style.css';
import TestImage4 from '../assets/Frans-eiken-set-rotated.jpg';


import { useEffect, useState, useRef } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../config/controller';
import { getAuth, updateEmail, reauthenticateWithCredential, EmailAuthProvider  } from "firebase/auth";

const Settings: React.FC = () => {
    const [userDetails, setUserDetails] = useState<any | null>(null);
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const usernameRef = useRef<HTMLIonInputElement>(null);
    const placeNameRef = useRef<HTMLIonInputElement>(null);

    const auth = getAuth();
    const user = auth.currentUser; 

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

    // const inputChange = (event: any) => {
    //     const { name, value } = event.target;
    //     setUserDetails((prevState: any) => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };
    
    // const passwordChange = (event: any) => {
    //     setPassword(event.target.value);
    // };

    const updateUserDetails = async (event: any) => {
        event.preventDefault();

        if (user) {
            try {
                // Update email in Firebase Authentication
                if (newEmail !== user.email && newEmail !== '') {
                    await updateEmail(user, newEmail);
                }

                // Creates a reference to the Firestore document for the current user using the user's UID.
                const userDoc = doc(firestore, "users", user.uid)
                await updateDoc(userDoc, {
                    username: usernameRef.current?.value,
                    placeName: placeNameRef.current?.value,
                });
                alert('User details updated successfully!');
            } catch (error) {
                console.error("Error updating details: ", error);
                alert('Failed to update user details.');
            }
        }
    };




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
                                <IonAvatar>
                                    <img alt="Silhouette of mountains" src={TestImage4} className='settings-profile-picture' />
                                </IonAvatar>
                                <div className='space-text-change'>
                                    <div className='space-text'>
                                        <p className='ion-no-margin'>Henk123</p>
                                        <div className='inline-icon-text'>
                                            <IonIcon className='grey-text' aria-hidden="true" icon={locationOutline} />
                                            <p className='ion-no-margin grey-text'>Amsterdam</p>
                                        </div>
                                    </div>
                                    <div className='ion-margin-top'>
                                        <div className='inline-icon-text'>
                                            <IonIcon aria-hidden="true" icon={createOutline} />
                                            <p className='ion-no-margin'>Foto aanpassen</p>
                                        </div>
                                        <div className='inline-icon-text'>
                                            <IonIcon aria-hidden="true" icon={trashOutline} />
                                            <p className='ion-no-margin'>Foto Verwijderen</p>   
                                        </div>
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
                                <form onSubmit={updateUserDetails}>
                                    <h2 className='ion-text-center title-form'>Aanmelden bij Stadsjutters</h2>
                                    <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Gebruikersnaam" labelPlacement="floating" fill='outline' name="username" value={userDetails.username} ref={usernameRef}></IonInput>
                                    <IonInput type='email' className="ion-margin-top register-input" mode="md" label="Email" labelPlacement="floating" fill='outline' name="email" value={user?.email || ''} onIonChange={(e) => setNewEmail(e.detail.value!)}></IonInput>
                                    <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Nieuw Wachtwoord" labelPlacement="floating" fill='outline' name="password"></IonInput>
                                    <IonInput type='text' className="ion-margin-top register-input" mode="md" label="Plaats" labelPlacement="floating" fill='outline' name="placeName"  value={userDetails.placeName} ref={placeNameRef} ></IonInput>
                                    <IonButton type='submit' mode="ios" className="ion-margin-top" expand='block' color={'secondary'}>Gegevens updaten</IonButton>
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
                            <IonButton type='submit' mode="ios" className="ion-margin-top" expand='block' color={'danger'}>Account verwijderen</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid> 
            </IonContent>
            {/* Nav */}
            <NavTabs />
        </IonPage>
    );
};

export default Settings;