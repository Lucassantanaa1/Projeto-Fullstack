  'use client';

  import { useState } from 'react';
  import { useRouter } from 'next/navigation';

  const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleLogin = () => {
      if (!username.trim() || !password.trim()) {
        setErrorMessage('Por favor, insira um nome de usuário e uma senha.');
        return;
      }

      // aqui o meu sistema crud Salva o nome de usuário no localStorage
      localStorage.setItem('username', username);

      // Redirecionar para a página de tarefas
      router.push('/tasks/new');
    };

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Login</h1>

          {/* Campo de entrada do nome de usuário */}
          <input
            type="text"
            placeholder="Digite seu nome"
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Campo de entrada da senha */}
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Exibição de mensagem de erro */}
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

          {/* Botão de login */}
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-500 text-white p-4 rounded-lg text-xl hover:bg-indigo-600 transition-all duration-200"
          >
            Login
          </button>
        </div>
      </div>
    );
  };
    
  export default LoginPage;

  