"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import CardValue from './maincard'; // Ensure the correct import path for your CardValue component

interface Todo {
    id: number;
    title: string;
    description: string;
    iscomplete: boolean;
}

interface TodoWithLoading extends Todo {
    isLoading?: boolean; // Optional property for loading state
}

export default function Alltodos() {
    const [todos, setTodos] = useState<TodoWithLoading[]>([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchTodos = async () => {
            if (status === 'authenticated') {
                try {
                    const response = await axios.get('/api/todos');
                    setTodos(response.data.map((todo: Todo) => ({ ...todo, isLoading: false })));
                } catch (error) {
                    console.error('Error fetching todos:', error);
                }
            }
        };

        fetchTodos();

        const interval = setInterval(fetchTodos, 2000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [status]);

    const handleComplete = async (id: number) => {
        try {
            // Optimistic update
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, iscomplete: true, isLoading: true } : todo
            ));

            await axios.put(`/api/todos/${id}`, {});
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, iscomplete: true, isLoading: false } : todo
            ));
        } catch (error) {
            console.error('Error updating todo status:', error);
            // Rollback on error
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, iscomplete: false, isLoading: false } : todo
            ));
        }
    };

    if (status === 'loading') {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (status === 'unauthenticated') {
        return <div className="text-center text-white">Please log in to see your todos.</div>;
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mx-auto max-w-7xl">
            <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-transparent bg-clip-text">Your Todos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {todos.map(todo => (
                    <CardValue 
                        key={todo.id} 
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        iscomplete={todo.iscomplete}
                        onComplete={handleComplete}
                        isLoading={todo.isLoading} // Pass the loading state
                    />
                ))}
            </div>
        </div>
    );
}
