<script lang='ts'>
  import BombImage from './assets/bomb.svg';
  import FlagImage from './assets/flag.svg';
  import { socket } from './lib/socket';
    import { nickname } from './store';

  export let x: number;
  export let y: number;
  export let hasBomb: boolean | undefined = undefined;
  export let isVisible: boolean | undefined = undefined;
  export let nearBombs: number | undefined = undefined;
  export let isFlagged: boolean | undefined = undefined;
  export let key: string;
  export let player: string | undefined = undefined

  let className: string;
  $: className = 'field' + (isVisible ? ' field-visible' : '');

  const index = y * 10 + x;

  const canClick = !player || player === $nickname;

  const handleLeftClick = canClick
    ? (event: MouseEvent) => {
      event.preventDefault();
      socket.send(JSON.stringify({
        type: 'reveal',
        index
      }));
    }
    : () => {}

  const handleRightClick = canClick
    ? (event: MouseEvent) => {
      event.preventDefault();
      socket.send(JSON.stringify({
        type: 'flag',
        index
      }));
    }
    : () => {}
</script>

<div class={className} on:click={handleLeftClick} on:contextmenu={handleRightClick}>
  {#if hasBomb}
    <img src={BombImage} alt='la bomba'>
  {:else if isVisible}
    {nearBombs}
  {:else if isFlagged}
    <img src={FlagImage} alt='biala flaga'>
  {/if}
</div>

<style>
  .field {
    display: flex;
    height: 40px;
    width: 40px;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    background-color: gray;
  }

  .field-visible {
    background-color: #00ff00;
  }

  .field img {
    width: 40px;
    height: 40px;
  }
</style>