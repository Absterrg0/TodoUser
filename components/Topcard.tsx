"use client";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <header className="text-center mb-12">
                <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    Welcome to TaskMaster
                </h1>
                <p className="text-xl font-light mb-8">
                    Your ultimate tool to organize and manage your tasks efficiently. Start your journey to productivity today!
                </p>
            </header>
            
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-4">
                <div className="md:w-1/2 p-4">
                    <img 
                        src="/toppage.jpg" 
                        alt="Task Management Illustration" 
                        className="w-full h-auto rounded-lg shadow-2xl transition-transform transform hover:scale-105"
                    />
                </div>
                <div className="md:w-1/2 p-4">
                    <h2 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 text-transparent bg-clip-text">
                        Manage Your Tasks Efficiently
                    </h2>
                    <p className="text-lg mb-4">
                        With TaskMaster, you can create, edit, and organize your tasks in a way that fits your workflow. Stay on top of your goals with our easy-to-use interface and powerful features.
                    </p>
                    <button 
                        className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        onClick={() => window.location.href = '/api/auth/signup'} 
                    >
                        Get Started
                    </button>
                </div>
            </div>

            <footer className="text-center mt-12">
                <p className="text-gray-400">
                    &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
