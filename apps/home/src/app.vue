<template>
  <h1>Homepage of Sjoerd van Bommel</h1>
  <p>Written in Vue 3. Imported react component from vue:</p>
  <ParcelWrapper :config="LettersParcel" :mountParcel="mountParcel" :parcelProps="{ letters: ['A', 'B'] }" />
</template>

<script setup>
import { mountRootParcel } from 'single-spa';
import ParcelWrapper from './components/parcel-wrapper.vue';
import { LettersParcel } from '@sjoerdvanbommel-packages/react-components';

const props = defineProps({
  mountParcel: {
    type: Function,
    required: true,
  },
});
</script>
