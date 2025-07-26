import dayjs from 'dayjs';

// Hàm kiểm tra link YouTube và trích xuất video ID
const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

function MessageList({ messages, selectedRoom, user, handleDeleteMessage }) {
    if (!selectedRoom) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400 text-xl">
                🔍 Vui lòng nhập mã phòng để bắt đầu
            </div>
        );
    }

    const renderContentWithLinks = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, index) => {
            const youtubeId = getYouTubeVideoId(part);
            if (youtubeId) {
                return (
                    <div key={index} className="my-2">
                        <a
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 underline break-all block mb-1"
                        >
                            {part}
                        </a>
                        <iframe
                            width="100%"
                            height="300"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title="YouTube Video Preview"
                            allowFullScreen
                            className="rounded-lg"
                        ></iframe>
                    </div>
                );
            }

            return urlRegex.test(part) ? (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline break-all"
                >
                    {part}
                </a>
            ) : (
                <span key={index}>{part}</span>
            );
        });
    };

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

                                <div className="break-words">{renderContentWithLinks(msg.content)}</div>

                                <span className="block text-[14px] text-right mt-1 text-black">
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
