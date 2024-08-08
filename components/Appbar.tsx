"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AppBar() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignIn = () => {
        signIn();
    };

    const handleSignUp = () => {
        router.push('/api/auth/signup');
    };

    const handleSignOut = () => {
        signOut();
    };

    return (
        <div className="bg-slate-900 text-slate-200">
            <div className="flex justify-between items-center p-4">
                <div className="text-2xl font-bold">
                    TaskMaster
                </div>
                <div className="flex items-center space-x-4">
                    {session ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-xl font-semibold">
                                Hello, {session.user?.username}
                            </span>
                            <button
                                onClick={handleSignOut}
                                className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <button
                                onClick={handleSignIn}
                                className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={handleSignUp}
                                className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
