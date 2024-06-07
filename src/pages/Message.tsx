import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Link } from 'react-router-dom';
import NavTabs from '../components/Nav';
import './Message.css';
import { useEffect, useState } from 'react';
import { onSnapshot, query, where, orderBy, doc, getDoc, getDocs, limit } from 'firebase/firestore';
import { chatCollection, listingsCollection, messagesCollection } from '../config/controller';
import { useUserId } from "../components/AuthRoute";
import { IonIcon } from '@ionic/react';
import { imageOutline } from 'ionicons/icons';

const Messages: React.FC = () => {
    const userId = useUserId();
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
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

                        const lastChatQuery = query(
                            chatCollection,
                            where("listingId", "==", messageData.listingId),
                            orderBy("timestamp", "desc"),
                            limit(1)
                        );

                        const lastChatSnapshot = await getDocs(lastChatQuery);
                        const lastChatData = lastChatSnapshot.docs[0]?.data();
                        const timestamp = lastChatData?.timestamp?.toDate() || messageData.timestamp.toDate();

                        return {
                            messageId: docSnapshot.id,
                            listingImage: listingData.listingImage,
                            listingName: listingData.listingName,
                            message: lastChatData?.message || "No messages sent",
                            timestamp,
                            senderId: messageData.senderId === userId ? messageData.receiverId : messageData.senderId,
                            imageUrl: lastChatData?.imageUrl || null
                        };
                    }
                    return null;
                }));
                const filteredMessages = messagesData.filter(message => message !== null);
                const sortedMessages = filteredMessages.sort((a, b) => b.timestamp - a.timestamp);

                setMessages(sortedMessages);
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
                            <IonItem className='messageList' lines="none">
                                <img className='image' src={chat.listingImage} alt="Product" />
                                <div className='content'>
                                    <IonLabel className='title'>{chat.listingName}</IonLabel>
                                    <IonLabel className='name'>{chat.senderId}</IonLabel>
                                    <IonLabel className='receivedMessage'>
                                        {chat.message || (chat.imageUrl && <span className='imageText'><IonIcon icon={imageOutline} /> Image</span>)}
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
