export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url?: string;
  github?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "design";
}
