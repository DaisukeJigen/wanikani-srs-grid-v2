import type { iSettings } from '@/interfaces/settings'

class cSettings implements iSettings {
  breakdownMode: number
  initiate: boolean
  constructor(data: iSettings | null) {
    this.breakdownMode = data == null ? 2 : data.breakdownMode
    this.initiate = data == null ? false : data.initiate
  }
}

export { cSettings }
