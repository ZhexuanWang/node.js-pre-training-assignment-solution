import {TodoApi, TodoNotFoundError} from './todo-api';
import {Todo, TodoStatus} from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) { }

  async create(title: string, description = ''): Promise<Todo> {
    if (!title || title.trim() === '') {
      throw new Error('Title cannot be empty');
    }
    return this.api.add({ title: title.trim(), description });
  }

  async toggleStatus(id: number): Promise<Todo> {
    const todos = await this.api.getAll();
    const todo = todos.find(t => t.id === id);
    if (!todo) throw new TodoNotFoundError(id);

    const nextStatus = todo.status === TodoStatus.COMPLETED
        ? TodoStatus.PENDING
        : TodoStatus.COMPLETED;

    return this.api.update(id, { status: nextStatus });
  }

  async search(keyword: string): Promise<Todo[]> {
    if (!keyword || keyword.trim() === '') {
      throw new Error('Search keyword cannot be empty');
    }
    const todos = await this.api.getAll();
    const lower = keyword.toLowerCase();

    return todos.filter(todo =>
        todo.title.toLowerCase().includes(lower) ||
        todo.description?.toLowerCase().includes(lower)
    );
  }

  async getAll(): Promise<Todo[]> {
    return this.api.getAll();
  }
}
