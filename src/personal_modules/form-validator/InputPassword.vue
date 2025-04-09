<template>
    <label v-if="label || label === ''" :for="idToSet"
        :class="labelClass ?? [inputGroup ? 'input-group-text' : 'form-label mb-1']" :style="labelStyle">
        <template v-if="label === true || label === ''"> {{ idToSet }} </template>
        <span v-else v-html="label"></span>
        <span v-if="required" class="text-danger">*</span>
    </label>
    <input ref="inputRef" :type="typeToSet" :value="value" @input="handleInput" @change="handleChange"
        :class="[classValidator, $attrs.class ?? 'form-control']" :style="$attrs.style" :id="idToSet" :name="idToSet"
        data-bs-toggle="tooltip" data-bs-custom-class="bg-danger" :data-bs-title="errorDefaultText"
        :placeholder="placeholder" :autocomplete="autocomplete" :disabled="disabled" :readonly="readonly"
        :required="required" :autofocus="autofocus" :maxlength="maxToSet" :minlength="minToSet" :inputmode="inputmode">
    <button v-if="btnShow" type="button" :class="btnShowClass ?? 'btn btn-light'" @click="btnShowState = !btnShowState"
        :style="btnShowStyle">
        <span v-if="btnShowState" class="material-symbols-outlined">
            visibility
        </span>

        <span v-else class="material-symbols-outlined">
            visibility_off
        </span>
    </button>
</template>

<script>
import { Tooltip } from 'bootstrap';
export default {
    name: 'InputPassword',
    props: {
        field: { type: String, required: true },
        modelValue: { type: Object, required: true },
        lazy: { type: Boolean, default: false },
        validation: { type: Object, default: {} },
        errorContent: { type: String, required: false },
        onChange: { type: Function, required: false },
        show: { type: Boolean, default: undefined },
        inputGroup: { type: Boolean, default: false },
        id: { type: String, required: false },
        label: { type: [String, Boolean], required: false },
        labelClass: { type: String, required: false },
        labelStyle: { type: String, required: false },
        btnShow: { type: Boolean, required: false },
        btnShowClass: { type: String, required: false },
        btnShowStyle: { type: String, required: false },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        required: { type: Boolean, default: true },
        autofocus: { type: Boolean, default: false },
        maxlength: { type: Number, required: false },
        minlength: { type: Number, required: false },
        autocomplete: { type: String, required: false },
        placeholder: { type: String, required: false },
        inputmode: { type: String, required: false },
    },
    data() {
        return { lazyTimer: null, btnShowState: false };
    },
    methods: {
        handleInput(event) {
            if (this.lazy) {
                if (this.lazyTimer) {
                    clearTimeout(this.lazyTimer);
                    this.lazyTimer = null;
                };
                this.lazyTimer = setTimeout(() => {
                    this.value = event.target.value;
                }, 300);
            } else {
                this.value = event.target.value;
            }
        },
        handleChange(event) {
            if (this.lazy && this.lazyTimer) {
                clearTimeout(this.lazyTimer);
                this.lazyTimer = null;
                this.value = event.target.value;
            }
        }
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
        typeToSet() {
            console.log(this.show, this.btnShowState);

            return this.show === undefined ? (this.btnShowState ? 'text' : 'password') : this.show ? 'text' : 'password';
        },
        minToSet() {
            return this.minlength ?? (this.validation?.min ?? false);
        },
        maxToSet() {
            return this.maxlength ?? (this.validation?.max ?? false);
        },
        errorDefaultText() {
            return this.errorContent ? this.errorContent : `Il campo non deve contenere spazi e ci deve essere una lettera grande, un numero, un simbolo e tra ${this.validation?.min !== undefined ? this.validation.min : '8'} a ${this.validation?.max !== undefined ? this.validation.max : '255'} caratteri`
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
        if (this.minToSet) validation = { min: this.minToSet, ...validation };
        if (this.maxToSet) validation = { max: this.maxToSet, ...validation };
        this.modelValue.initField(this.field, 'password', this.required ? validation : false);
        this.tooltips = new Tooltip(this.$refs.inputRef);
        this.tooltips.disable();
    },
    unmounted() {
        if (this.tooltips) { this.tooltips.dispose(); }
    }
};
</script>

<style lang="scss" scoped></style>
