import { DocsThemeConfig } from 'nextra-theme-docs/.'

import { Logo } from '@/components/Header/Logo'
import { Wallet } from '@/components/Header/Wallet'

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: 'https://github.com/develoQ/XRPL-Tutorial',
  },
  chat: {
    link: 'https://discord.gg/xrpl',
  },
  docsRepositoryBase: 'https://github.com/develoQ/XRPL-Tutorial',
  navbar: {
    extraContent: <Wallet />,
  },
  footer: {
    text: 'Made with ❤️ by XRP Ledger community',
  },
}

export default config
