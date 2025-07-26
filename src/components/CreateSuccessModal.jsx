import PropTypes from 'prop-types';
function CreateSuccessModal({ createdConversationId, setShowModal }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                <h3 className="text-lg font-semibold text-green-600 mb-2">🎉 Tạo phòng thành công!</h3>
                <p className="text-sm text-gray-700 mb-4">
                    Mã phòng của bạn là:
                    <span className="block text-blue-600 font-mono mt-1">{createdConversationId}</span>
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                    <button
                        onClick={() => navigator.clipboard.writeText(createdConversationId.toString())}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        📋 Sao chép mã
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

CreateSuccessModal.propTypes = {
    createdConversationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setShowModal: PropTypes.func.isRequired,
};

export default CreateSuccessModal;
