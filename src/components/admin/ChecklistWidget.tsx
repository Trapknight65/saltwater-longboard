"use client";
import { useState, useEffect } from 'react';
import { Task, subscribeToTasks, addTask, toggleTask, deleteTask } from '@/lib/firestore';
import { Trash2, Plus, CheckCircle, Circle } from 'lucide-react';

export default function ChecklistWidget() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const unsubscribe = subscribeToTasks(setTasks);
        return () => unsubscribe();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        try {
            await addTask(newTask);
            setNewTask('');
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="border border-stone-200 p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-pacific-700 font-serif">Checklist</h2>

            <form onSubmit={handleAdd} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task..."
                    className="flex-1 p-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-pacific-500 text-sm"
                />
                <button type="submit" className="p-2 bg-pacific-600 text-white rounded hover:bg-pacific-700">
                    <Plus size={18} />
                </button>
            </form>

            <div className="flex-1 overflow-y-auto max-h-64 space-y-2">
                {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between group p-2 hover:bg-stone-50 rounded">
                        <div className="flex items-center gap-3">
                            <button onClick={() => toggleTask(task.id, !task.completed)} className="text-stone-400 hover:text-pacific-600">
                                {task.completed ? <CheckCircle size={18} className="text-pacific-600" /> : <Circle size={18} />}
                            </button>
                            <span className={`text-sm ${task.completed ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                                {task.text}
                            </span>
                        </div>
                        <button onClick={() => deleteTask(task.id)} className="text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                {tasks.length === 0 && <p className="text-center text-stone-400 text-sm py-4">No tasks yet.</p>}
            </div>
        </div>
    );
}
