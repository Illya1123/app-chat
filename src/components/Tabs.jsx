function Tabs({ joinedRooms, selectedRoom, setSelectedRoom, setJoinedRooms, setMessages }) {
    return (
        <div className="flex gap-2 p-2 border-b overflow-x-auto bg-white shadow-sm">
            {joinedRooms.map((room) => (
                <div
                    key={room.id}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer transition text-sm font-medium ${
                        selectedRoom?.id === room.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedRoom(room)}
                >
                    <span className="truncate max-w-[100px]">{room.name}</span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setJoinedRooms((prev) => prev.filter((r) => r.id !== room.id));
                            if (selectedRoom?.id === room.id) {
                                setSelectedRoom(null);
                                setMessages([]);
                            }
                        }}
                        className="ml-1"
                    >
                        ❌
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Tabs;
