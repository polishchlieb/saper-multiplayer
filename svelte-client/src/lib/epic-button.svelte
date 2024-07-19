<button class="epic-button" on:click>
  <slot />
</button>

<style>
  .epic-button {
    background-color: gray;
    border: 2px solid black;
    width: 315px;
    height: 50px;
    font-size: 26px;
    font-family: 'Comic Sans', sans-serif;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 5px;
  }
</style>