import React, { useState, useEffect } from 'react';
import { Check, LoaderCircle, Send } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import StarRating from './StarRating';

const ReviewForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const hasSubmitted = localStorage.getItem('review_submitted');
        if (hasSubmitted) {
            setIsSubmitted(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitted) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'reviews'), {
                name,
                email,
                comment,
                rating,
                status: 'pending',
                createdAt: serverTimestamp(),
            });

            localStorage.setItem('review_submitted', 'true');
            setIsSubmitted(true);
            toast.success('User review submitted! Pending approval.');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="p-8 bg-green-50 border border-green-200 rounded-3xl text-center shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                <p className="text-slate-600 leading-relaxed">User review submitted. It will be visible once approved by the administrator.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 transition-colors duration-300">
            <div className="mb-2">
                <h3 className="text-2xl font-bold text-slate-900">
                    Write a Review
                </h3>
                <p className="text-slate-500 text-sm">Share your experience with my projects.</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                <StarRating rating={rating} setRating={setRating} interactive />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="Your Email"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Comment</label>
                <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-32 resize-none"
                    placeholder="Share your thoughts..."
                />
            </div>

            <div className="flex flex-col items-end pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-3 rounded-lg font-medium text-white shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" /> Submitting...
                        </>
                    ) : (
                        <>
                            Submit Review <Send className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;
