import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Game = require('./containers/GameContainer').default
      const reducer = require('./modules/game').default

      injectReducer(store, { key: 'game', reducer })

      cb(null, Game)
    }, 'game')
  }
})
