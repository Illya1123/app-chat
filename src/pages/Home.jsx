import { useEffect, useState } from 'react';
import { ref, onValue, push, set, get, remove } from 'firebase/database';
import { db } from '../firebase';
import Sidebar from '../components/Sidebar';
import Tabs from '../components/Tabs';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import CreateSuccessModal from '../components/CreateSuccessModal';

function Home() {
    const [conversations, setConversations] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [joinedRooms, setJoinedRooms] = useState([]);
    const [conversationIdInput, setConversationIdInput] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [createdConversationId, setCreatedConversationId] = useState(null);

    const [user] = useState({
        displayName: localStorage.getItem('email') || 'Anonymous',
        avatar: localStorage.getItem('avatar') || 'https://i.pravatar.cc/150?u=default',
    });

    useEffect(() => {
        const conversationsRef = ref(db, 'conversations');
        const unsubscribe = onValue(conversationsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsed = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setConversations(parsed);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!selectedRoom) return;
        const messagesRef = ref(db, `conversations/${selectedRoom.id}/messages`);
        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            setMessages(
                data
                    ? Object.keys(data).map((key) => ({
                          id: key,
                          ...data[key],
                      }))
                    : [],
            );
        });
        return () => unsubscribe();
    }, [selectedRoom]);

    const handleJoinConversation = async () => {
        if (!conversationIdInput) return;
        const roomRef = ref(db, `conversations/${conversationIdInput}`);
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
            const roomData = snapshot.val();
            const newRoom = { id: conversationIdInput, ...roomData };
            const alreadyJoined = joinedRooms.some((room) => room.id === newRoom.id);
            if (!alreadyJoined) {
                setJoinedRooms((prev) => [...prev, newRoom]);
            }
            setSelectedRoom(newRoom);
        } else {
            alert('Conversation ID không tồn tại!');
        }
        setConversationIdInput('');
    };

    const handleCreateConversation = () => {
        const conversationId = Date.now();
        const newConversation = {
            id: conversationId,
            name: `Conversation ${conversations.length + 1}`,
            lastMessage: '',
            date: Date.now(),
        };
        set(ref(db, `conversations/${conversationId}`), newConversation)
            .then(() => {
                setJoinedRooms((prev) => [...prev, newConversation]);
                setSelectedRoom(newConversation);
                setCreatedConversationId(conversationId);
                setShowModal(true);
            })
            .catch(() => {
                alert('Tạo phòng thất bại, vui lòng thử lại.');
            });
    };

    const handleSendMessage = () => {
        if (!message.trim() || !selectedRoom) return;
        const newMessage = {
            name: user.displayName,
            avatar: user.avatar,
            content: message,
            date: Date.now(),
        };
        push(ref(db, `conversations/${selectedRoom.id}/messages`), newMessage);
        setMessage('');
    };

    const handleDeleteMessage = (msg) => {
        if (!selectedRoom) return;
        const currentTime = Date.now();
        const messageTime = msg.date;
        if (currentTime - messageTime <= 5 * 60 * 1000) {
            remove(ref(db, `conversations/${selectedRoom.id}/messages/${msg.id}`));
        } else {
            alert('Bạn chỉ có thể xoá tin nhắn trong vòng 5 phút sau khi gửi.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50">
            <Sidebar
                conversationIdInput={conversationIdInput}
                setConversationIdInput={setConversationIdInput}
                handleJoinConversation={handleJoinConversation}
                handleCreateConversation={handleCreateConversation}
            />

            <main className="flex-1 flex flex-col bg-gray-100 max-h-screen">
                <Tabs
                    joinedRooms={joinedRooms}
                    selectedRoom={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                    setJoinedRooms={setJoinedRooms}
                    setMessages={setMessages}
                />

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <MessageList
                        messages={messages}
                        selectedRoom={selectedRoom}
                        user={user}
                        handleDeleteMessage={handleDeleteMessage}
                    />
                </div>

                {selectedRoom && (
                    <MessageInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
                )}
            </main>

            {showModal && (
                <CreateSuccessModal createdConversationId={createdConversationId} setShowModal={setShowModal} />
            )}
        </div>
    );
}

export default Home;
