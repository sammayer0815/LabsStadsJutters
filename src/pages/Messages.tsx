import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonIcon, IonModal, IonButton, IonButtons, IonBackButton } from '@ionic/react';
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

    // Fetch message details
    useEffect(() => {
        const fetchMessageDetails = async () => {
            try {
                // Fetch the senderId, receiverId, and listingId from the message
                if (messageId) {
                    const messageDoc = await getDoc(doc(messagesCollection, messageId));
                    if (messageDoc.exists()) {
                        const messageData = messageDoc.data();
                        setSenderId(messageData.senderId);
                        setReceiverId(messageData.receiverId);
                        setListingId(messageData.listingId);
                    } else {
                        // Message not found error
                        setErrorMessage('Bericht niet gevonden');
                    }
                }
            } catch (error) {
                // Error fetching message details
                //console.error("Error fetching message details:", error);
                setErrorMessage('Error ophalen van gegevens');
            }
        };

        // Fetch message details
        fetchMessageDetails();
    }, [messageId]);

    useEffect(() => {
        // Check if user has permission to the message
        if (userId && messageId && senderId && receiverId) {
            // Redirect to messages page if user is not the sender or receiver of the message
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

    // Add a new message to the chat
    const handleAddMessage = async () => {
        if (!newMessage.trim() && !selectedImageUrl) {
            return;
        }
    
        // Check if receiverId and listingId are set
        if (!receiverId || !listingId) {
            // Error message for missing receiverId and listingId
            setErrorMessage('Ontvanger en/of advertentie niet gevonden');
            return;
        }
    
        // Add the new message to the chat
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
    
            // Log message added successfully
            //console.log("Message added successfully!");
    
            // Clear the message input and selected image for the next message
            setNewMessage('');
            setSelectedImageUrl(''); 
            setErrorMessage('');
            document.getElementById('imageUpload')!.value = ''; 
        } catch (error) {
            // Error adding message
            //console.error("Error adding message:", error);
        }
    };    

    // Upload image to Firebase Storage
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
                // Error uploading image
                //console.error("Error uploading image:", error);
            }
        }
    };    

    // Zoom in on image when clicked
    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    // Frontend messages page
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'} className='custom-toolbar' mode='ios'>
                <IonButtons>
                        <IonBackButton defaultHref='/berichten' text=""></IonBackButton>
                    </IonButtons>
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
                                className="messageImage"
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
                
                <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)} className="custom-modal">
                    <div className="modal-content">
                        <IonIcon 
                            icon={closeOutline} 
                            onClick={() => setIsModalOpen(false)} 
                            className="close-icon"
                        />
                        <img src={selectedImage} alt="enlarged" className="modal-image" />
                    </div>
                </IonModal>
            </IonContent>
            <NavTabs />
        </IonPage>
    );
};

export default Messages;
