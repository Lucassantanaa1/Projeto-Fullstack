// src/tasks/task.entity.ts

/**
 * Entidade que representa uma tarefa no sistema.
 * Pode ser usada para tipagem e futuras integrações com banco de dados.
 */
export class Task {
  /** Identificador único da tarefa (UUID). */
  id: string;

  /** Título ou descrição curta da tarefa. */
  title: string;

  /** Status da tarefa: 'pendente' ou 'feito'. */
  status: 'pendente' | 'feito';
}
