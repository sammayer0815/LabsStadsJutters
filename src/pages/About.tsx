import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import NavTabs from '../components/Nav';
import './style.css';
import AboutImg from '../assets/bg-picture-stadsjutters.jpg';
import LogoImg from '../assets/Logo.svg';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
          <IonButtons>
            <IonBackButton defaultHref='/profiel' text=""></IonBackButton> 
          </IonButtons>
          <IonTitle>Over Ons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-horizontal">
      <IonRow class="ion-justify-content-center">
        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
          {/* Logo */}
          <div className='ion-text-center '>
            <img src={LogoImg} alt="Logo stadsjutters"/>
          </div>
          {/* Text 1*/}
          <div>
            <p>
            Stadsjutters spotten en oogsten bruikbare materialen in de stad die anders verloren lijken te gaan. 
            Denk hierbij bijvoorbeeld aan met leer beklede meubels en massief meubelhout van kasten en tafels. 
            Ook bouwmaterialen zoals hout en staal kunnen interessant zijn.
            </p>
            <p>
              Als <span className='bold-text-contact'>Spotter</span> doe je een melding waar je bruikbare materialen hebt aangetroffen. 
              <span className='bold-text-contact'> Jutters</span> halen de materialen op.
            </p>
            <p>
              Samen kunnen we elkaar helpen de materialen te vinden en samen hebben we meer handen en middelen om de materialen te oogsten. 
              De ene keer meld je een mooie vondst waar je zelf geen interesse in hebt en de volgende keer vraag je om hulp bij het oogsten 
              van een mooie vondst via de melding van een ander.
            </p>
            <p>Samen jutten is leuk en levert mooie verhalen en spullen op! </p>
            <p>
              Ga naar de profielen van Stadsjutters op <a href="https://www.facebook.com/p/Stadsjutters-Almere-100090245463786/?_rdr" >Facebook</a> &  
              <a href="https://www.instagram.com/stadsjuttersalmere/" > Instagram</a> om kennis te maken met onze activiteiten en om meldingen te doen
              van interessante materialen.
            </p>
          </div>
          {/* Text 2 */}
          <div className='ion-margin-top'>
            <p>Hoe verhouden we ons tot Kringloopwinkel en Recycleperron?</p>
            <p>Product nog te verkopen: <span className='bold-text-contact'>Kringloop</span></p>
            <p>Materiaal nog te gebruiken: <span className='bold-text-contact'>Stadsjutters</span></p> 
            <p>Geen van bovenstaande: <span className='bold-text-contact'>Recycleperron</span></p> 
          </div>
          {/* Picture of stadsjutters */}
          <div className='ion-text-center ion-padding-bottom'>
            <img src={AboutImg} alt="Foto stadsjutters" className='about-img'/>
          </div>
        </IonCol>
      </IonRow> 
      </IonContent>
      {/* Nav */}
      <NavTabs />
    </IonPage>
  );
};

export default About;
