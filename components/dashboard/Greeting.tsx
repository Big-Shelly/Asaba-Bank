import { useEffect, useState } from 'react';

export default function Greeting({ name }: { name: string }) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6) setGreeting('Good night');
    else if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <h1 className="text-2xl font-semibold text-indigo-800 mb-4">
      {greeting}, {name} 👋
    </h1>
  );
}
