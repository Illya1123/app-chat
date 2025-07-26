import dayjs from 'dayjs';

function MessageList({ messages, selectedRoom, user, handleDeleteMessage }) {
  if (!selectedRoom) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-xl">
        🔍 Vui lòng nhập mã phòng để bắt đầu
      </div>
    );
  }

  return (
    <>
      {messages.map((msg) => {
        const isCurrentUser = msg.name === user.displayName;
        const isWithin5Min = Date.now() - msg.date <= 5 * 60 * 1000;

        return (
          <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className="flex flex-col max-w-xs md:max-w-md">
              <div
                className={`relative px-4 py-2 rounded-xl shadow-md ${
                  isCurrentUser
                    ? 'bg-blue-500 text-white self-end rounded-br-none'
                    : 'bg-white text-gray-800 self-start rounded-bl-none border'
                }`}
              >
                <span className="block font-semibold mb-1">{msg.name}</span>
                <p className="break-words">{msg.content}</p>
                <span className="block text-[10px] text-right mt-1 text-gray-200">
                  {dayjs(msg.date).format('HH:mm:ss DD/MM/YYYY')}
                </span>
                {isCurrentUser && isWithin5Min && (
                  <button
                    onClick={() => handleDeleteMessage(msg)}
                    className="absolute top-1 right-1 text-xs bg-red-500 text-white px-1 rounded hover:bg-red-600"
                    title="Xoá tin nhắn"
                  >
                    🗑
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MessageList;
