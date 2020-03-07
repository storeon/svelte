<script>
  import Header from './components/Header.svelte'
  import Main from './components/Main.svelte'
  import { store } from './store'
  import { SHOW_ACTIVE, SHOW_COMPLETED, SHOW_ALL } from './constants/TodoFilters'
  import { setStore } from '..'

  setStore(store)

  function updateFilter() {
    if (window.location.hash === '#active') {
      store.dispatch('filter/set', SHOW_ACTIVE)
    } else if (window.location.hash === '#completed') {
      store.dispatch('filter/set', SHOW_COMPLETED)
    } else {
      store.dispatch('filter/set', SHOW_ALL)
    }
  }

  updateFilter()
  window.addEventListener('hashchange', updateFilter)

</script>

<div class="todoapp">
  <Header />
  <Main />
</div>
