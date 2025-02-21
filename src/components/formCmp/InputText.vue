<template>
    <label v-if="label" :for="idToSet" :class="['form-label', labelClass]" :style="labelStyle">
        {{ label === true ? idToSet : label }}
    </label>
    <input type="text" v-model="value" :class="['form-control', inputClass, classValidator]"
        :style="inputStyle" :id="idToSet" :name="idToSet" :placeholder="placeholder" :autocomplete="autocomplete"
        :disabled="disabled" :readonly="readonly" :required="required" :autofocus="autofocus" :maxlength="maxlength"
        :minlength="minlength" :lang="lang" :inputmode="inputmode" :list="isList">
    <div class="invalid-feedback">{{ validatorOptions?.textError ? validatorOptions.textError : `Il campo deve contenere
        tra ${minlength !== undefined ? minlength : '2'} a ${maxlength !== undefined ? maxlength : '255'} caratteri` }}
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
        validatorOptions: {
            required: false
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
            default: false
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
            default: 'on'
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
        }
    },
    mounted() {
        const validatorOptions = this.validatorOptions ? this.validatorOptions : { min: this.minlength, max: this.maxlength }
        let sendValidatorOptions = false
        for (const key in validatorOptions) {
            if (validatorOptions !== undefined) {
                sendValidatorOptions = true
                break;
            }
        }
        this.modelValue.initField(this.field, 'text', sendValidatorOptions ? validatorOptions : null);
    }
};
</script>

<style lang="scss" scoped></style>
