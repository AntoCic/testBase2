<template>
    <label v-if="label || label === ''" :for="idToSet"
        :class="labelClass ?? [inputGroup ? 'input-group-text' : 'form-label mb-1']" :style="labelStyle">
        <template v-if="label === true || label === ''"> {{ idToSet }} </template>
        <span v-else v-html="label"></span>
        <span v-if="required" class="text-danger">*</span>
    </label>
    <select v-model="value" ref="inputRef" :class="[classValidator, $attrs.class ?? 'form-select']"
        :style="$attrs.style" :id="idToSet" :name="idToSet" data-bs-toggle="tooltip" data-bs-custom-class="bg-danger"
        :data-bs-title="errorDefaultText" :autocomplete="autocomplete" :disabled="disabled" :required="required"
        :autofocus="autofocus">
        <option v-if="emptyOption || emptyOption === ''" :value="null">
            {{ emptyOption === '' ? '---' : emptyOption }}
        </option>
        <option v-for="(option, index) in options" :key="field + 'Options-' + index" :value="option.value"
            :class="optionsClass" :style="optionsStyle">
            {{ option.text }}
        </option>
    </select>
</template>

<script>
import { Tooltip } from 'bootstrap';
export default {
    name: 'InputSelect',
    props: {
        field: { type: String, required: true },
        modelValue: { type: Object, required: true },
        validation: { type: Object, default: {} },
        errorContent: { type: String, required: false },
        onChange: { type: Function, required: false },
        options: { type: Array, required: true },
        id: { type: String, required: false },
        label: { type: [String, Boolean], required: false },
        emptyOption: { type: [String, Boolean], required: false },
        labelClass: { type: String, required: false },
        labelStyle: { type: String, required: false },
        optionsClass: { type: String, required: false },
        optionsStyle: { type: String, required: false },
        inputGroup: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        autofocus: { type: Boolean, default: false },
        autocomplete: { type: String, required: false },
        inputmode: { type: String, required: false },
    },
    data() { return {}; },
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
            return this.id ?? this.field
        },
        errorDefaultText() {
            return this.errorContent ? this.errorContent : `Devi selezionare un elemento`
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
        this.modelValue.initField(this.field, 'select', this.required ? this.validation : false);
        this.tooltips = new Tooltip(this.$refs.inputRef);
        this.tooltips.disable();
    },
    unmounted() {
        if (this.tooltips) { this.tooltips.dispose(); }
    }
};
</script>

<style lang="scss" scoped></style>
