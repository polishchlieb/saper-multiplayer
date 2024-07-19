<script lang="ts">
  import EpicButton from './lib/epic-button.svelte';
  import EpicInput from './lib/epic-input.svelte';
  import ErrorMessage from './lib/error-message.svelte';
  import { socket } from './lib/socket';
  import { state, nickname } from './store';

  let error = '';

  const handleClick = () => {
    if ($nickname.length < 3 || $nickname.length > 20) {
      error = 'nazwa musi mieć od 3 do 20 znakuw';
      return;
    }

    if (!/[A-Za-z \-\.0-9]+/.test($nickname)) {
      error = 'nie używaj dziwnych znakuw, prosze';
      return;
    }

    socket.send(JSON.stringify({
      type: 'nickname',
      value: $nickname
    }));

    setInterval(() => {
      socket.send(JSON.stringify({
        type: 'ping'
      }));
    }, 3000);

    state.update(_ => 'MENU');
  }
</script>

<div class="container">
  <EpicInput placeholder="twuj epicki nik" bind:value={$nickname} />
  <EpicButton on:click={handleClick}>klik!</EpicButton>

  {#if error}
    <ErrorMessage>{error}</ErrorMessage>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>