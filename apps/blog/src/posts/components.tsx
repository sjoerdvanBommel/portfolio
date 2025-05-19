import { Counter } from '../components/counter';

export const components = {
  h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-2xl font-bold">{children}</h1>,
  Counter,
};
