<template>
    <input type="checkbox" v-model="value" :class="['btn-check']" :id="idToSet" :name="idToSet" :disabled="disabled"
        :readonly="readonly">
    <label v-if="label || label === ''" :for="idToSet" :class="[$attrs.class ?? 'btn btn-outline-primary', classValidator]"
        :style="$attrs.style" ref="tooltipsRef" data-bs-toggle="tooltip" data-bs-custom-class="bg-danger"
        :data-bs-title="errorDefaultText">
        <template v-if="label === true || label === ''"> {{ idToSet }} </template>
        <template v-else> <span v-html="label"></span> </template>
        <span v-if="required" class="text-danger">*</span>
    </label>

</template>

<script>
import { Tooltip } from 'bootstrap';
export default {
    name: 'InputBtnCheckbox',
    props: {
        field: { type: String, required: true },
        modelValue: { type: Object, required: true },
        validation: { type: Object, default: {} },
        errorContent: { type: String, required: false },
        onChange: { type: Function, required: false },
        id: { type: String, required: false },
        label: { type: [String, Boolean], required: false },
        disabled: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
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
            return this.errorContent ? this.errorContent : this.validation?.required === false ? `È obbligatorio deselezionare questo campo` : `È obbligatorio`
        },
        classValidator() {
            const classValidator = this.modelValue.classValidator(this.field);
            if (!this.tooltips) return classValidator;
            switch (classValidator) {
                case '':
                    this.tooltips.disable();
                    this.tooltips.hide();
                    return ''
                case 'is-valid':
                    this.tooltips.disable();
                    this.tooltips.hide();
                    return 'border-success';
                default:
                    this.tooltips._isHovered = null
                    this.tooltips.enable();
                    this.tooltips.show();
                    return 'border-danger';
            }
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
