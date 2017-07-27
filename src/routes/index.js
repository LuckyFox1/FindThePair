import CoreLayout from '../layouts/PageLayout/PageLayout'
import Game from './Game'
import Settings from './Settings'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Game(store),
  childRoutes : [
    Settings(store)
  ]
})

export default createRoutes
