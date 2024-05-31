import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Link } from 'react-router-dom';
import NavTabs from '../components/Nav';
import './Message.css';
import { useEffect, useState } from 'react';
import { onSnapshot, query, where, doc, getDoc } from 'firebase/firestore';
import { chatCollection, listingsCollection } from '../config/controller';
import { useUserId } from "../components/AuthRoute";

const Message: React.FC = () => {
  const userId = useUserId();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(chatCollection, where("receiverId", "==", userId)), async (snapshot) => {
      try {
        const messagesData = await Promise.all(snapshot.docs.map(async (docSnapshot) => {
          const messageData = docSnapshot.data();
          const listingId = messageData.listingId;
          
          const listingDocRef = doc(listingsCollection, listingId);
          const listingDocSnapshot = await getDoc(listingDocRef);
          if (!listingDocSnapshot.exists()) {
            throw new Error(`Listing data not found for listingId: ${listingId}`);
          }
          const listingData = listingDocSnapshot.data();
          
          return {
            id: docSnapshot.id,
            ...messageData,
            listingImage: listingData?.listingImage || "default.jpg",
            listingName: listingData?.listingName || "Unknown Listing",
            timestamp: messageData.timestamp?.toDate ? messageData.timestamp.toDate() : new Date(messageData.timestamp)
          };
        }));
        
        const groupedMessages = messagesData.reduce((acc, message) => {
          const { messageId } = message;
          if (!acc[messageId]) {
            acc[messageId] = [];
          }
          acc[messageId].push(message);
          return acc;
        }, {} as Record<string, any[]>);
        
        setMessages(groupedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    });
  
    return () => unsubscribe();
  }, [userId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
          <IonTitle>Berichten</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Messages</IonTitle>
          </IonToolbar>
        </IonHeader>

        {Object.entries(messages).map(([messageId, messageList]) => {
          const sortedMessages = messageList.sort((a, b) => b.timestamp - a.timestamp);
          const latestMessage = sortedMessages[0];
          return (
            <Link to={`/berichten/community/${messageId}`} key={messageId}>
              <IonItem className='messageBox' lines="none">
                <img className='image' src={latestMessage.listingImage || "productImages/couch.jpg"} alt="Product" />
                <div className='content'>
                  <IonLabel className='title'>{latestMessage.listingName}</IonLabel>
                  <IonLabel className='name'>{latestMessage.senderId}</IonLabel>
                  <IonLabel className='receivedMessage'>{latestMessage.message}</IonLabel>
                  <IonLabel className='date'>{new Date(latestMessage.timestamp).toLocaleString()}</IonLabel>
                </div>
              </IonItem>
            </Link>
          );
        })}
      </IonContent>
      <NavTabs />
    </IonPage>
  );
};

export default Message;
