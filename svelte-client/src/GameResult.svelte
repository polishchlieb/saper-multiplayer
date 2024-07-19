<script lang="ts">
  import CupImage from './assets/cup.png';
  import BombImage from './assets/bomb.svg';

  export let winner: string | boolean;
  export let time: number;
</script>

{#if typeof winner === 'string'}
<div class='modal-wrapper'>
  <div class='modal'>
    <div class='end'>
      <span class='game-over-text'>gra sie skonczyla chyba</span>
      <div class='winner'>
        <img src={CupImage} alt="puharek">
        <span class='winner-text'>Zwycienzca</span>
      </div>
      <span class='winner-name'>{winner}</span>
      <span class='end-element'>Czas: {time / 1000}s</span>
    </div>
  </div>
</div>
{:else}
<div class='modal-wrapper'>
  <div class='modal'>
    <div class='end'>
      <span class='game-over-text'>gra sie skonczyla chyba</span>
      <div class='winner'>
        <img
          src={winner ? CupImage : BombImage}
          alt={winner ? 'puharek' : 'la bomba'}>
        <span class='winner-text'>{winner ? 'Zwycienstwo!' : 'Przegrana...'}</span>
      </div>
      <span class='end-element'>Czas: {time / 1000}s</span>
    </div>
  </div>
</div>
{/if}

<style>
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 50;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50vh;
    left: 50vw;
    border: 3px solid black;
    padding: 20px;
    background-color: white;
    z-index: 100;
  }

  .winner {
    display: flex;
    align-items: center;
  }

  .end {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }

  .end-element {
    margin-bottom: 0px !important;
  }

  .game-over-text {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .winner-text {
    font-size: 40px;
  }

  .winner-name {
    font-size: 27px;
    margin-bottom: 20px;
  }

  .winner img {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
</style>