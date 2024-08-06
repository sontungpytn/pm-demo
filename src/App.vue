<script setup lang="ts">
import { custom, http, useAccount } from '@wagmi/vue'
import Account from './Account.vue';
import Connect from './Connect.vue';
import { base } from 'viem/chains'
import { AAWrapProvider, SmartAccount, SendTransactionMode } from '@particle-network/aa';

import { ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';
import { createWalletClient, parseEther } from 'viem'


const { isConnected } = useAccount();


async function sendTx() {
  const provider = window.ethereum;
  const smartAccount = new SmartAccount(provider, {
    projectId: 'a46ee986-8fda-4e7e-9244-9cdfbf2abee6',
    clientKey: 'cfLaQ7qR9stRzTPJOhnq44tGWpnFCpuDoYS29YUp',
    appId: 'd9578237-3c05-4218-a0da-897e9121ed13',
    aaOptions: {
      accountContracts: { // 'BICONOMY', 'CYBERCONNECT', 'SIMPLE'
        BICONOMY: [
          {
            version: '2.0.0',
            chainIds: [base.id],
          }
        ],
        SIMPLE: [
          {
            version: '1.0.0',
            chainIds: [base.id],
          }
        ],

      },
    },
  });

  // smartAccount.setSmartAccountContract({ name: 'SIMPLE', version: '1.0.0' });
  smartAccount.setSmartAccountContract({ name: 'BICONOMY', version: '2.0.0' });
  const address = await smartAccount.getAddress();

  console.log(smartAccount)

  console.log('address', address);

  const wrapProvider = new AAWrapProvider(smartAccount);
  const client = createWalletClient({
    chain: base,
    transport: custom(wrapProvider)
  })

  const [walletAddress] = await client.getAddresses()
  console.log('walletAddress', walletAddress);
  const isDeploy = await smartAccount.isDeployed();
  console.log('isDeploy', isDeploy);
  if (!isDeploy) {
    const txHash = await smartAccount.deployWalletContract();
    console.log('txHash', txHash);
    console.log("Explore: ", base.blockExplorers.default.url + '/tx/' + txHash);
  }

  // @ts-ignore
  const hash = await client.sendTransaction({
    account: walletAddress,
    to: '0x00BDaF14D8FfA5795a809bE4124B9BcC58A2ABe1',
    value: parseEther('0.0000001')
  });

  console.log('hash', hash);
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
