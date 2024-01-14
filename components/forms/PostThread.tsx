"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; // Corrected import
import { storage } from "@/lib/firebaseClient";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input"; // Updated import path if necessary
import { LucideImage } from "lucide-react";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";

import Image from "next/image";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const [image, setImage] = useState("");
  const [file, setFile] = useState<any>(null);

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the selected file
      try {
        const localImageUrl = URL.createObjectURL(selectedFile);
        setImage(localImageUrl); // Set the local image URL to display the image
      } catch (error) {
        console.error("Error in creating an object URL:", error);
        // Handle the error appropriately
      }
    }
  };

  const uploadImage = async () => {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // ... [existing code for progress]
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImage(downloadURL); // Set the image URL in state
            resolve(downloadURL); // Resolve the promise with the download URL
          }
        );
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    const imageUrl = await uploadImage(); // Wait for the image to be uploaded

    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: window.location.pathname, // Use window.location.pathname for the current path
      imageUrl: imageUrl as string,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Contenido
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
              <div className="flex flex-row justify-between items-center">
                <label className="flex flex-row justify-between items-center">
                  <LucideImage className="w-10 h-10 mr-2 text-primary-500 hover:bg-gray-800 rounded-lg cursor-pointer transition ease-in-out duration-200" />
                  <Input
                    type="file"
                    onChange={onFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-light-2 text-sm">
                  La imagen puede ser opcional
                </p>
              </div>
              <div className="flex flex-row justify-between items-center ">
                {image && (
                  <Image src={image} alt="Uploaded" width={400} height={400} />
                )}
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Publicar
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
