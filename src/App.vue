<script setup lang="ts">
import { custom, http, useAccount } from '@wagmi/vue'
import Account from './Account.vue';
import Connect from './Connect.vue';
import { createPublicClient, createWalletClient, parseEther } from 'viem'
import { V06 } from "userop";
import { base } from 'viem/chains'




const { isConnected } = useAccount();
const ethClient = createPublicClient({
  chain: base,
  transport: http()
});

const walletClient = createWalletClient({
  chain: base,
  transport: custom(window.ethereum!)
});


async function sendTx() {
  // @ts-ignore
  const account = new V06.Account.Instance({ ...V06.Account.Common.SimpleAccount.base(ethClient, walletClient), })

  console.log(account);
  console.log(account.getAddress())
  const TO_ADDRESS = "0x35Da4245A139BabB464782b8439ced60d1b5202B"
  const VALUE = "0.00001"
  const send = await account
      .encodeCallData("execute", [TO_ADDRESS, parseEther(VALUE), "0x"])
      .sendUserOperation();


  const receipt = await send.wait();
  console.log(receipt);
}


</script>

<template>
  <div v-if="isConnected">
    <Account />

    <div class="p-4">
      <button @click="sendTx" class="p-2 bg-blue-500 text-white rounded-lg">
        Send Transaction
      </button>
    </div>
  </div>
  <Connect v-else />
</template>
