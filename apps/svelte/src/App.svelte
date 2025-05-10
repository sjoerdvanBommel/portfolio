<script lang="ts">
  import { navigateToUrl } from 'single-spa'
</script>

<main>
  <h2 class="text-3xl text-orange-400 font-bold underline">SVELTE</h2>

  <a href="/" on:click|preventDefault={() => navigateToUrl('/')}>Go to root</a>
  <a href="/react" on:click|preventDefault={() => navigateToUrl('/react')}>Go to react</a>
  <a href="/svelte" on:click|preventDefault={() => navigateToUrl('/svelte')}>Go to svelte</a>
</main>
