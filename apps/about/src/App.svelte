<script>
  // You can customize these values later or fetch them from a CMS/API
  let name = "Hey 👋";
  let tagline = "Remote Web Engineer & Adventurer";
  let skills = ["Typescript", "Node.js", "React", "npm", "Vue", "Svelte", "Git", "JavaScript", "Tailwind CSS", "AI Prompt Engineering"];
</script>

<style>
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    margin-top: 2rem;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .tagline {
    color: #666;
    font-style: italic;
    margin-bottom: 1rem;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .skill {
    background: #eef;
    padding: 0.3rem 0.7rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
  }

  footer {
    margin-top: 2rem;
    font-weight: bold;
    color: #333;
  }
</style>

<h1>{name}</h1>
<div class="tagline">{tagline}</div>
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

<h2>Skills & Interests</h2>
<div class="skills">
  {#each skills as skill}
    <div class="skill">{skill}</div>
  {/each}
</div>

<footer>Available for freelance or collaborative projects — anywhere on the planet!</footer>
