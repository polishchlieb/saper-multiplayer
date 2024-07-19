<script lang="ts">
  type Option = { value: string, text: string };

  export let id: string;
  export let title: string;
  export let options: Option[];
  export let value = options[0].value;
</script>

<div class="epic-select">
  <label for={id}>{title}</label>
  <select on:change bind:value={value}>
    {#each options as option (option.value)}
      <option value={option.value}>{option.text}</option>
    {/each}
  </select>
</div>

<style>
  .epic-select {
    margin-bottom: 10px;
    font-size: 18px;
  }

  .epic-select select {
    font-family: 'Comic Sans', cursive;
    font-size: 16px;
    padding-top: 2px;
    padding-bottom: 2px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
    border-radius: 20px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
  }

  .epic-select select option {
    font-family: 'Comic Sans', cursive;
    text-align: left;
  }
</style>