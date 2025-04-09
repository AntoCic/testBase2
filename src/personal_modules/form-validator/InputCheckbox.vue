<template>
    <div :class="[inputGroup ? 'input-group-text' : undefined]" ref="tooltipsRef" data-bs-toggle="tooltip"
        data-bs-custom-class="bg-danger" :data-bs-title="errorDefaultText">
        <input type="checkbox" v-model="value"
            :class="['form-check-input', inputGroup ? 'mt-0' : undefined, inputClass, classValidator]"
            :style="inputStyle" :id="idToSet" :name="idToSet" :disabled="disabled" :readonly="readonly">
        <label v-if="label || label === ''" :for="idToSet" :class="['form-label ms-1 mb-0', labelClass]" :style="labelStyle">
            <template v-if="label === true || label === ''"> {{ idToSet }} </template>
            <template v-else> <span v-html="label"></span> </template>
            <span v-if="required" class="text-danger">*</span>
        </label>
    </div>
</template>

<script>
import { Tooltip } from 'bootstrap';
export default {
    name: 'InputCheckbox',
    props: {
        field: { type: String, required: true },
        modelValue: { type: Object, required: true },
        validation: { type: Object, default: {} },
        errorContent: { type: String, required: false },
        onChange: { type: Function, required: false },
        id: { type: String, required: false },
        label: { type: [String, Boolean], required: false },
        inputClass: { type: String, required: false },
        labelClass: { type: String, required: false },
        inputStyle: { type: String, required: false },
        labelStyle: { type: String, required: false },
        disabled: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
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
            if (!this.tooltips) return classValidator
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
        this.modelValue.initField(this.field, 'checkbox', (this.required || this.validation?.required !== undefined) ? this.validation : false);
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
