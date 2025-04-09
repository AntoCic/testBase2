import { reactive } from 'vue';
import TodoType from '../models/TodoType.js';
import log from '../personal_modules/log.js';
import Todo from '../models/Todo.js';

export const todoTypes = reactive(new TodoType());
export const todos = reactive(new Todo());