"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy } from "lucide-react";

import Image from "next/image";
import { useState } from "react";

export default function CopyToClipboardDialog({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src="/assets/share.svg"
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-slate-900">
        <DialogHeader className="text-white">
          <DialogTitle>Compartir</DialogTitle>
          <DialogDescription>
            Copia el link y compártelo con alguien que pueda ayudar
          </DialogDescription>
        </DialogHeader>

        <Label className="text-white">Link</Label>
        <Input
          disabled
          readOnly
          value={`https://iberopuebla-cosas-perdidas.vercel.app/thread/${id}`}
          className="bg-dark-3 text-white"
        />

        <DialogFooter>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `https://iberopuebla-cosas-perdidas.vercel.app/thread/${id}`
              );
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="bg-primary-500"
          >
            {copied ? <Check className="mr-2" /> : <Copy className="mr-2" />}
            {copied ? "Copiado" : "Copiar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
