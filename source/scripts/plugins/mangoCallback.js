import { exception } from './analytics/utils'

try {
  if (typeof window.loadMangoCallbackWidgetAssets === 'function') {
    window.loadMangoCallbackWidgetAssets()
  }
} catch (error) {
  error.message = `Excepion in MangoCallbackWidget:\n\n${error.message}`
  exception(error)
}
