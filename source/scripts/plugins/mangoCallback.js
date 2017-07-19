  try {
    if (typeof window.loadMangoCallbackWidgetAssets === 'function') {
      window.loadMangoCallbackWidgetAssets()
    }
  } catch (e) {
    console.error(e)
  }
