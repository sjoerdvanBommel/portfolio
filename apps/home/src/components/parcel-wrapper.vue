<template>
  <div ref="parcelContainer"></div>
</template>

<script setup>
import { mountRootParcel } from 'single-spa';
import { onMounted, ref } from 'vue';

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

onMounted(() => {
  props.mountParcel(props.config, {
    domElement: parcelContainer.value,
    ...props.parcelProps,
  });
});
</script>
