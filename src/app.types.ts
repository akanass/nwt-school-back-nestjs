export type AppConfig = {
  host: string;
  port: number;
  cors: string[];
};

export type SwaggerConfig = {
  title: string;
  description: string;
  version: string;
  tag: string;
  path: string;
};
