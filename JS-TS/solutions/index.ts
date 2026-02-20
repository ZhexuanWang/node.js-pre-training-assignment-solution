import {addTodo, updateTodo} from "./todo-crud";
import {createTodo} from "./todo-factory";
import {TodoStatus} from "./types";

const state = [];
const todo = createTodo({ title: 'Write tests' });
const state2 = addTodo(state, todo);
const state3 = updateTodo(state2, todo.id, { status: TodoStatus.COMPLETED });