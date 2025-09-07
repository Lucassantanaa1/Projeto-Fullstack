'use client';

import { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { api } from '@/service/api';



interface Task {
  id: number;
  title: string;
  status: 'pendente' | 'feito';
}

export default function NewTaskPage() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'pendente' | 'feito'>('pendente');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch {
      setError('Falha ao carregar tarefas');
    }
  }

  async function saveTask() {
    if (!title.trim()) return;
    try {
      if (editingTask) {
        const { data } = await api.put(`/tasks/${editingTask.id}`, {
          ...editingTask,
          title,
        });
        setTasks(tasks.map(t => (t.id === data.id ? data : t)));
        setEditingTask(null);
      } else {
        const { data } = await api.post('/tasks', {
          title,
          status: 'pendente',
        });
        setTasks([...tasks, data]);
      }
      setTitle('');
      setError(null);
    } catch {
      setError('Erro ao salvar tarefa');
    }
  }

  async function deleteTask(id: number) {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      setError('Erro ao deletar tarefa');
    }
  }

  async function markAsDone(id: number) {
    try {
      const { data } = await api.put(`/tasks/${id}`, { status: 'feito' });
      setTasks(tasks.map(t => (t.id === id ? data : t)));
    } catch {
      setError('Erro ao atualizar status');
    }
  }

  function startEditing(task: Task) {
    setEditingTask(task);
    setTitle(task.title);
  }

  function cancelEditing() {
    setEditingTask(null);
    setTitle('');
    setError(null);
  }

  const filteredTasks = tasks.filter(t => t.status === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-lg w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Minhas Tarefas</h1>

        {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded mb-4">{error}</div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Digite sua tarefa"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={saveTask}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-all duration-200"
          >
            {editingTask ? 'Salvar' : 'Criar'}
          </button>
          {editingTask && (
            <button
              onClick={cancelEditing}
              className="ml-2 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
          )}
        </div>

        <div className="flex gap-4 mb-4">
          {(['pendente', 'feito'] as const).map(status => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`w-full p-2 rounded text-white ${
                activeTab === status
                  ? status === 'pendente'
                    ? 'bg-red-600'
                    : 'bg-green-600'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {status === 'pendente' ? 'Pendente' : 'Feito'}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {filteredTasks.map(task => (
            <li
              key={task.id}
              className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 flex justify-between items-center shadow-sm hover:bg-gray-50 transition"
            >
              <span className={`text-gray-800 ${task.status === 'feito' ? 'line-through' : ''}`}>
                {task.title}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => startEditing(task)}
                  title="Editar"
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  title="Deletar"
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                {task.status !== 'feito' && (
                  <button
                    onClick={() => markAsDone(task.id)}
                    className="text-green-500 hover:text-green-700"
                    title="Marcar como Feito"
                  >
                    <FaCheck />
                  </button>
                )}
              </div>
            </li>
          ))}
          {filteredTasks.length === 0 && (
            <li className="text-center text-gray-500">Nenhuma tarefa {activeTab}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
