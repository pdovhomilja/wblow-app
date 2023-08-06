"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

const AccessKeyForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const formSchema = z.object({
    publicKey: z
      .string({ required_error: "Privátní kód je vyžadován" })
      .cuid({ message: "Nesprávný formán privátního kódu" }),
  });

  type BillboardFormValues = z.infer<typeof formSchema>;

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    router.push(`/${data.publicKey}`);
    setIsLoading(false);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col gap-5 w-full "
        >
          <FormField
            control={form.control}
            name="publicKey"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Privátní kód</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="bude vypadat takto: clkyezmih0005de7g63vk4feyk"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="flex gap-2 h-12"
          >
            <span
              className={
                isLoading
                  ? " border rounded-full px-3 py-2 animate-spin"
                  : "hidden"
              }
            >
              N
            </span>
            <span className={isLoading ? " " : "hidden"}>Loading ...</span>
            <span className={isLoading ? "hidden" : ""}>Pokračovat</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AccessKeyForm;
