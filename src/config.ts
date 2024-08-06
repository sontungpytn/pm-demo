import { http, createConfig } from '@wagmi/vue'
import { base } from '@wagmi/vue/chains'
import { injected, walletConnect, metaMask } from '@wagmi/vue/connectors'
const walletConnectprojectId = "572b1621713fbfbdf85b6a0bb462b2a0"

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    walletConnect({ projectId: walletConnectprojectId }),
  ],
  transports: {
    [base.id]: http()
  },
})
