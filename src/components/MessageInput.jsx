function MessageInput({ message, setMessage, handleSendMessage }) {
    return (
        <div className="p-4 border-t bg-white flex flex-col sm:flex-row gap-2 shadow-inner">
            <input
                type="text"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập tin nhắn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
                Gửi
            </button>
        </div>
    );
}

export default MessageInput;
