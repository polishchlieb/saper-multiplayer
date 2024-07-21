<script lang='ts'>
  import { onDestroy } from 'svelte';
  import Field from './Field.svelte';

  export let player: string | undefined = undefined;
  export let width: number;
  export let height: number;

  type Field = {
    x: number;
    y: number;
    key: string;
    hasBomb?: boolean;
    isVisible?: boolean;
    isFlagged?: boolean;
    nearBombs?: number;
  };

  let fields: Field[] = [];
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const key = `${x},${y}`;
      fields.push({ x, y, key });
    }
  }

  let style = `
    display: grid;
    grid-template-columns: repeat(${width}, 1fr);
    width: ${42 * width}px;
  `;

  import { socketListener } from './lib/socket';

  const listener = socketListener.addEventListener(
    'diff',
    ({ value, player: p }: { value: any, player?: string }) => {
      if (player && player !== p)
        return;

      for (const field of value) {
        const id = field.y * width + field.x;
        fields[id] = {...fields[id], ...field};
      }
    }
  );

  onDestroy(() => {
    listener.unsubscribe();
  });
</script>

<div class='board' {style}>
  {#each fields as field (field.key)}
    <Field {player} {...field} />
  {/each}
</div>