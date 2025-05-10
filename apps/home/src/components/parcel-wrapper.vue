<template>
  <div ref="parcelContainer"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { mountRootParcel } from 'single-spa';

// Props
const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
  mountParcel: {
    type: Function,
    default: mountRootParcel,
  },
  parcelProps: {
    type: Object,
    default: () => ({}),
  },
});

const parcelContainer = ref(null);
let parcelInstance = null;

onMounted(() => {
  parcelInstance = props.mountParcel(props.config, {
    domElement: parcelContainer.value,
    ...props.parcelProps,
  });
});

onBeforeUnmount(() => {
  if (parcelInstance?.unmount) {
    parcelInstance.unmount();
  }
});
</script>
