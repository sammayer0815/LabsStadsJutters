import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Link } from 'react-router-dom';
import NavTabs from '../components/Nav';
import './Message.css';
import { useEffect, useState } from 'react';
import { onSnapshot, query, where, orderBy, doc, getDoc, getDocs, limit } from 'firebase/firestore';
import { chatCollection, listingsCollection, messagesCollection } from '../config/controller';
import { useUserId } from "../components/AuthRoute";

const Messages: React.FC = () => {
    const userId = useUserId();
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Fetch messages where the user is either the sender or receiver
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

                        // Fetch the last chat message between the sender and receiver
                        const lastChatQuery = query(
                            chatCollection,
                            where("listingId", "==", messageData.listingId),
                            orderBy("timestamp", "desc"),
                            limit(1)
                        );

                        const lastChatSnapshot = await getDocs(lastChatQuery);
                        const lastChatData = lastChatSnapshot.docs[0]?.data();

                        return {
                            messageId: docSnapshot.id,
                            listingImage: listingData.listingImage,
                            listingName: listingData.listingName,
                            message: lastChatData?.message || "No messages sent",
                            timestamp: lastChatData?.timestamp?.toDate() || "No date",
                            senderId: messageData.senderId === userId ? messageData.receiverId : messageData.senderId
                        };
                    }
                    return null;
                }));

                // Filter out null messages
                const filteredMessages = messagesData.filter(message => message !== null);

                setMessages(filteredMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();

        const unsubscribeReceiver = onSnapshot(
            query(
                chatCollection,
                where("receiverId", "==", userId),
                orderBy("timestamp", "desc")
            ),
            (snapshot) => {
                // Handle live updates if necessary
            }
        );

        return () => {
            unsubscribeReceiver();
        };
    }, [userId]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonTitle>Berichten</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {loading ? (
                    <IonLabel>Loading...</IonLabel>
                ) : messages.length === 0 ? (
                    <IonLabel>No messages found</IonLabel>
                ) : (
                    messages.map((chat, index) => (
                        <Link to={`/berichten/community/${chat.messageId}`} key={index}>
                            <IonItem className='messageBox' lines="none">
                                <img className='image' src={chat.listingImage} alt="Product" />
                                <div className='content'>
                                    <IonLabel className='title'>{chat.listingName}</IonLabel>
                                    <IonLabel className='name'>{chat.senderId}</IonLabel>
                                    <IonLabel className='receivedMessage'>{chat.message}</IonLabel>
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
