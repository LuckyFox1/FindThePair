import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'settings',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Settings = require('./containers/SettingsContainer').default
      const reducer = require('./modules/settings').default

      injectReducer(store, { key: 'settings', reducer })

      cb(null, Settings)
    }, 'settings')
  }
})
