import { InMemoryRepository } from './repository';
import { Todo, NewTodo } from './types';
import { createTodo } from './todo-factory';

export class TodoNotFoundError extends Error {
  constructor(id: number) {
    super(`Todo with id ${id} not found`);
    this.name = 'TodoNotFoundError';
  }
}

function delay(): Promise<void> {
  const ms = Math.random() * 300 + 300;
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();

  async getAll(): Promise<Todo[]> {
    await delay();
    return this.repo.findAll();
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await delay();
    const todo = createTodo(newTodo);
    return this.repo.add(todo);  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await delay();
    if (!this.repo.findById(id)) throw new TodoNotFoundError(id);
    return this.repo.update(id, update);
  }

  async remove(id: number): Promise<void> {
    await delay();
    if (!this.repo.findById(id)) throw new TodoNotFoundError(id);
    this.repo.remove(id);  }
}
