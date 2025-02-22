<template>
    <label v-if="label" :for="idToSet" :class="['form-label', inline ? 'me-1' : '', labelClass]" :style="labelStyle">
        {{ label === true ? idToSet : label }}<span v-if="this.required" class="text-danger">*</span>
    </label>
    <input type="text" v-model="value" :class="['form-control', inline ? 'd-inline' : '', inputClass, classValidator]"
        :style="inline ? 'width: initial; ' : '' + inputStyle" :id="idToSet" :name="idToSet" :placeholder="placeholder"
        :autocomplete="autocomplete" :disabled="disabled" :readonly="readonly" :required="required"
        :autofocus="autofocus" :maxlength="maxlength" :minlength="minlength" :lang="lang" :inputmode="inputmode"
        :list="isList">
    <div class="invalid-feedback">{{ errorContent ? errorContent : `Il campo deve contenere
        tra ${validation?.min !== undefined ? validation.min : '2'} a ${validation?.max !== undefined ? validation.max :
            '255'} caratteri` }}
    </div>
    <datalist v-if="isList" :id="isList">
        <option v-for="option in list" :key="option" :value="option"></option>
    </datalist>

</template>

<script>
export default {
    props: {
        field: {
            type: String,
            required: true
        },
        modelValue: {
            type: Object,
            required: true
        },
        validation: {
            type: [Object, Boolean],
            default: {}
        },
        errorContent: {
            type: String,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        },

        inline: {
            type: Boolean,
            default: false
        },

        id: {
            type: String,
            required: false
        },
        label: {
            type: [String, Boolean],
            required: false
        },
        inputClass: {
            type: String,
            required: false
        },
        labelClass: {
            type: String,
            required: false
        },
        inputStyle: {
            type: String,
            required: false
        },
        labelStyle: {
            type: String,
            required: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: true
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            required: false
        },
        minlength: {
            type: Number,
            required: false
        },
        autocomplete: {
            type: String,
            required: false
        },
        placeholder: {
            type: String,
            required: false
        },
        lang: {
            type: String,
            default: 'it'
        },
        // numeric | decimal | tel | email | url | search | none
        inputmode: {
            type: String,
            required: false
        },
        list: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        value: {
            get() {
                return this.modelValue[this.field];
            },
            set(value) {
                this.modelValue[this.field] = value;
                this.modelValue.check(this.field);
                if (this.onChange) {
                    this.onChange(value, this.field);
                }
            }
        },
        idToSet() {
            return this.id ?? this.field
        },
        isList() {
            return this.list.length ? `list-${this.idToSet}` : null
        },
        classValidator() {
            return this.modelValue.classValidator(this.field)
        },
    },
    mounted() {
        this.modelValue.initField(this.field, 'text', this.required ? this.validation : false);
    }
};
</script>

<style lang="scss" scoped></style>
