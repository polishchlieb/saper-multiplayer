<script lang="ts">
  import Competition from './Competition.svelte';
  import Coop from './Coop.svelte';
  import Lobby from './Lobby.svelte';
  import Menu from './Menu.svelte';
  import Modal from './Modal.svelte';
  import NicknamePicker from './NicknamePicker.svelte';
  import { state } from './store';
</script>

{#if $state === 'NICKNAME_PICKER'}
  <NicknamePicker />
{:else if $state === 'MENU'}
  <Menu />
{:else if $state === 'WAITING_ROOM'}
  <Lobby />
{:else if $state === 'COOP'}
  <Coop />
{:else if $state === 'COMPETITION'}
  <Competition />
{/if}

<Modal />