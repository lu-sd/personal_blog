type Social = {
  label: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
  profile?: string;
};

const presentation: Presentation = {
  mail: "My Learning Blog",
  title: "Hi, I’m Lu ✨",
  profile: "/profile.jpg",
  description:
    "Hello,I am a self-driven full-stack software developer with *3 years* of experience in TypeScript, React, Next.js, and AWS Cloud Computing. My enthusiasm for technology fuels my continuous learning and adaptation to industry advancements. I am a quick learner who thrives in collaborative environments. In my free time, I enjoy running 🏃‍♀️ and cooking 🧑🏻‍🍳.",
  socials: [
    {
      label: "Linkedin",
      link: "https://www.linkedin.com/in/lu-hou/",
    },
    {
      label: "Github",
      link: "https://github.com/lu-sd",
    },
  ],
};

export default presentation;
