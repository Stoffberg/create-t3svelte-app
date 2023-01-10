<script lang="ts">
  import { page } from "$app/stores";

  const pageData = [
    {
      title: "Prisma",
      description: "Prisma unlocks a new level of developer experience when working with databases",
      link: "https://www.prisma.io/",
    },
    {
      title: "TailwindCSS",
      description: "A utility-first CSS framework for rapidly building custom designs",
      link: "https://tailwindcss.com/",
    },
    {
      title: "tRPC",
      description: "End-to-end typesafe APIs for quickly building fullstack apps",
      link: "https://trpc.io/",
    },
    {
      title: "Vite",
      description: "Next generation frontend tooling built on esbuild. It's really fast!",
      link: "https://vitejs.dev/",
    },
    {
      title: "SvelteKit",
      description: "A svelte based fullstack framework for building web apps",
      link: "https://kit.svelte.dev/",
    },
    {
      title: "TypeScript",
      description: "TypeScript is the core language of the package and is not optional",
      link: "https://www.typescriptlang.org/",
    },
  ];

  import { signIn, signOut } from "@auth/sveltekit/client";
</script>

<main class="absolute inset-0 flex flex-col items-center justify-center bg-[#0A071B] text-white">
  <h1 class="text-6xl font-bold mb-2">Create-T3Svelte-App</h1>
  {#if $page.data.session && $page.data.session.user}
    <p class="text-lg">Welcome {$page.data.session?.user?.name}</p>
    <button class="bg-[#2A263F] text-white px-4 py-2 rounded-lg mb-10" on:click={signOut}>Sign Out</button>
  {:else}
    <p class="text-lg">Welcome Guest</p>
    <button class="bg-[#2A263F] text-white px-4 py-2 rounded-lg mb-10" on:click={signIn}>Sign In</button>
  {/if}
  <section class="grid sm:grid-cols-2 lg:grid-cols-3 max-w-6xl gap-6">
    {#each pageData as { title, description, link }}
      <a class="flex flex-col border-[#27233b] border rounded-lg overflow-hidden" href={link}>
        <h2 class="text-2xl font-semibold py-2 px-4 text-center bg-[#2A263F]">{title}</h2>
        <p class="text-[#72749C] p-4 bg-[#141125] grow text-center">{description}</p>
      </a>
    {/each}
  </section>
</main>
