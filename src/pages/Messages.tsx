import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Messages.css';
import { useEffect, useState } from 'react';
import { onSnapshot, addDoc, Timestamp } from 'firebase/firestore';
import { messagesCollection } from '../config/controller';
import { useUserId } from "../components/AuthRoute";

const Messages: React.FC = () => {
    const userId = useUserId();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate ? doc.data().timestamp.toDate() : new Date(doc.data().timestamp)
            }));
            const sortedMessages = messagesData.sort((a, b) => a.timestamp - b.timestamp); // Sort messages by timestamp
            setMessages(sortedMessages);
        });

        return () => unsubscribe();
    }, []);

    const handleAddMessage = async () => {
        try {
            const timestamp = Timestamp.now(); // Get the current server timestamp
            const senderId = userId; // Sender's ID
            const receiverId = userId; // Receiver's ID
            const imageUrl = "https://firebasestorage.googleapis.com/your-image-url"; // Image URL
            const listingId = "1"; // Listing ID
            const listingImage = "image"; // Listing Image URL
            const message = newMessage; // Message text

            // Add the message document to the Firestore collection
            await addDoc(messagesCollection, { 
                senderId, 
                receiverId, 
                imageUrl, 
                listingId, 
                listingImage, 
                message, 
                timestamp 
            });

            console.log("Message added successfully!");
            setNewMessage(''); // Clear the input field after adding the message
        } catch (error) {
            console.error("Error adding message:", error);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Messages</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Messages</IonTitle>
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
                            <p>{message.timestamp.toLocaleString()}</p> {/* Display message timestamp */}
                        </IonLabel>
                    </IonItem>
                ))}

                {/* Message form */}
                <IonItem className='messageBox' lines='none'>
                    <IonInput type='text' placeholder='Bericht...' name='message' value={newMessage} onIonChange={(e) => setNewMessage(e.detail.value!)}></IonInput>
                    <IonButton onClick={handleAddMessage}>Send</IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Messages;