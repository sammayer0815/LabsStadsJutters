import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Messages.css';
import { useEffect, useState } from 'react';
import { onSnapshot, addDoc, Timestamp, query, where } from 'firebase/firestore';
import { chatCollection } from '../config/controller';
import { useUserId } from "../components/AuthRoute";
import NavTabs from '../components/Nav';
import { useParams } from "react-router-dom";

const Messages: React.FC = () => {
    const { messageId } = useParams<{ messageId: string }>();
    const userId = useUserId();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const q = query(chatCollection, 
            where("messageId", "==", messageId),
            where("receiverId", "==", userId)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate ? doc.data().timestamp.toDate() : new Date(doc.data().timestamp)
            }));
            const sortedMessages = messagesData.sort((a, b) => a.timestamp - b.timestamp);
            setMessages(sortedMessages);
        });

        return () => unsubscribe();
    }, [messageId, userId]);

    const handleAddMessage = async () => {
        if (!newMessage.trim()) {
            setErrorMessage('Message is required');
            return;
        }

        try {
            const timestamp = Timestamp.now();
            const senderId = userId;
            const receiverId = userId;
            const imageUrl = "https://firebasestorage.googleapis.com/your-image-url";
            const listingId = "1";
            const listingImage = "image";
            const message = newMessage;

            await addDoc(chatCollection, { 
                senderId, 
                receiverId, 
                imageUrl, 
                listingId, 
                listingImage, 
                message, 
                timestamp,
                messageId
            });

            console.log("Message added successfully!");
            setNewMessage('');
            setErrorMessage('');
        } catch (error) {
            console.error("Error adding message:", error);
        }
    };
    

    return (
        <IonPage>
            <IonContent fullscreen>
            <IonHeader>
            <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                <IonTitle>Berichten</IonTitle>
            </IonToolbar>
          </IonHeader>

                {messages.map((message) => (
                    <IonItem
                        key={message.id}
                        lines="none"
                        className={message.senderId === userId ? 'ownMessageContainer' : 'userMessageContainer'}
                    >
                        <IonLabel className={message.senderId === userId ? 'ownMessage' : 'userMessage'}>
                            <p>{message.message}</p>
                            <p>{message.senderId === userId ? 'Sent by: You' : `Sent by: ${message.senderId}`}</p>
                            <p>{message.timestamp.toLocaleString()}</p>
                        </IonLabel>
                    </IonItem>
                ))}

                <IonItem className='messageBox' lines='none'>
                    <IonInput type='text' placeholder='Bericht...' name='message' value={newMessage} onIonChange={(e) => setNewMessage(e.detail.value!)}></IonInput>
                    <IonButton onClick={handleAddMessage}>Send</IonButton>
                </IonItem>
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            </IonContent>
            <NavTabs />
        </IonPage>
    );
};

export default Messages;
