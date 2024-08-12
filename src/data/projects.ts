export type Project = {
  title: string;
  techs: string[];
  link: string;
  isComingSoon?: boolean;
};

const projects: Project[] = [
  {
    title: "Portfolio / Blog",
    techs: ["Astro", "Tailwindcss"],
    link: "/",
  },
  {
    title: "Sample-sheet Validator",
    techs: ["ReactJS (NextJS)", "TypeScript", "Tailwindcss"],
    link: "https://ssc-nextjs.vercel.app",
  },
];

export default projects;
