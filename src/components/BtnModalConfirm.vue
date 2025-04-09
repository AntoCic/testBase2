<template>
    <button type="button" :class="[$attrs.class ?? `btn btn-outline-${btn} rounded-circle p-1 border-0`]"
        :style="$attrs.style" data-bs-toggle="modal" :data-bs-target="`#${name}`">
        <slot>
            <span class="material-symbols-outlined d-block">
                {{ icon }}
            </span>
        </slot>
    </button>
    <div class="modal fade text-dark" :id="name" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="modalLabel" aria-hidden="true">
        <div :class="`modal-dialog modal-dialog-centered modal-dialog-scrollable${modalSize}`">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5">{{ header }}</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="$emit('onHide')"></button>
                </div>
                <div class="modal-body">
                    {{ body }}
                </div>
                <div class="modal-footer">
                    <button v-if="btnBack !== ''" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click="$emit('onHide')">{{ btnBack }}</button>
                    <button v-if="btnSend !== ''" type="button" class="btn btn-success" data-bs-dismiss="modal"
                        @click="confirm">{{ btnSend }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// todo add prop closeBtnShow headerShow footerShow 
export default {
    name: 'BtnModalConfirm',
    data() { return {}; },
    props: {
        name: { type: String, required: true },
        body: { type: String, default: 'Sei sicuro di voler eliminare?' },
        header: { type: String, default: '' },
        btn: { type: String, default: 'secondary' },
        btnBack: { type: String, default: 'Indietro' },
        btnSend: { type: String, default: 'Conferma' },
        icon: { type: String, default: 'delete' },
        // xl lg sm fullscreen fullscreen-sm-down fullscreen-md-down fullscreen-lg-down fullscreen-xl-down fullscreen-xxl-down
        size: { type: String, default: '' },
    },
    methods: {
        confirm() {
            this.$emit('onConfirm');
            //   const modal = bootstrap.Modal.getInstance(document.getElementById(this.name));
            //   if (modal) modal.hide();
        }
    },
    computed: {
        modalSize() {
            if (this.size === '') return ''
            return `modal-${this.size}`
        }
    }
}
</script>

<style scoped></style>