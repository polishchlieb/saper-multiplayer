<script lang='ts'>
  import Board from './Board.svelte';
  import { playerNames } from './store';
</script>

{#each $playerNames as player}
  <h2>{player}</h2>
  <Board {player} width={10} height={10} />
{/each}