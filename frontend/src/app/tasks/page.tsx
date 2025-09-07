
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/service/api';

interface Task {
  id: number;
  title: string;
  status: 'pendente' | 'feito';
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await api.get('/tasks');
        setTasks(data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Tarefas</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center mb-4">
              <span>{task.title}</span>
              <div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => router.push(`/tasks/edit/${task.id}`)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(task.id)}
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="w-full bg-green-500 text-white p-2 rounded mt-4"
          onClick={() => router.push('/tasks/new')}
        >
          Criar Nova Tarefa
        </button>
      </div>
    </div>
  );
};

export default TasksPage;
 