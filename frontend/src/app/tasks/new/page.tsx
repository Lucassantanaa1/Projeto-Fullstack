'use client';

import { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Task {
  id: number;
  title: string;
  status: 'pendente' | 'feito';
}

export default function NewTaskPage() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'pendente' | 'feito'>('pendente');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/tasks');
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    if (!title.trim()) return;

    const newTask = {
      title,
      status: 'pendente',
    };

    try {
      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setTitle('');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const handleSaveTask = async () => {
    if (!title.trim() || editingTaskId === null) return;

    const updatedTask = {
      id: editingTaskId,
      title,
      status: 'pendente',
    };

    try {
      const response = await fetch(`http://localhost:3001/tasks/${editingTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      const updated = await response.json();
      setTasks(tasks.map((task) => (task.id === editingTaskId ? updated : task)));
      setTitle('');
      setIsEditing(false);
      setEditingTaskId(null);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleEditTask = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTitle(task.title);
      setIsEditing(true);
      setEditingTaskId(id);
    }
  };

  const handleChangeStatus = async (id: number, status: 'feito') => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error('Erro ao mudar status:', error);
    }
  };

  const filterTasks = (status: 'pendente' | 'feito') => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-lg w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Minhas Tarefas</h1>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite sua tarefa"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={isEditing ? handleSaveTask : handleCreateTask}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-all duration-200"
          >
            {isEditing ? 'Salvar' : 'Criar'}
          </button>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab('pendente')}
            className="w-full p-2 rounded bg-red-600 text-white"
          >
            Pendente
          </button>
          <button
            onClick={() => setActiveTab('feito')}
            className="w-full p-2 rounded bg-green-600 text-white"
          >
            Feito
          </button>
        </div>

        <ul className="space-y-3">
          {filterTasks(activeTab).map((task) => (
            <li
              key={task.id}
              className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 flex justify-between items-center shadow-sm hover:bg-gray-50 transition"
            >
              <span
                className={`text-gray-800 ${task.status === 'feito' ? 'line-through' : ''}`}
              >
                {task.title}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEditTask(task.id)}
                  title="Editar"
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  title="Deletar"
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                {task.status !== 'feito' && (
                  <button
                    onClick={() => handleChangeStatus(task.id, 'feito')}
                    className="text-green-500 hover:text-green-700"
                    title="Marcar como Feito"
                  >
                    <FaCheck />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
