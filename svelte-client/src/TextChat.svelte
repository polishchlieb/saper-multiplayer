<script lang='ts'>
  import { onDestroy } from 'svelte';
  import { socket, socketListener } from './lib/socket';
  import TextMessage from './TextMessage.svelte';

  let content = '';

  type TextMessage = { id: number, content: string, author: string };
  let messages: TextMessage[] = [];

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter')
      return;

    event.preventDefault();
    socket.send(JSON.stringify({
      type: 'text-message',
      content
    }));

    content = '';
  }

  const listener = socketListener.addEventListener(
    'text-message',
    ({ author, content }: { author: string, content: string }) => {
      messages = [
        ...messages,
        { author, content, id: Date.now() }
      ];
    }
  );

  onDestroy(() => {
    listener.unsubscribe();
  });
</script>

<div class='chat-messages'>
  <span class='first-message'>
    dzien dobry.
  </span>
  {#each messages as message (message.id)}
    <TextMessage author={message.author} content={message.content} />
  {/each}
</div>
<textarea
  on:keydown={handleKeyDown}
  bind:value={content}
  placeholder='wpisz se tu wiadomosc' />

<style>
  .chat-messages {
    height: 300px;
    width: 300px;
    overflow-y: hidden;
  }

  .first-message {
    color: #777;
  }

  textarea {
    background-color: white;
    color: black;
    resize: none;
    padding: 12px 20px;
    border: 0;
    border-bottom: 2px solid black;
    font-size: 16px;
    outline: none;
    width: 260px;
    font-family: 'Comic Sans', sans-serif;
  }
</style>