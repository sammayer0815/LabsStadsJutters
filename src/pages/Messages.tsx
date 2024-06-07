import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonIcon, IonModal, IonButton } from '@ionic/react';
import { sendSharp, imageOutline, closeOutline } from 'ionicons/icons';
import './Messages.css';
import { useEffect, useState } from 'react';
import { onSnapshot, addDoc, Timestamp, query, where, doc, orderBy, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
        if (!newMessage.trim() && !selectedImageUrl) {
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
                messageId: messageId,
                imageUrl: selectedImageUrl
            });
    
            console.log("Message added successfully!");
    
            setNewMessage('');
            setSelectedImageUrl(''); 
            setErrorMessage('');
            document.getElementById('imageUpload')!.value = ''; // Reset the file input to allow re-uploading the same image
        } catch (error) {
            console.error("Error adding message:", error);
        }
    };    

    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const storage = getStorage();
                const storageRef = ref(storage, `images/${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                console.log("Image uploaded:", downloadURL);
                setSelectedImageUrl(downloadURL);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };    

    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                    <IonTitle>Berichten</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='ion-content'>
            {messages.map((message, index) => (
                <IonItem
                    key={`${message.id}-${index}`}
                    className={message.senderId === userId ? 'ownMessageContainer' : 'userMessageContainer'}
                    lines="none"
                >
                    <IonLabel className={message.senderId === userId ? 'ownMessage' : 'userMessage'}>
                        {message.imageUrl && 
                            <img 
                                src={message.imageUrl} 
                                alt="uploaded" 
                                className="messageImage" // Apply the CSS class here
                                onClick={() => openImageModal(message.imageUrl)}
                            />}
                        <p>{message.message}</p>
                        <p className='time'>{message.timestamp.toLocaleString()}</p>
                    </IonLabel>
                </IonItem>
            ))}
                <IonItem className='messageBox' lines='none'>
                    <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        id="imageUpload" 
                        onChange={handleUploadImage} 
                    />
                    <IonInput 
                        type='text' 
                        placeholder='Stuur bericht...' 
                        name='message' 
                        value={newMessage} 
                        onIonChange={(e) => setNewMessage(e.detail.value!)}
                        className="messageInput"
                    />
                    <IonIcon 
                        icon={imageOutline} 
                        slot="end" 
                        onClick={() => document.getElementById('imageUpload')?.click()} 
                        style={{ cursor: 'pointer', margin: '0 10px' }} 
                    />
                    <IonIcon 
                        icon={sendSharp} 
                        slot="end" 
                        onClick={() => handleAddMessage()} 
                        style={{ cursor: 'pointer', margin: '0 10px' }} 
                    />
                </IonItem>
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                
                <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
                    <div className="imageModalContent">
                        <IonIcon 
                            icon={closeOutline} 
                            onClick={() => setIsModalOpen(false)} 
                            style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px', fontSize: '24px' }} 
                        />
                        <img src={selectedImage} alt="enlarged" style={{ width: '100%', height: 'auto' }} />
                    </div>
                </IonModal>
            </IonContent>
            <NavTabs />
        </IonPage>
    );
};

export default Messages;
