import React, { useState, useEffect } from 'react';
import { firebaseConfig, db, auth } from '../firebase';
import { initializeApp } from 'firebase/app';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy, getDocs, where, writeBatch, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import StarRating from './StarRating';
import { Check, X, Trash2, Clock, Pin, PinOff, LogOut, Users, MessageSquare, FileText } from 'lucide-react';
import ResumeManager from './ResumeManager';

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'reviews' | 'users' | 'resume'>('resume');
    const [reviews, setReviews] = useState<any[]>([]);
    const [adminUsers, setAdminUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [isCreatingUser, setIsCreatingUser] = useState(false);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setLoading(false);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        // Only fetch reviews if authenticated
        if (!isAuthenticated) {
            return;
        }

        setLoading(true);
        const qReviews = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
        const unsubscribeReviews = onSnapshot(qReviews, (querySnapshot) => {
            const reviewsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReviews(reviewsData);
            setLoading(false);
        });

        const qUsers = query(collection(db, 'admins'), orderBy('createdAt', 'desc'));
        const unsubscribeUsers = onSnapshot(qUsers, (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAdminUsers(usersData);
        });

        return () => {
            unsubscribeReviews();
            unsubscribeUsers();
        };
    }, [isAuthenticated]);

    const handleApprove = async (id: string) => {
        try {
            await updateDoc(doc(db, 'reviews', id), {
                status: 'approved'
            });
            toast.success('Review approved!');
        } catch (error) {
            toast.error('Failed to approve review.');
        }
    };

    const handlePin = async (id: string, isCurrentlyPinned: boolean) => {
        try {
            await updateDoc(doc(db, 'reviews', id), {
                isPinned: !isCurrentlyPinned
            });
            toast.success(isCurrentlyPinned ? 'Review unpinned!' : 'Review pinned!');
        } catch (error) {
            console.error('Error pinning review:', error);
            toast.error('Failed to pin review.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            await deleteDoc(doc(db, 'reviews', id));
            toast.success('Review deleted!');
        } catch (error) {
            toast.error('Failed to delete review.');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredential.user.emailVerified) {
                await signOut(auth);
                toast.error('Please verify your email address to log in.', { duration: 5000 });
                return;
            }
            toast.success('Logged in successfully!');
        } catch (error: any) {
            console.error(error);
            toast.error('Incorrect email or password');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    const handleAddAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreatingUser(true);
        try {
            const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
            const secondaryAuth = getAuth(secondaryApp);
            
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, newAdminEmail, newAdminPassword);
            await sendEmailVerification(userCredential.user);
            await signOut(secondaryAuth);
            
            await addDoc(collection(db, 'admins'), {
                email: newAdminEmail,
                createdAt: serverTimestamp()
            });
            
            setNewAdminEmail('');
            setNewAdminPassword('');
            toast.success('Admin user created. A verification email has been sent!');
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to create admin user');
        } finally {
            setIsCreatingUser(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Loading Admin Panel...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl">
                    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                placeholder="Enter admin email"
                                required
                            />
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter admin password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-8 text-white">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Admin Review Panel
                        </h1>
                        <p className="text-slate-400 mt-2 text-sm md:text-base">Manage and approve user testimonials</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                            <span className="text-blue-400 font-bold">{reviews.length}</span> <span className="hidden sm:inline">Total Reviews</span><span className="sm:inline hidden">Reviews</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20 font-medium"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </header>

                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                            activeTab === 'reviews' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <MessageSquare size={20} /> Reviews
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                            activeTab === 'users' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <Users size={20} /> Manage Users
                    </button>
                    <button
                        onClick={() => setActiveTab('resume')}
                        className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                            activeTab === 'resume' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <FileText size={20} /> Manage Resume
                    </button>
                </div>

                {activeTab === 'resume' ? (
                    <ResumeManager />
                ) : activeTab === 'reviews' ? (
                    <div className="grid gap-6">
                        {reviews.length === 0 ? (
                            <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                <p className="text-slate-500">No reviews found.</p>
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className={`p-6 rounded-2xl border transition-all duration-300 ${review.status === 'pending'
                                        ? 'bg-blue-500/5 border-blue-500/20'
                                        : 'bg-white/5 border-white/10'
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="flex-grow space-y-4">
                                            <div className="flex flex-wrap items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl shrink-0">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-xl font-bold truncate">{review.name}</h3>
                                                    <p className="text-sm text-slate-400 break-all sm:break-normal">{review.email}</p>
                                                </div>
                                                {review.status === 'pending' && (
                                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full flex items-center gap-1 shrink-0">
                                                        <Clock size={12} /> Pending
                                                    </span>
                                                )}
                                            </div>

                                            <StarRating rating={review.rating} />

                                            <p className="text-slate-300 italic text-lg">
                                                "{review.comment}"
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                Submitted on: {review.createdAt?.toDate().toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-end whitespace-nowrap">
                                            {review.status === 'pending' && (
                                                <button
                                                    onClick={() => handleApprove(review.id)}
                                                    className="w-full sm:flex-1 md:w-auto md:flex-none px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Check size={18} /> Approve
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handlePin(review.id, review.isPinned)}
                                                className={`w-full sm:flex-1 md:w-auto md:flex-none px-6 py-3 font-bold rounded-xl transition-all border flex items-center justify-center gap-2 ${review.isPinned
                                                    ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/30'
                                                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                                    }`}
                                            >
                                                {review.isPinned ? <PinOff size={18} /> : <Pin size={18} />}
                                                {review.isPinned ? 'Unpin' : 'Pin Review'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review.id)}
                                                className="w-full sm:flex-1 md:w-auto md:flex-none px-6 py-3 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-bold rounded-xl transition-all border border-red-600/20 flex items-center justify-center gap-2"
                                            >
                                                <Trash2 size={18} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                <Users className="text-blue-400" /> Total Admin Users: {adminUsers.length}
                            </h2>
                            <div className="space-y-4">
                                {adminUsers.length === 0 ? (
                                    <p className="text-slate-500">No additional admin users found in database.</p>
                                ) : (
                                    adminUsers.map(user => (
                                        <div key={user.id} className="p-4 bg-slate-900 border border-white/10 rounded-xl flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center font-bold shrink-0">
                                                {user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-white font-medium truncate">{user.email}</h3>
                                                <p className="text-xs text-slate-500">
                                                    Added: {user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            <h2 className="text-2xl font-bold mb-6 text-white">Add New Admin</h2>
                            <form onSubmit={handleAddAdmin} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">New Admin Email</label>
                                    <input
                                        type="email"
                                        value={newAdminEmail}
                                        onChange={(e) => setNewAdminEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="admin@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">New Admin Password</label>
                                    <input
                                        type="password"
                                        value={newAdminPassword}
                                        onChange={(e) => setNewAdminPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Secure password (min. 6 chars)"
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isCreatingUser}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2 shadow-lg"
                                >
                                    {isCreatingUser ? 'Creating...' : 'Create Admin User'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
