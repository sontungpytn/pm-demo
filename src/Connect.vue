<script setup lang="ts">
import { useConnect, useChainId } from '@wagmi/vue';

const chainId = useChainId();
const { connectors, connect } = useConnect();
</script>

<template>
  <div class="flex flex-row">
    <button
        v-for="connector in connectors"
        @click="connect({ connector, chainId })"
        class="p-2 m-2 bg-blue-500 text-white rounded-lg"
    >
      {{ connector.name }}
    </button>
  </div>
</template>
