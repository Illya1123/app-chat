import { useNavigate } from 'react-router-dom';

function Sidebar({ conversationIdInput, setConversationIdInput, handleJoinConversation, handleCreateConversation }) {
    const navigate = useNavigate();

    return (
        <aside className="w-full md:w-80 bg-white border-r p-4 overflow-y-auto shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">📚 Phòng Chat</h2>
                <button
                    onClick={handleCreateConversation}
                    className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition"
                >
                    + Tạo
                </button>
            </div>

            <button
                onClick={() => navigate('/signin')}
                className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-md mb-4"
            >
                ← Đăng xuất
            </button>

            <input
                type="text"
                placeholder="Nhập mã phòng..."
                value={conversationIdInput}
                onChange={(e) => setConversationIdInput(e.target.value)}
                className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={handleJoinConversation}
                className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
            >
                Vào phòng
            </button>
        </aside>
    );
}

export default Sidebar;
