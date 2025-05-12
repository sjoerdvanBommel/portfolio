<script lang="ts">
  // You can customize these values later or fetch them from a CMS/API
  let name: string = "Hey 👋";
  let tagline: string = "Remote Web Engineer & Adventurer";
  let skills: string[] = ["Typescript", "Node.js", "React", "npm", "Vue", "Svelte", "Git", "JavaScript", "Tailwind CSS", "AI Prompt Engineering"];
</script>

<h1 class="text-3xl mb-2">{name}</h1>
<div class="text-subheading-color italic mb-4">{tagline}</div>
<p>
  I'm a web developer focused on <em>high-quality</em> code, smooth migrations, and modern, scalable solutions.
  I've used many programming languages and tools, but have deep knowledge of the TypeScript ecosystem.
  Working remotely allows me to combine my passion for traveling & coding.
</p>

<br />

<p>
  Complex projects where I get to migrate legacy codebases to modern solutions excite me.
  I've never had the opportunity to explore micro-frontends in my professional life, so I decided to
  create this website using them. It uses Svelte for the about page, React for the blog page and header (yes, it is
  its own micro-frontend), and Vue for the home page.
  Overengineered? I don't think so, when exploring, learning and showcasing is the goal.
</p>

<h2 class="text-2xl mt-8 mb-2">Skills & Interests</h2>
<div class="flex flex-wrap gap-2 mt-4">
  {#each skills as skill}
    <div class="bg-blue-50 px-3 py-1 rounded-lg text-sm text-bg-color">{skill}</div>
  {/each}
</div>

<footer class="mt-8 font-bold">Available for freelance or collaborative projects — anywhere on the planet!</footer>
