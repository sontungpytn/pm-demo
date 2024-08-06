<script setup lang="ts">
import { useAccount, useDisconnect } from '@wagmi/vue';

const { address, connector } = useAccount();
const { disconnect } = useDisconnect();
</script>

<template>
  <div class="flex flex-col">
    <div>Address: {{ address }}</div>
    <div>Connected to {{ connector?.name }} Connector.</div>
    <button @click="disconnect()" class="p-2 bg-blue-500 w-24 text-white mt-4 ">Disconnect</button>
  </div>
</template>
