<script lang="ts">
  import PlayerImage from './assets/player.webp';
  
  export let author: string;
  export let content: string;
</script>

<div class='text-message'>
  <img src={PlayerImage} alt="usmieszek">
  <span class='message-author'>{author}</span>
  <span>{content}</span>
</div>

<style>
  .text-message {
    display: flex;
  }

  .text-message img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }

  .message-author {
    font-weight: bold;
    margin-right: 4px;
  }
</style>