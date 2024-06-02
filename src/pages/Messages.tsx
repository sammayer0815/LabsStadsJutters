import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Messages.css';
import { useEffect, useState } from 'react';
import { onSnapshot, addDoc, Timestamp, query, where, doc, orderBy, getDoc, getDocs } from 'firebase/firestore';
import { chatCollection, messagesCollection } from '../config/controller';
import { useUserId } from "../components/AuthRoute";
import NavTabs from '../components/Nav';
import { useParams, useHistory } from "react-router-dom";

const Messages: React.FC = () => {
    const { messageId } = useParams<{ messageId: string }>();
    const userId = useUserId();
    const [senderId, setSenderId] = useState<string>('');
    const [receiverId, setReceiverId] = useState<string>('');
    const [newMessage, setNewMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [listingId, setListingId] = useState<string>('');
    const [messages, setMessages] = useState<any[]>([]);
    const history = useHistory();

    useEffect(() => {
        const fetchMessageDetails = async () => {
            try {
                if (messageId) {
                    const messageDoc = await getDoc(doc(messagesCollection, messageId));
                    if (messageDoc.exists()) {
                        const messageData = messageDoc.data();
                        setSenderId(messageData.senderId);
                        setReceiverId(messageData.receiverId);
                        setListingId(messageData.listingId);
                    } else {
                        setErrorMessage('Message not found');
                    }
                }
            } catch (error) {
                console.error("Error fetching message details:", error);
                setErrorMessage('Error fetching message details');
            }
        };
    
        fetchMessageDetails();
    }, [messageId]);
    
    useEffect(() => {
        if (userId && messageId && senderId && receiverId) {
            if (userId !== senderId && userId !== receiverId) {
                history.push("/berichten");
            } else {
                const unsubscribe = onSnapshot(
                    query(
                        chatCollection,
                        where("messageId", "==", messageId),
                        orderBy("timestamp", "asc")
                    ),
                    (snapshot) => {
                        const fetchedMessages = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                            timestamp: doc.data().timestamp.toDate()
                        }));
                        setMessages(fetchedMessages);
                    }
                );
        
                return () => {
                    unsubscribe();
                };
            }
        }
    }, [userId, senderId, receiverId, messageId, history]);
    
    
    const handleAddMessage = async () => {
        if (!newMessage.trim()) {
            setErrorMessage('Message is required');
            return;
        }

        if (!receiverId || !listingId) {
            setErrorMessage('Receiver ID and Listing ID are required');
            return;
        }

        try {
            const timestamp = Timestamp.now();
            const message = newMessage;

            await addDoc(chatCollection, {
                senderId: userId,
                receiverId: receiverId,
                message,
                timestamp,
                listingId,
                messageId: messageId // Use messageId from URL parameters
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
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonTitle>Berichten</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            {messages.map((message, index) => (
                <IonItem
                    key={`${message.id}-${index}`}
                    className={message.senderId === userId ? 'ownMessageContainer' : 'userMessageContainer'}
                    lines="none"
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
