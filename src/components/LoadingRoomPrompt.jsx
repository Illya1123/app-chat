function LoadingRoomPrompt() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center p-4">
            <img
                src="https://res.cloudinary.com/dnroxsd4n/image/upload/v1753205512/lp-content-cat_fcjswx.gif"
                alt="Đang tải phòng"
                className="w-40 h-40 mb-6 object-contain"
            />
            <h2 className="text-xl font-semibold">Chưa có phòng được chọn</h2>
            <p className="text-sm text-gray-400 mt-1">Vui lòng nhập mã phòng để bắt đầu trò chuyện</p>
        </div>
    );
}

export default LoadingRoomPrompt;
