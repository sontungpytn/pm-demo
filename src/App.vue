<script setup lang="ts">
import { custom, http, useAccount } from '@wagmi/vue'
import Account from './Account.vue';
import Connect from './Connect.vue';
import { base } from 'viem/chains'
import { AAWrapProvider, SmartAccount, SendTransactionMode } from '@particle-network/aa';

const { isConnected } = useAccount();


async function sendTx() {
  const provider = window.ethereum;
  const smartAccount = new SmartAccount(provider, {
    projectId: 'a46ee986-8fda-4e7e-9244-9cdfbf2abee6',
    clientKey: 'cfLaQ7qR9stRzTPJOhnq44tGWpnFCpuDoYS29YUp',
    appId: 'd9578237-3c05-4218-a0da-897e9121ed13',
    aaOptions: {
      accountContracts: {  // 'BICONOMY', 'CYBERCONNECT', 'SIMPLE'
        BICONOMY: [
          {
            version: '2.0.0',
            chainIds: [base.id],
          }
        ],
      },
    },
  });

  smartAccount.setSmartAccountContract({ name: 'BICONOMY', version: '2.0.0' });
  const address = await smartAccount.getAddress();

  console.log(smartAccount)

  console.log('address', address);

  const isDeploy = await smartAccount.isDeployed();
  console.log('isDeploy', isDeploy);
  if (!isDeploy) {
    const txHash = await smartAccount.deployWalletContract();
  }


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
