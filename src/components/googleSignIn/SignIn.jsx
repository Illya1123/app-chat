import { useEffect, useState } from 'react';
import { auth, provider } from '../../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaComments, FaSignOutAlt } from 'react-icons/fa';

function SignIn() {
    const [user, setUser] = useState(localStorage.getItem('email') || null);
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email;
            const photoURL = result.user.photoURL;

            localStorage.setItem('email', email);
            localStorage.setItem('avatar', photoURL);

            setUser(email);
            setAvatar(photoURL);
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    const clearAllCookies = () => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear();
                clearAllCookies();
                setUser(null);
                setAvatar('');
            })
            .catch((error) => {
                console.log('Error signing out:', error.message);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const email = currentUser.email;
                const photoURL = currentUser.photoURL;

                localStorage.setItem('email', email);
                localStorage.setItem('avatar', photoURL);

                setUser(email);
                setAvatar(photoURL);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('avatar');
                setUser(null);
                setAvatar('');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100 px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
                {user ? (
                    <>
                        <img
                            src={avatar}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full mx-auto shadow-md mb-4 border-2 border-purple-400"
                        />
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">Chào mừng bạn</h2>
                        <p className="text-gray-600 mb-6">{user}</p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full transition duration-300"
                            >
                                <FaComments />
                                Vào Chat Ngay
                            </button>

                            <button
                                onClick={logout}
                                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition duration-300"
                            >
                                <FaSignOutAlt />
                                Đăng xuất
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Đăng nhập để tiếp tục</h2>
                        <button
                            onClick={handleClick}
                            className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition duration-300 mx-auto"
                        >
                            <FaGoogle />
                            Đăng nhập bằng Google
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default SignIn;
