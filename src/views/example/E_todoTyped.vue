<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>TodoTyped</h1>
      </div>
      <div class="col-12 col-md-6 border border-light pb-3">
        <h3>All type</h3>

        <div class="input-group mb-3" v-for="(todoType, key) in todoTypes" :key="key">
          <span class="input-group-text form-control">
            {{ todoType }}
          </span>
          <BtnModal :name="'deleteTodoType' + key" class="btn btn-outline-secondary rounded-end"
            @onConfirm="handleDeleteTypes(key)" />
        </div>
      </div>

      <form @submit.prevent="handleSubmitTypes" class="col-12 col-md-6 border border-light pb-3">
        <h3>Add type</h3>
        <div class="input-group">
          <InputText field="todoType" lazy v-model="formType" inputGroup required />
          <Btn type="submit" :loading="formType.state._loading" googleIcon="send"></Btn>
          <Btn @click="formType.reset()" googleIcon="replay"></Btn>
        </div>
      </form>
    </div>

    <div class="row justify-content-center text-center my-5">
      <div class="col-12 mb-3">
        <h1>Todo</h1>
      </div>
      <div class="col-12 col-md-6 border border-light pb-3">
        <h3>All Todo</h3>
        <table class="table" v-if="$u.isNotEmpty(todos)">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">type</th>
              <th scope="col">task</th>
              <th scope="col">Data</th>
              <th scope="col"> </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(todo, key, i) in todos" :key="key" :id="key">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ todo.type }}</td>
              <td>{{ todo.task }}</td>
              <td>{{ $u.dateToEasyRead(todo.date) }}</td>
              <td>
                <BtnModal :name="'deleteTodo' + key" @onConfirm="todos.deleteAndSyncLocal(key)" />
              </td>
              <td>
                <button type="button" class="btn btn-outline-warning rounded-circle p-1 border-0" data-bs-toggle="modal"
                  :data-bs-target="`#editTodo`" @click="setCurrentTodoEdit(key)">
                  <span class="material-symbols-outlined d-block"> edit_square </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <form @submit.prevent="handleSubmitTodo" class="col-12 col-md-6 border border-light pb-3">
        <h3>Add Todo</h3>
        <div class="input-group">
          <InputSelect :options="optionsTodoTypes" field="type" v-model="formTodo" inputGroup />
          <InputText field="task" lazy v-model="formTodo" inputGroup required />
          <InputDatetime field="date" v-model="formTodo" inputGroup />
          <Btn type="submit" :loading="formTodo.state._loading" googleIcon="send"></Btn>
          <Btn @click="formTodo.reset()" googleIcon="replay"></Btn>
        </div>
      </form>
    </div>

  </div>

  <div class="modal fade text-dark" id="editTodo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="modalLabel" aria-hidden="true">
    <div :class="`modal-dialog modal-dialog-centered`">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5">Modifica</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="() => { }">
            <InputSelect label :options="optionsTodoTypes" field="type" v-model="formTodoEdit" />
            <InputText label labelClass="mt-2" field="task" lazy v-model="formTodoEdit" required />
            <InputDatetime label labelClass="mt-2" field="date" v-model="formTodoEdit" />
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">indietro</button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="editTodo">Modifica</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '../../components/Btn.vue';
import BtnModal from '../../components/BtnModal.vue';
import FormValidator from '../../personal_modules/form-validator/FormValidator';
import InputText from '../../personal_modules/form-validator/InputText.vue';
import InputDatetime from '../../personal_modules/form-validator/InputDatetime.vue';
import InputSelect from '../../personal_modules/form-validator/InputSelect.vue';
import { todoTypes, todos } from '../../stores/todos';
export default {
  components: { InputText, InputDatetime, InputSelect, Btn, BtnModal },
  data() {
    return {
      todoTypes,
      todos,
      formType: new FormValidator({ todoType: '' }),
      formTodo: new FormValidator({
        task: '',
        type: null,
        date: null,
      }),
      formTodoEdit: new FormValidator({
        task: '',
        type: null,
        date: null,
      }),
      currentEditing: ''
    };
  },
  methods: {
    async handleSubmitTypes() {
      if (this.formType.check()) {
        const resorce = this.formType.get()?.todoType
        if (resorce !== undefined) {
          this.formType.state._loading = true;
          await todoTypes.add(resorce);
          this.formType.state._loading = false;
          this.formType.reset();
          this.todoTypes.saveLocal();
        }
      }
    },
    async handleDeleteTypes(key) {
      todoTypes.deleteAndSyncLocal(key).then(() => { this.$toast.success('Deleted'); })

    },
    async handleSubmitTodo() {
      if (this.formTodo.check()) {
        const resorce = this.formTodo.get();
        if (resorce !== undefined) {
          this.formTodo.state._loading = true;
          await this.todos.addAndSyncLocal(resorce);
          this.formTodo.state._loading = false;

          this.formTodo.reset();
        }
      } else {

      }

    },
    async setCurrentTodoEdit(key) {
      const todo = this.todos[key];
      this.currentEditing = key

      this.formTodoEdit.task = todo.task
      this.formTodoEdit.type = todo.type
      this.formTodoEdit.date = new Date(todo.date)
    },
    async editTodo() {
      if (this.formTodoEdit.check()) {
        const resorce = this.formTodoEdit.get()
        if (resorce !== undefined) {
          const newData = { [this.currentEditing]: resorce }
          await this.todos.updateAndSyncLocal(newData);
        }
      }
    },
  },
  computed: {
    optionsTodoTypes() {
      const options = []
      for (const key in todoTypes) {
        options.push({ text: todoTypes[key], value: todoTypes[key] })
      }
      return options;
    }
  },
  created() {
    this.todos.assignLocal().get();
    this.todoTypes.assignLocal().get();
  }
}
</script>

<style lang="scss" scoped></style>
