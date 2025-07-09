import { createListenerMiddleware } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '@/lib/redux/store'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>()

export type AppStartListening = typeof startAppListening

// Listeners ↓↓↓
