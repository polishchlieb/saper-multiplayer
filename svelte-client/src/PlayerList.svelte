<script>
  import { playerNames } from './store';
  import Player from './Player.svelte';
</script>

<div class='playerlist'>
  {#each $playerNames as player}
    <Player name={player} />
  {/each}
</div>

<style>
  .playerlist {
    margin-bottom: 10px;
  }
</style>