<script lang='ts'>
  export let placeholder: string | null = null;
  export let value = '';
</script>

<input type='text' class='epic-input' {placeholder} bind:value={value}>

<style>
  .epic-input {
    border: 2px solid black;
    width: 307px;
    height: 50px;
    font-family: 'Comic Sans', sans-serif;
    font-size: 26px;
    margin-bottom: 5px;
  }
</style>