<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>TodoTyped</h1>
      </div>
      <div class="col-12 col-md-6 border border-light pb-3">
        <h3>All type</h3>
        <p v-for="todoType in todoTypes">{{ todoType }}</p>
      </div>
      <div class="col-12 col-md-6 border border-light pb-3">
        <h3>Add type</h3>
        <div class="input-group">
          <InputText field="todoType" lazy v-model="formType" inputGroup required />
          <Btn type="submit" @click="handleSubmit" :loading="loadingSenderType" googleIcon="send"></Btn>
          <Btn @click="formType.reset()" googleIcon="replay"></Btn>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import TodoType from '../../models/TodoType';
import Btn from '../../components/Btn.vue';
import FormValidator from '../../personal_modules/form-validator/FormValidator';
import InputText from '../../personal_modules/form-validator/InputText.vue';
import { todoTypes } from '../../stores/todos';
export default {
  components: { InputText, Btn },
  data() {
    return {
      todoTypes,
      formType: new FormValidator({ todoType: '' }),
      formTodo: new FormValidator({ task: '' }),
      loadingSenderType: false
    };
  },
  methods: {
   async handleSubmit() {
      if (this.formType.check()) {
        const resorce = this.formType.get()?.todoType
        if (resorce !== undefined) {
          this.loadingSenderType = true;
          await todoTypes.add(resorce);
          this.loadingSenderType = false;
        }
      }
      console.log(this.formType.check());
      console.log(this.formType.get());
    }
  },
  created() {
    this.todoTypes.get();
  }
}
</script>

<style lang="scss" scoped></style>
