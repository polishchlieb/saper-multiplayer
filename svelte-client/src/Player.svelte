<script lang='ts'>
  import PlayerImage from './assets/player.webp';

  export let name: string;
</script>

<div class='player'>
  <img src={PlayerImage} alt='obrazek graczowy' class='playerimage'>
  {name}
</div>

<style>
  .playerimage {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .player {
    display: flex;
    align-items: center;
    font-size: 30px;
  }
</style>