<template>
    <label v-if="label" :for="idToSet" :class="['form-label', labelClass]" :style="labelStyle">
        {{ label === true ? idToSet : label }}
    </label>
    <input type="text" v-model="value" :class="['form-label', inputClass]" :style="inputStyle" :id="idToSet"
        :name="idToSet" :placeholder="placeholder" :autocomplete="autocomplete" :disabled="disabled"
        :readonly="readonly" :required="required" :autofocus="autofocus" :maxlength="maxlength" :minlength="minlength"
        :lang="lang" :inputmode="inputmode" :list="isList">
    <datalist v-if="isList" :id="isList">
        <option v-for="option in list" :key="option" :value="option"></option>
    </datalist>
    <p :class="'text-danger'"> errore validazione</p>
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
            default: 3
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
        }
    },
    mounted() {
        this.modelValue.setType(this.field, 'text');
    }
};
</script>

<style lang="scss" scoped></style>
