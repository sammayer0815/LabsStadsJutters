import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonImg, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import NavTabs from '../components/Nav';
import './Message.css';
import { useEffect, useState } from 'react';
import { onSnapshot, query, where, orderBy, doc, getDoc, getDocs, limit } from 'firebase/firestore';
import { chatCollection, listingsCollection, messagesCollection, usersCollection } from '../config/controller';
import { useUserId } from "../components/AuthRoute";
import { imageOutline } from 'ionicons/icons';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { config } from "../config/config";

const Messages: React.FC = () => {
    const userId = useUserId();
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [storage, setStorage] = useState<any>(null);

    useEffect(() => {
        // Initialize Firebase app and storage
        const app = initializeApp(config.firebaseConfig);
        const storage = getStorage(app);
        setStorage(storage);

        const fetchMessages = async () => {
            try {
                // Fetch conversations where the user is the sender or receiver
                const senderQuery = query(
                    messagesCollection,
                    where("senderId", "==", userId),
                    orderBy("timestamp", "desc")
                );
        
                const receiverQuery = query(
                    messagesCollection,
                    where("receiverId", "==", userId),
                    orderBy("timestamp", "desc")
                );
        
                const [senderSnapshot, receiverSnapshot] = await Promise.all([
                    getDocs(senderQuery),
                    getDocs(receiverQuery)
                ]);
        
                const allMessagesData = [...senderSnapshot.docs, ...receiverSnapshot.docs];
        
                const messagesData = await Promise.all(allMessagesData.map(async (docSnapshot) => {
                    const messageData = docSnapshot.data();
                    const listingDoc = await getDoc(doc(listingsCollection, messageData.listingId));
        
                    if (listingDoc.exists()) {
                        const listingData = listingDoc.data();
                        const productId = listingData.product_id;
        
                        // Fetch the image
                        const imagePath = `product-images/${productId}-0`;
                        const imageRef = ref(storage, imagePath);
                        const imageUrl = await getDownloadURL(imageRef);
        
                        // Fetch the sender's username
                        const senderDocRef = doc(usersCollection, messageData.senderId);
                        const senderDoc = await getDoc(senderDocRef);
                        const senderData = senderDoc.data();
                        const senderUsername = senderData.username;
        
                        // Fetch the last chat message for specific messageId
                        const lastChatQuery = query(
                            chatCollection,
                            where("messageId", "==", docSnapshot.id), 
                            orderBy("timestamp", "desc"),
                            limit(1)
                        );
        
                        // Get the last chat message
                        const lastChatSnapshot = await getDocs(lastChatQuery);
                        const lastChatData = lastChatSnapshot.docs[0]?.data();
                        const timestamp = lastChatData?.timestamp?.toDate() || messageData.timestamp.toDate();
        
                        return {
                            messageId: docSnapshot.id,
                            listingImage: imageUrl,
                            listingName: listingData.title,
                            message: lastChatData?.message || "",
                            timestamp,
                            senderUsername, 
                            imageUrl: lastChatData?.imageUrl || null
                        };
                    }
                    return null;
                }));
        
                // Filter out null values and sort messages by timestamp
                const filteredMessages = messagesData.filter(message => message !== null);
                const sortedMessages = filteredMessages.sort((a, b) => b.timestamp - a.timestamp);
        
                setMessages(sortedMessages);
            } catch (error) {
                // Error fetching messages
                //console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };
        
        // Fetch messages
        fetchMessages();

        // Live update for new messages
        const unsubscribeReceiver = onSnapshot(
            query(
                chatCollection,
                where("receiverId", "==", userId),
                orderBy("timestamp", "desc")
            ),
            (snapshot) => {
            }
        );

        return () => {
            unsubscribeReceiver();
        };
    }, [userId, storage]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonTitle>Berichten</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            {loading ? (
                <IonLabel>Laden...</IonLabel>
            ) : messages.length === 0 ? (
                <IonLabel>Gebruiker heeft geen berichten.</IonLabel>
            ) : (
                messages.map((chat, index) => (
                    <Link to={`/berichten/${chat.messageId}`} key={index}>
                        <IonItem className='messageList' lines="none">
                            <IonImg className='image' src={chat.listingImage} alt="Product" />
                            <div className='content'>
                                <IonLabel className='title'>{chat.listingName}</IonLabel>
                                <IonLabel className='name'>{chat.senderUsername}</IonLabel> 
                                <IonLabel className='receivedMessage'>
                                    {chat.message ? (
                                        chat.message
                                    ) : chat.imageUrl ? (
                                        <span className='imageText'>
                                            <IonIcon icon={imageOutline} />
                                            {" "}Image
                                        </span>
                                    ) : (
                                        "Geen bericht gestuurd."
                                    )}
                                </IonLabel>
                                <IonLabel className='date'>{chat.timestamp.toLocaleString()}</IonLabel>
                            </div>
                        </IonItem>
                    </Link>
                ))
            )}
            </IonContent>
            <NavTabs />
        </IonPage>
    );
};

export default Messages;
