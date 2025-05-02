<template>
  <TransitionGroup name="toast-fade" tag="div" class="toast-wrapper">
    <div v-for="(toast, index) in toasts" :key="toast.id" class="toast-card"
      :class="[toast.type, { expanded: hoveredId === null ? index === toasts.length - 1 : hoveredId === toast.id }]"
      @mouseenter="handleHover(toast.id)" @mouseleave="handleLeave">
      <div class="icon-container" v-html="toast.logo"></div>
      <div class="message-text-container text-dark">
        <p class="message-text mb-0">{{ toast.title }}</p>
        <p v-if="toast.message" class="sub-text mb-0">{{ toast.message }}</p>
      </div>
      <svg class="cross-icon" viewBox="0 0 15 15" fill="currentColor" @click="handleClose(toast.id)">
        <path
          d="M11.78 4.03c.23-.23.23-.6 0-.83s-.6-.23-.83 0L7.5 6.69 4.03 3.2c-.23-.23-.6-.23-.83 0s-.23.6 0 .83L6.69 7.5 3.2 10.97c-.23.23-.23.6 0 .83s.6.23.83 0L7.5 8.31l3.47 3.47c.23.23.6.23.83 0s.23-.6 0-.83L8.31 7.5l3.47-3.47z" />
      </svg>
    </div>
  </TransitionGroup>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      hoveredId: null,
    };
  },
  computed: {
    toasts() {
      return this.$toast.queue || [];
    },
  },
  methods: {
    handleHover(id) {
      this.hoveredId = id;
      this.$toast.stopAll();
    },
    handleLeave() {
      this.hoveredId = null;
      this.$toast.startAll();
    },
    handleClose(id) {
      this.hoveredId = null;
      this.$toast.removeToastById(id);
    }
  },
};

</script>

<style scoped lang="scss">
.toast-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 9999;
}


.toast-card {
  width: 330px;
  min-height: 80px;
  border-radius: 8px;
  padding: 10px 12px;
  background-color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: default;
  transition: all 0.3s ease, transform 0.3s ease;
  overflow: hidden;
  opacity: 1;

  .icon-container {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }


  .message-text {
    font-size: 17px;
    font-weight: bold;
  }

  .sub-text {
    color: #555;
    font-size: 14px;
  }

  .cross-icon {
    width: 18px;
    height: 18px;
    color: #555;
    cursor: pointer;
    flex-shrink: 0;
  }
}

.toast-card:not(.expanded) {
  min-height: 40px;
  max-height: 40px;
  padding-top: 6px;
  padding-bottom: 6px;
  opacity: 0.7;

  .icon-container {
    width: 18px;
    height: 18px;
  }


  .message-text {
    font-size: 14px;
  }

  .sub-text {
    display: none;
  }

  .cross-icon {
    width: 14px;
    height: 14px;
  }
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}


.message-text-container {
  flex-grow: 1;
}


/* Optional: aggiungi colori per tipo */
.toast-card.info {
  border-right: 5px solid var(--bs-info);

  .icon-container {
    color: var(--bs-info);
  }
}

.toast-card.success {
  border-right: 5px solid var(--bs-success);

  .icon-container {
    color: var(--bs-success);
  }
}

.toast-card.warning {
  border-right: 5px solid var(--bs-warning);

  .icon-container {
    color: var(--bs-warning);
  }
}

.toast-card.error {
  border-right: 5px solid var(--bs-danger);

  .icon-container {
    color: var(--bs-danger);
  }
}

.toast-card.primary {
  border-right: 5px solid var(--bs-primary);

  .icon-container {
    color: var(--bs-primary);
  }
}

.toast-card.secondary {
  border-right: 5px solid var(--bs-secondary);

  .icon-container {
    color: var(--bs-secondary);
  }
}
</style>
