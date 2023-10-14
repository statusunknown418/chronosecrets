import { Button } from "@/components/ui/button";
import { ArrowUp, Eye } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        <h1 className="text-3xl font-bold">Hey, wanna share some stuff?</h1>
        <p className="text-gray-500">
          This a new social network that makes it easy and fun
        </p>
      </header>

      <Button>
        <ArrowUp size={16} />
        <span>button 1</span>
        <Eye size={16} />
      </Button>

      <Button variant="outline">button 2</Button>
      <Button variant="secondary">button 3</Button>
      <Button variant="ghost">button 3</Button>
      <Button variant="link">button 4</Button>
      <Button variant="destructive">button 5</Button>
    </main>
  );
}
