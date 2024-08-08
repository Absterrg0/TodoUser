"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleGetStartedClick = () => {
        if (session) {
            router.push('/user/todo'); // Redirect to user's Todo list
        } else {
            router.push('/api/auth/signup'); // Redirect to signup page if not logged in
        }
    };

    return (
        <div className="bg-gray-900 text-white">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("/hero-background.jpg")' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center p-6 md:p-12">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        Welcome to TaskMaster
                    </h1>
                    <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
                        Organize and manage your tasks efficiently with our powerful tool. Start optimizing your productivity today!
                    </p>
                    <button 
                        className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        onClick={handleGetStartedClick} 
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6 bg-gray-800">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 text-transparent bg-clip-text">
                        Key Features
                    </h2>
                    <p className="text-lg font-light max-w-2xl mx-auto">
                        Discover the key features that make TaskMaster the ultimate tool for task management.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-around">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-sm mx-auto mb-6 md:mb-0">
                        <h3 className="text-2xl font-semibold mb-4">Easy Task Creation</h3>
                        <p className="text-gray-300">
                            Quickly add and organize your tasks with an intuitive interface that adapts to your needs.
                        </p>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-sm mx-auto mb-6 md:mb-0">
                        <h3 className="text-2xl font-semibold mb-4">Real-time Sync</h3>
                        <p className="text-gray-300">
                            Keep your tasks updated across all devices with real-time synchronization.
                        </p>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                        <h3 className="text-2xl font-semibold mb-4">Collaborative Tools</h3>
                        <p className="text-gray-300">
                            Share tasks and collaborate with others seamlessly to achieve common goals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 px-6 bg-gray-900">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg mb-8">
                        Sign up now to experience the full potential of TaskMaster and boost your productivity!
                    </p>
                    <button 
                        className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        onClick={handleGetStartedClick} 
                    >
                        Sign Up
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 bg-gray-800 text-center">
                <p className="text-gray-400">
                    &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
