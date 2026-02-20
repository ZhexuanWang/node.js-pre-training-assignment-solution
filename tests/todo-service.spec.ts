import { TodoService } from '../JS-TS/solutions/todo-service';
import { TodoApi, TodoNotFoundError } from '../JS-TS/solutions/todo-api';
import { TodoStatus } from '../JS-TS/solutions/types';

async function run<T>(promise: Promise<T>): Promise<T> {
    return promise;
}

describe('TodoService', () => {
    let api: TodoApi;
    let service: TodoService;

    beforeEach(() => {
        api = new TodoApi();
        service = new TodoService(api);
    });

    describe('create', () => {
        it('should create a todo with correct title and default status', async () => {
            const todo = await run(service.create('Write tests'));

            expect(todo.id).toBe(1);
            expect(todo.title).toBe('Write tests');
            expect(todo.status).toBe(TodoStatus.PENDING);
            expect(todo.createdAt).toBeInstanceOf(Date);
        });

        it('should trim whitespace from title', async () => {
            const todo = await run(service.create('  Learn TypeScript  '));
            expect(todo.title).toBe('Learn TypeScript');
        });

        it('should set description when provided', async () => {
            const todo = await run(service.create('Title', 'Some description'));
            expect(todo.description).toBe('Some description');
        });

        it('should throw when title is empty', async () => {
            await expect(run(service.create(''))).rejects.toThrow('Title cannot be empty');
        });

        it('should throw when title is only whitespace', async () => {
            await expect(run(service.create('   '))).rejects.toThrow('Title cannot be empty');
        });
    });

    describe('toggleStatus', () => {
        it('should toggle PENDING to COMPLETED', async () => {
            const todo = await run(service.create('Toggle me'));
            expect(todo.status).toBe(TodoStatus.PENDING);

            const updated = await run(service.toggleStatus(todo.id));
            expect(updated.status).toBe(TodoStatus.COMPLETED);
        });

        it('should toggle COMPLETED back to PENDING', async () => {
            const todo = await run(service.create('Toggle me'));
            await run(service.toggleStatus(todo.id));                    // → COMPLETED
            const updated = await run(service.toggleStatus(todo.id));    // → PENDING
            expect(updated.status).toBe(TodoStatus.PENDING);
        });

        it('should throw TodoNotFoundError for non-existing id', async () => {
            await expect(run(service.toggleStatus(999)))
                .rejects.toThrow(TodoNotFoundError);
        });
    });

    describe('search', () => {
        beforeEach(async () => {
            await run(service.create('Learn TypeScript', 'study types'));
            await run(service.create('Write Jest tests', 'unit testing'));
            await run(service.create('Deploy to production'));
        });

        it('should find todos matching title (case-insensitive)', async () => {
            const results = await run(service.search('typescript'));
            expect(results).toHaveLength(1);
            expect(results[0].title).toBe('Learn TypeScript');
        });

        it('should find todos matching description', async () => {
            const results = await run(service.search('unit testing'));
            expect(results).toHaveLength(1);
            expect(results[0].title).toBe('Write Jest tests');
        });

        it('should return multiple results when keyword matches several todos', async () => {
            const results = await run(service.search('e'));  // 三个 title 都含有 e
            expect(results.length).toBeGreaterThanOrEqual(2);
        });

        it('should return empty array when no match', async () => {
            const results = await run(service.search('xyz'));
            expect(results).toHaveLength(0);
        });

        it('should throw when keyword is empty', async () => {
            await expect(run(service.search(''))).rejects.toThrow('Search keyword cannot be empty');
        });
    });
});