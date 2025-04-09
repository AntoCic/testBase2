<template>
    <label v-if="label || label === ''" :for="idToSet" :class="labelClass ?? [inputGroup ? 'input-group-text' : 'form-label mb-1']"
        :style="labelStyle">
        <template v-if="label === true || label === ''"> {{ idToSet }} </template>
        <span v-else v-html="label"></span>
        <span v-if="required" class="text-danger">*</span>
    </label>
    <input ref="inputRef" type="time" v-model="value" :class="[classValidator, $attrs.class ?? 'form-control']"
        :style="$attrs.style" :id="idToSet" :name="idToSet" data-bs-toggle="tooltip" data-bs-custom-class="bg-danger"
        :data-bs-title="errorDefaultText" :placeholder="placeholder" :autocomplete="autocomplete" :disabled="disabled"
        :readonly="readonly" :required="required" :autofocus="autofocus" :max="maxToSet" :min="minToSet" :step="step">

</template>

<script>
import { Tooltip } from 'bootstrap';
export default {
    name: 'InputTime',
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
        max: { type: String, required: false },
        min: { type: String, required: false },
        step: { type: Number, required: false },
        autocomplete: { type: String, required: false },
        placeholder: { type: String, required: false },
    },
    data() { return {  }; },
    methods: {
    },
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
        minToSet() {
            return this.min ?? (this.validation?.min ?? false);
        },
        maxToSet() {
            return this.max ?? (this.validation?.max ?? false);
        },

        errorDefaultText() {
            return this.errorContent ? this.errorContent : `Seleziona un orario valido${this.minToSet ? ', dopo le ' + this.minToSet  : ''}${this.maxToSet ? ', prima delle ' + this.maxToSet  : ''}.`;
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
    mounted() {
        let validation = this.validation
        if (this.required) validation = { required: this.required, ...validation };
        if (this.minToSet) validation = { min: this.minToSet, ...validation };
        if (this.maxToSet) validation = { max: this.maxToSet, ...validation };
        this.modelValue.initField(this.field, 'time', validation);
        this.tooltips = new Tooltip(this.$refs.inputRef);
        this.tooltips.disable();
    },
    unmounted() {
        if (this.tooltips) { this.tooltips.dispose(); }
    }
};
</script>

<style lang="scss" scoped></style>
