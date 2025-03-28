import { reactive } from 'vue';
import TodoType from '../models/TodoType.js';
import log from '../personal_modules/log.js';

export const todoTypes = reactive(new TodoType());
// export const todo = reactive(new TodoType());