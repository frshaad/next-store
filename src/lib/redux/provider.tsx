'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import type { AppStore } from '@/lib/redux/store'
import makeStore from '@/lib/redux/store'

export default function StoreProvider({ children }: React.PropsWithChildren) {
  const storeRef = useRef<AppStore>(undefined)
  storeRef.current ??= makeStore()

  return <Provider store={storeRef.current}>{children}</Provider>
}
