import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Message.css';
import { Link } from 'react-router-dom';
import NavTabs from '../components/Nav';

const Message: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Message</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Message</IonTitle>
          </IonToolbar>
        </IonHeader>

      {/* Message card */}
      <Link to={"/berichten/community"}>
      <IonItem className='messageBox' lines="none">
        <img className='image' src="productImages/couch.jpg" alt="logo" />
        <div className='content'>
          <IonLabel className='title'>Title</IonLabel>
          <IonLabel className='name'>Name</IonLabel>
          <IonLabel className='receivedMessage'>Message</IonLabel>
          <IonLabel className='date'>Date</IonLabel>
        </div>
      </IonItem>
      </Link>
      </IonContent>
    {/* Nav */}
    <NavTabs />
    </IonPage>
  );
};

export default Message;
