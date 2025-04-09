<!-- InputDatetime -->
<template>
    <label v-if="label || label === ''" :for="idToSet"
        :class="labelClass ?? [inputGroup ? 'input-group-text' : 'form-label mb-1']" :style="labelStyle">
        <template v-if="label === true || label === ''"> {{ idToSet }} </template>
        <span v-else v-html="label"></span>
        <span v-if="required" class="text-danger">*</span>
    </label>
    <input ref="inputRef" type="datetime-local" v-model="value"
        :class="[classValidator, $attrs.class ?? 'form-control']" :style="$attrs.style" :id="idToSet" :name="idToSet"
        data-bs-toggle="tooltip" data-bs-custom-class="bg-danger" :data-bs-title="errorDefaultText"
        :placeholder="placeholder" :autocomplete="autocomplete" :disabled="disabled" :readonly="readonly"
        :required="required" :autofocus="autofocus" :max="maxToSet" :min="minToSet" :step="step">

</template>

<script>
import { Tooltip } from 'bootstrap';
import { dateTimetoStringInput } from './utility/toStringInput.js';
export default {
    name: 'InputDatetime',
    props: {
        field: { type: String, required: true },
        modelValue: { type: Object, required: true },
        validation: { type: Object, default: {} },
        errorContent: { type: String, required: false },
        onChange: { type: Function, required: false },
        inputGroup: { type: Boolean, default: false },
        id: { type: String, required: false },
        label: { type: [String, Boolean], required: false },
        labelClass: { type: String, required: false },
        labelStyle: { type: String, required: false },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        required: { type: Boolean, default: undefined },
        autofocus: { type: Boolean, default: false },
        max: { type: [String, Date], required: false },
        min: { type: [String, Date], required: false },
        step: { type: Number, required: false },
        autocomplete: { type: String, required: false },
        placeholder: { type: String, required: false },
    },
    data() { return {}; },
    methods: {
    },
    computed: {
        value: {
            get() {
                const res = dateTimetoStringInput(this.modelValue[this.field]);
                return res ? res : '';
            },
            set(value) {
                let data = new Date(value);
                this.modelValue[this.field] = data;
                const check = this.modelValue.checkField(this.field);
                if (this.onChange) { this.onChange({ value, check, field: this.field }); };
                this.modelValue.triggerOnChange(value, check, this.field);
            }
        },
        idToSet() {
            return this.id ?? this.field;
        },
        minToSet() {
            return this.min ? dateTimetoStringInput(this.min) : (this.validation?.min ? dateTimetoStringInput(this.validation.min) : false);
        },
        maxToSet() {
            return this.max ? dateTimetoStringInput(this.max) : (this.validation?.max ? dateTimetoStringInput(this.validation.max) : false);
        },
        errorDefaultText() {
            return this.errorContent ? this.errorContent : `Seleziona una data${this.minToSet ? ', dopo il ' + new Date(this.minToSet).toLocaleString() : ''}${this.maxToSet ? ', prima del ' + new Date(this.maxToSet).toLocaleString() : ''}.`;
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
            return classValidator
        },
    },
    created() {
        if (this.modelValue === undefined) {
            throw new Error("non hai passato form in v-model o errato");
        }
    },
    mounted() {
        let validation = this.validation
        if (this.required) validation = { required: this.required, ...validation };
        if (this.minToSet) validation = { min: this.minToSet, ...validation };
        if (this.maxToSet) validation = { max: this.maxToSet, ...validation };
        this.modelValue.initField(this.field, 'datetime-local', validation);
        this.tooltips = new Tooltip(this.$refs.inputRef);
        this.tooltips.disable();
    },
    unmounted() {
        if (this.tooltips) { this.tooltips.dispose(); }
    }
};
</script>

<style lang="scss" scoped></style>
