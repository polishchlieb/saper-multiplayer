<script lang='ts'>
  import EpicButton from './lib/epic-button.svelte';
  import EpicSelect from './lib/epic-select.svelte';
  import PlayerList from './PlayerList.svelte';
  import { code } from './store';
  import TextChat from './TextChat.svelte';
  import { socket, socketListener } from './lib/socket';
  import Fireworks from './assets/fireworks.gif';
  import { onDestroy } from 'svelte';

  const gameModes = [
    { value: 'competition', text: 'wielki pojedynek saperski' },
    { value: 'coop', text: 'coop' }
  ];

  const boardSizes = [
    { value: 'default', text: '10x10' }
  ];

  let gamemode = gameModes[0].value;

  const handleChange = (event: any) => 
    socket.send(JSON.stringify({
      type: 'options',
      gamemode: event.target.value
    }));

  const handleClick = () => {
    socket.send(JSON.stringify({
      type: 'start'
    }));
  }

  let fireworkStyles = '';
  setInterval(() => {
    const randomX = Math.floor(window.innerWidth * Math.random());
    const randomY = Math.floor(window.innerHeight * Math.random());

    fireworkStyles = `left: ${randomX}px; top: ${randomY}px;`;
  }, 100);

  const listener = socketListener.addEventListener(
    'options',
    ({ gamemode: gm }: { gamemode: string }) => {
      gamemode = gm;
    }
  );
  onDestroy(() => {
    listener.unsubscribe();
  });
</script>

<div class='container'>
  <h1>saper multiplayer</h1>
  <h2>Kod gry: {$code}</h2>

  <PlayerList />
  
  <div class='game-options'>
    <EpicSelect
      id='gamemode' title='Tryb gry: ' options={gameModes}
      bind:value={gamemode} on:change={handleChange} />
    <EpicSelect
      id='boardsize' title='Rozmiar planszy: ' options={boardSizes} />
    <EpicButton on:click={handleClick}>graj!!</EpicButton>
  </div>

  <TextChat />
</div>

<img src={Fireworks} class='fireworks' alt='fajewerk' style={fireworkStyles}>

<style>
  .fireworks {
    position: absolute;
  }
</style>