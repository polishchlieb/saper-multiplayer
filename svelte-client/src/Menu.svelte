<script>
  import EpicButton from './lib/epic-button.svelte';
  import EpicInput from './lib/epic-input.svelte';
  import { socket } from './lib/socket';
  import { nickname } from './store';

  let code = '';

  const createGame = () => {
    socket.send(JSON.stringify({
      type: 'create-game'
    }));
  }

  const joinGame = () => {
    socket.send(JSON.stringify({
      type: 'join-game',
      code
    }));
  }
</script>

<div class="container">
  <h1>witanie, {$nickname}</h1>
  <div class='section'>
    <EpicButton on:click={createGame}>utwórz grę</EpicButton>
  </div>
  <div class='section'>
    <EpicInput bind:value={code} />
    <EpicButton on:click={joinGame}>dołącz do gry</EpicButton>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  .section {
    display: flex;
    margin-bottom: 30px;
    flex-direction: column;
  }
</style>