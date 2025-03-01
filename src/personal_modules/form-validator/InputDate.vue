<template>
    <label v-if="label" :for="idToSet" :class="labelClass ?? [inputGroup ? 'input-group-text' : 'form-label mb-1']"
        :style="labelStyle">
        <template v-if="label === true"> {{ idToSet }} </template>
        <span v-else v-html="label"></span>
        <span v-if="required" class="text-danger">*</span>
    </label>
    <input ref="inputRef" type="date" v-model="value" :class="[classValidator, $attrs.class ?? 'form-control']"
        :style="$attrs.style" :id="idToSet" :name="idToSet" data-bs-toggle="tooltip" data-bs-custom-class="bg-danger"
        :data-bs-title="lableDefaultText" :placeholder="placeholder" :autocomplete="autocomplete" :disabled="disabled"
        :readonly="readonly" :required="required" :autofocus="autofocus" :max="max" :min="min" :step="step">

</template>

<script>
import { Tooltip } from 'bootstrap';
export default {
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
        required: { type: Boolean, default: true },
        autofocus: { type: Boolean, default: false },
        max: { type: Number, required: false },
        min: { type: Number, required: false },
        step: { type: Number, required: false },
        autocomplete: { type: String, required: false },
        placeholder: { type: String, required: false },
    },
    data() {
        return {};
    },
    methods: {},
    computed: {
        value: {
            get() {
                if (!(this.modelValue[this.field] instanceof Date) || isNaN(this.modelValue[this.field])) return "";
                // SE HO PROBLEMI DI FUSORARIO
                // const offset = this.modelValue[this.field].getTimezoneOffset() * 60000; // Offset in millisecondi
                // return new Date(this.modelValue[this.field].getTime() - offset).toISOString().split('T')[0];
                return this.modelValue[this.field].toISOString().split('T')[0];
            },
            set(value) {
                this.modelValue[this.field] = new Date(value);
                this.modelValue.checkField(this.field);
                if (this.onChange) { this.onChange(value, this.field); }
            }
        },
        idToSet() {
            return this.id ?? this.field;
        },
        lableDefaultText() {
            return this.errorContent ? this.errorContent : `Seleziona una data valida.`;
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
        formattedValue() {
            if (!(this.value instanceof Date) || isNaN(this.value)) return "";
            const offset = this.value.getTimezoneOffset() * 60000; // Offset in millisecondi
            return new Date(this.value.getTime() - offset).toISOString().split('T')[0];
        }
    },
    mounted() {
        this.modelValue.initField(this.field, 'text', this.required ? this.validation : false);
        this.tooltips = new Tooltip(this.$refs.inputRef);
        this.tooltips.disable();
    },
    unmounted() {
        if (this.tooltips) { this.tooltips.dispose(); }
    }
};
</script>

<style lang="scss" scoped></style>
