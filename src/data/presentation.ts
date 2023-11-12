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
  mail: "My learning Blog",
  title: "Hi, I’m Lu ✨",
  profile: "/profile.jpg",
  description:
    "Hello, i'm a full stack developer with over *1 years* of web experience. I am currently working with *NextJS and Typescript*.",
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
