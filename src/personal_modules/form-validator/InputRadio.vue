<template>
    <div ref="tooltipsRef" data-bs-toggle="tooltip" data-bs-custom-class="bg-danger" :data-bs-title="errorDefaultText" :class="classValidator">
        <label v-if="label || label === ''" :class="['form-label ms-1 mb-0', labelClass]" :style="labelStyle">
            <template v-if="label === true || label === ''"> {{ idToSet }} </template>
            <template v-else> <span v-html="label"></span> </template>
            <span v-if="required" class="text-danger">*</span>
        </label>
        <div :class="[containerClass ?? `form-check ${inputGroup ? ' form-control' : ''}`]" :style="containerStyle"
            v-for="(option, index) in options" :key="field + 'Options-' + index">
            <input v-model="value" :class="optionsInputClass ?? 'form-check-input'" :style="optionsInputStyle"
                :value="option.value" type="radio" :id="field + 'Options-' + index" :name="field" :disabled="disabled">
            <label :for="field + 'Options-' + index" :class="optionsInputClass ?? 'form-check-label'" :style="optionsInputStyle">{{ option.text }}</label>
        </div>
    </div>
</template>

<script>
import { Tooltip } from 'bootstrap';
export default {
    name: 'InputRadio',
    props: {
        field: { type: String, required: true },
        modelValue: { type: Object, required: true },
        validation: { type: Object, default: {} },
        errorContent: { type: String, required: false },
        onChange: { type: Function, required: false },
        id: { type: String, required: false },
        options: { type: Array, required: true },
        label: { type: [String, Boolean], required: false },
        containerClass: { type: String, required: false },
        containerStyle: { type: String, required: false },
        labelClass: { type: String, required: false },
        labelStyle: { type: String, required: false },
        optionsInputClass: { type: String, required: false },
        optionsInputStyle: { type: String, required: false },
        optionsLableClass: { type: String, required: false },
        optionsLableStyle: { type: String, required: false },
        disabled: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        inputGroup: { type: Boolean, default: false },
    },
    data() { return {  }; },
    computed: {
        value: {
            get() {
                return this.modelValue[this.field];
            },
            set(value) {
                this.modelValue[this.field] = value;
                const check = this.modelValue.checkField(this.field);
                if (this.onChange) { this.onChange({ value, check, field: this.field }); };
                this.modelValue.triggerOnChange(value, check, this.field);
            }
        },
        idToSet() {
            return this.id ?? this.field;
        },
        errorDefaultText() {
            return this.errorContent ? this.errorContent : this.validation?.required === false ? `È obbligatorio deselezionare questo campo` : `È obbligatorio`;
        },
        classValidator() {
            const classValidator = this.modelValue.classValidator(this.field);
            if (!this.tooltips) return classValidator;
            switch (classValidator) {
                case '':
                case 'is-valid':
                    this.tooltips.disable();
                    this.tooltips.hide();
                    break;
                default:
                    this.tooltips._isHovered = null;
                    this.tooltips.enable();
                    this.tooltips.show();
                    break;
            }
            return classValidator;
        },
    },
    mounted() {
        this.modelValue.initField(this.field, 'radio', this.required ? this.validation : false);
        this.tooltips = new Tooltip(this.$refs.tooltipsRef);
        this.tooltips.disable();
    },
    unmounted() {
        if (this.tooltips) {
            this.tooltips.dispose();
        }
    }
};
</script>

<style lang="scss" scoped></style>
