<script lang="ts">
  import { modal } from './store';
  import CupImage from './assets/cup.png';
  import BombImage from './assets/bomb.svg';

  const handleClick = () => {
    modal.set({ visible: false });
  }
</script>

<div class="modal-wrapper" on:click={handleClick}
  style={$modal.visible ? 'display: flex' : 'display: none'}>
  <div class="modal">
    {#if $modal.type === 'winner'}
      <div class='end'>
        <span class='game-over-text'>gra sie skonczyla chyba</span>
        <div class='winner'>
          <img src={CupImage} alt="puharek" />
          <span class='winner-text'>Zwycienzca</span>
        </div>
        <span class='winner-name'>{$modal.content.winner}</span>
        <span class='end-element'>
          Czas: {$modal.content.time / 1000}s
        </span>
      </div>
    {:else if $modal.type === 'won'}
      <div class='end'>
        <span class='game-over-text'>gra sie skonczyla chyba</span>
        <div class='winner'>
          <img src={CupImage} alt="puharek" />
          <span class='winner-text'>Zwycenstwo!</span>
        </div>
        <span class='end-element'>Czas: {$modal.content.time / 1000}s</span>
      </div>
    {:else if $modal.type === 'lost'}
      <div class='end'>
        <span class='game-over-text'>gra sie skonczyla chyba</span>
        <div class='winner'>
          <img src={BombImage} alt="la bomba" />
          <span class='winner-text'>Przegrana...</span>
        </div>
        <span class='end-element'>Czas: {$modal.content.time / 1000}s</span>
      </div>
    {:else if $modal.type === 'error'}
      <div class="error">
        {$modal.content}
      </div>
    {/if}
  </div>
</div>

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

  .error {
    font-size: 30px;
    color: red;
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