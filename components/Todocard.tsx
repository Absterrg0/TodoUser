"use client";

import { useState } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";

export default function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { data: session } = useSession();

    const handleClick = async () => {
        if (!session?.user) {
            alert("You must be signed in to create a todo");
            return;
        }
        try {
            const res = await axios.post("/api/todos", {
                title,
                description,
                userid: session.user.id
            });
            if (res.status === 200) {
                alert("Todo Added");
                setTitle("");
                setDescription("");
            }
        } catch (e) {
            console.error(e);
            alert("Error adding todo");
        }
    };

    const handleDelete = async () => {
        if (!session?.user) {
            alert("You must be signed in to delete todos");
            return;
        }
        try {
            const res = await axios.delete(`/api/delete?userid=${session.user.id}`);
            if (res.status === 200) {
                alert("All todos deleted");
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting todos");
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mx-auto mb-8 max-w-3xl">
            <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-transparent bg-clip-text">Create a New Todo</h2>
            <div className="space-y-4">
                <div className="flex flex-col mb-4">
                    <label className="text-lg text-gray-300 mb-2">Title:</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Set Title"
                        value={title}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-lg text-gray-300 mb-2">Description:</label>
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Set Description"
                        value={description}
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={handleClick}
                        className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        Create Todo
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        Delete All Todos
                    </button>
                </div>
            </div>
        </div>
    );
}
