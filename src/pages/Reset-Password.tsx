import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import Logo from '../assets/Logo.svg';
import './Login.css';

const ResetPassword: React.FC = () => {
    const router = useIonRouter();
    
    const resetPassword = (event:any) => {
        event.preventDefault(); // Prevent the default form submission behavior
        router.push('/'); 
    };

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonGrid fixed> 
                    <IonButtons>
                        <IonBackButton defaultHref='/login'></IonBackButton> 
                    </IonButtons>
                    {/*Logo*/} 
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
                            <div className='ion-text-center'>
                                <img src={Logo} alt="Stadsjutters logo" width={"55%"} />
                            </div> 
                        </IonCol>
                    </IonRow>
                    {/*Form card*/} 
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="6">
                            <IonCard>
                                <IonCardContent>
                                    <form action="" onSubmit={resetPassword}>
                                        <h2 className='ion-text-center title-form'>Nieuw wachtwoord aanmaken</h2>
                                        <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Wachtwoord" labelPlacement="floating" fill='outline' ></IonInput>
                                        <IonInput type='password' className="ion-margin-top register-input" mode="md" label="Herhaal Wachtwoord" labelPlacement="floating" fill='outline' ></IonInput>
                                        <IonButton type='submit'  className="ion-margin-top" expand='block' color={'secondary'}>Wachtwoord wijzigen</IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <div className='rotated-bg'></div>  
                </IonGrid>

            </IonContent>

        </IonPage>
    );
};

export default ResetPassword;