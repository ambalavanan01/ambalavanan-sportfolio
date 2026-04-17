import React, { useState, useEffect } from 'react';
import { firebaseConfig, db, auth } from '../firebase';
import { initializeApp } from 'firebase/app';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy, getDocs, where, writeBatch, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import StarRating from './StarRating';
import { Check, X, Trash2, Clock, Pin, PinOff, LogOut, Users, MessageSquare, FileText, HelpCircle, Send, Mail } from 'lucide-react';
import ResumeManager from './ResumeManager';

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'reviews' | 'users' | 'resume'>('resume');
    const [reviews, setReviews] = useState<any[]>([]);
    const [replyTexts, setReplyTexts] = useState<{[key: string]: string}>({});
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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-400 text-xl font-bold animate-pulse uppercase tracking-[0.2em]">Authenticating...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] w-full max-w-md shadow-sm studio-card">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-2">Admin Portal</h2>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Secure Infrastructure</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identity (Email)</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                                    placeholder="admin@ambalavanan.me"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Access Key (Password)</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 px-6 bg-text hover:bg-primary text-white font-bold rounded-xl transition-all shadow-lg shadow-text/5 hover:shadow-primary/20 transform active:scale-95"
                        >
                            Execute Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8 text-text transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 sm:mb-16 bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] shadow-sm">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight uppercase">
                            Admin <span className="text-primary italic">Control</span>
                        </h1>
                        <p className="text-slate-500 mt-2 text-[10px] font-bold uppercase tracking-[0.2em]">System Management Infrastructure</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-50 rounded-xl border border-slate-200">
                            <span className="text-primary font-extrabold">{reviews.length}</span> <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1 sm:ml-2">Logs</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 bg-white text-red-500 hover:bg-red-50 border border-red-100 rounded-xl transition-all font-bold text-[10px] sm:text-xs uppercase tracking-widest shadow-sm"
                        >
                            <LogOut size={16} />
                            <span>Exit</span>
                        </button>
                    </div>
                </header>

                <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
                    {[
                        { id: 'reviews', label: 'Reviews', icon: MessageSquare },
                        { id: 'users', label: 'Identity', icon: Users },
                        { id: 'resume', label: 'Resume', icon: FileText }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 sm:flex-none flex justify-center items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all border ${
                                activeTab === tab.id 
                                ? 'bg-text text-white border-text shadow-lg' 
                                : 'bg-white text-slate-500 border-slate-200 hover:border-text hover:text-text'
                            }`}
                        >
                            <tab.icon size={16} className="hidden sm:block" /> {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'resume' ? (
                    <ResumeManager />
                ) : activeTab === 'reviews' ? (
                    <div className="grid gap-6">
                        {reviews.length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No active logs available.</p>
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className={`p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border studio-card bg-white transition-all duration-300 ${review.status === 'pending'
                                        ? 'border-primary/20 bg-primary/[0.02]'
                                        : 'border-slate-200'
                                        }`}
                                >
                                    <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10">
                                        <div className="flex-grow space-y-4 sm:space-y-6">
                                            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                                                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-extrabold text-base sm:text-xl text-primary">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-lg sm:text-xl font-extrabold text-text tracking-tight truncate">{review.name}</h3>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{review.email}</p>
                                                </div>
                                                {review.status === 'pending' && (
                                                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                                                        <Clock size={10} /> Pending Review
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <StarRating rating={review.rating} />
                                            </div>

                                            <p className="text-text font-medium text-base sm:text-lg leading-relaxed italic">
                                                "{review.comment}"
                                            </p>

                                            <div className="pt-4 border-t border-slate-100">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                                                    Entry Timestamp: {review.createdAt?.toDate().toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                                            {review.status === 'pending' && (
                                                <button
                                                    onClick={() => handleApprove(review.id)}
                                                    className="w-full lg:w-48 px-6 py-3 bg-text hover:bg-primary text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest"
                                                >
                                                    <Check size={16} /> Authorize
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handlePin(review.id, review.isPinned)}
                                                className={`w-full lg:w-48 px-6 py-3 font-bold rounded-xl transition-all border text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${review.isPinned
                                                    ? 'bg-yellow-50 border-yellow-200 text-yellow-600 hover:bg-yellow-100'
                                                    : 'bg-white border-slate-200 text-slate-500 hover:border-text hover:text-text'
                                                    }`}
                                            >
                                                {review.isPinned ? <PinOff size={16} /> : <Pin size={16} />}
                                                {review.isPinned ? 'Unpin' : 'Pin'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review.id)}
                                                className="w-full lg:w-48 px-6 py-3 bg-white hover:bg-red-50 text-red-500 font-bold rounded-xl transition-all border border-red-100 flex items-center justify-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest"
                                            >
                                                <Trash2 size={16} /> Purge
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-10">
                        <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-slate-200 studio-card">
                            <h2 className="text-lg sm:text-xl font-extrabold text-text uppercase tracking-tight mb-8 flex items-center gap-3">
                                <Users size={20} className="text-primary" /> Active Operators: {adminUsers.length}
                            </h2>
                            <div className="space-y-4">
                                {adminUsers.length === 0 ? (
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No secondary operators detected.</p>
                                ) : (
                                    adminUsers.map(user => (
                                        <div key={user.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 transition-all hover:border-primary/20">
                                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-primary shrink-0">
                                                {user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-text font-bold truncate tracking-tight">{user.email}</h3>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    Registered: {user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : 'Active'}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-slate-200 studio-card">
                            <h2 className="text-lg sm:text-xl font-extrabold text-text uppercase tracking-tight mb-8">Provision Operator</h2>
                            <form onSubmit={handleAddAdmin} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operator Identity (Email)</label>
                                    <input
                                        type="email"
                                        value={newAdminEmail}
                                        onChange={(e) => setNewAdminEmail(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                                        placeholder="operator@system.infra"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security Token (Password)</label>
                                    <input
                                        type="password"
                                        value={newAdminPassword}
                                        onChange={(e) => setNewAdminPassword(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                                        placeholder="Min. 6 alphanumeric"
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isCreatingUser}
                                    className="w-full py-4 px-6 bg-text hover:bg-primary text-white font-bold rounded-xl transition-all shadow-lg shadow-text/5 hover:shadow-primary/20 flex justify-center items-center gap-3 active:scale-95 disabled:opacity-50"
                                >
                                    {isCreatingUser ? 'Processing...' : 'Provision Operator'}
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
