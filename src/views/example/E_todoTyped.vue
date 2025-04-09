<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>TodoTyped</h1>
      </div>
      <div class="col-12 col-md-6 border border-light pb-3">
        <h3>All type</h3>
        <p v-for="(todoType, key) in todoTypes" :key="key">{{ `${key}:${todoType}` }}</p>
      </div>
      <form @submit.prevent="handleSubmitTypes" class="col-12 col-md-6 border border-light pb-3">
        <h3>Add type</h3>
        <div class="input-group">
          <InputText field="todoType" lazy v-model="formType" inputGroup required />
          <Btn type="submit" :loading="loadingSenderType" googleIcon="send"></Btn>
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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(todo, key, i) in todos" :key="key" :id="key">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ todo.type }}</td>
              <td>{{ todo.task }}</td>
              <td>{{ $u.dateToEasyRead(todo.date) }}</td>
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
          <Btn type="submit" :loading="loadingSenderTodo" googleIcon="send"></Btn>
          <Btn @click="formTodo.reset()" googleIcon="replay"></Btn>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
// TODO add loading state in form.state di form-validator
import Btn from '../../components/Btn.vue';
import FormValidator from '../../personal_modules/form-validator/FormValidator';
import InputText from '../../personal_modules/form-validator/InputText.vue';
import InputDatetime from '../../personal_modules/form-validator/InputDatetime.vue';
import InputSelect from '../../personal_modules/form-validator/InputSelect.vue';
import { todoTypes, todos } from '../../stores/todos';
export default {
  components: { InputText, InputDatetime, InputSelect, Btn },
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
      loadingSenderType: false,
      loadingSenderTodo: false
    };
  },
  methods: {
    async handleSubmitTypes() {
      if (this.formType.check()) {
        const resorce = this.formType.get()?.todoType
        if (resorce !== undefined) {
          this.loadingSenderType = true;
          await todoTypes.add(resorce);
          this.loadingSenderType = false;
          this.formType.reset();
          this.todoTypes.saveLocal();
        }
      }
    },
    async handleSubmitTodo() {
      if (this.formTodo.check()) {
        const resorce = this.formTodo.get();
        if (resorce !== undefined) {
          this.loadingSenderTodo = true;
          todos.addAndSyncLocal(resorce);
          this.loadingSenderTodo = false;
          this.formTodo.reset();
        }
      } else {

      }

    }
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
    console.log(todos);

    this.todos.assignLocal().get();
    this.todoTypes.assignLocal().get();
  }
}
</script>

<style lang="scss" scoped></style>
