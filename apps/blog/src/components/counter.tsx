import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return <button className="bg-red-200 p-4 rounded-md" onClick={() => setCount(count + 1)}>{count}</button>;
};
