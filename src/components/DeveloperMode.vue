<template>
  <div v-if="isChecked" class="dev-container max-z-index vh-100 vw-100 d-flex flex-column text-white">

    <nav class="nav-scoped flex-shrink-0">
      <div class="nav nav-tabs border-0" id="nav-tab" role="tablist">

        <button v-for="(tab, i) in tabs" :class="`nav-link text-info${i === 0 ? ' active' : ''}`"
          :id="`nav-dev-mode-${tab.name}-tab`" data-bs-toggle="tab" :data-bs-target="`#nav-dev-mode-${tab.name}`"
          type="button" role="tab" :aria-controls="`nav-dev-mode-${tab.name}`"
          :aria-selected="i === 0 ? 'true' : 'false'">
          <span class="material-symbols-outlined"> {{ tab.icon }} </span> {{ tab.title }}
        </button>

      </div>
    </nav>

    <div class="tab-content scoped p-2 overflow-y-auto flex-grow-1" id="nav-developer_mode">

      <div v-for="(tab, i) in tabs" :class="`tab-pane fade${i === 0 ? ' show active' : ''}`"
        :id="`nav-dev-mode-${tab.name}`" role="tabpanel" :aria-labelledby="`nav-dev-mode-${tab.name}-tab`" tabindex="0">
        <component v-if="tab.content" :is="tab.content" />
        <pre v-if="tab.pre" class="w-100"> {{ format(tab.pre) }} </pre>
      </div>

    </div>
  </div>

  <!-- Checkbox con icona in lable per attivare il div di sopra -->
  <input type="checkbox" id="devModeToggle" class="d-none" v-model="isChecked" />
  <label for="devModeToggle" v-if="showButton" type="button"
    class="position-fixed max-z-index top-0 end-0 m-2 material-symbols-outlined text-info" :class="$attrs.class"
    :style="$attrs.style">
    developer_mode
  </label>
</template>

<script>
import { routesList } from '../router';
import { user } from '../stores/user';
import DeveloperModeHome from './DeveloperModeHome.vue';

export default {
  name: 'DeveloperMode',
  components: { DeveloperModeHome },
  data() {
    return {
      user,
      isChecked: false, // Controlla lo stato del div

      tabs: [
        {
          name: 'home',
          icon: 'home',
          content: DeveloperModeHome
        },
        {
          name: 'data',
          icon: 'database',
          title: 's',
          pre: this.$s,
        },
        {
          name: 'user',
          icon: 'person',
          pre: user,
        },
        {
          name: 'toast',
          icon: 'mode_comment',
          pre: this.$toastQueue,
        },
        {
          name: 'router',
          icon: 'route',
          title: 'ROUTER',
          pre: routesList,
        }
      ]
  };
},
methods: {
  format(obj) {
    try {
      return JSON.stringify(obj, this.circularReplacer(), 2);
    } catch (e) {
      return '[object with circular references]';
    }
  },
  circularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return value;
    };
  }
},
computed: {
  showButton() {
    return this.$u.onDevMod || this.$u.isMaster(this.user.email);
  }
}
};
</script>

<style lang="scss">
.max-z-index {
  z-index: 99999999;
}

.dev-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999998;
  background-color: rgba(0, 0, 0, 0.94);
}

.nav-scoped {
  padding-right: 38px;
}

.tab-content.scoped {
  border-top: 2px solid #fff;
}

.tab-pane.scoped {
  overflow-y: auto;
}

.nav-link.text-info.active {
  color: #000000 !important;
}
</style>
