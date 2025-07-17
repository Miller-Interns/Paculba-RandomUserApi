/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@jamescoyle/vue-icon' {
  import { DefineComponent } from 'vue'
  const SvgIcon: DefineComponent<{
    type: string
    path: string
  }>
  export default SvgIcon
}
