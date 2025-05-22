'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  // Buscar todas as tarefas
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
      });
      // Atualiza a lista de tarefas após deletar
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
          onClick={() => router.push('/tasks/new')}  // Aqui está o redirecionamento para a página de criação
        >
          Criar Nova Tarefa
        </button>
      </div>
    </div>
  );
};

export default TasksPage;
