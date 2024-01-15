import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Loader2Icon className="w-20 h-20 text-primary-500 animate-spin" />
    </div>
  );
}
