"use client";

import React, { useCallback } from "react";
import { z, ZodType } from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
//import { toast } from "react-hot-toast";
import { useToast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FingerprintIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterComponent() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);

  const formSchema = z.object({
    name: z.string().min(3).max(50),
    username: z.string().min(3).max(50),
    email: z.string().email(),
    language: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
    publicKey: z.string().cuid(),
  });

  type BillboardFormValues = z.infer<typeof formSchema>;

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: BillboardFormValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/user", data);
      toast({
        title: "Success",
        description: "User created successfully, please login.",
      });

      if (response.status === 200) {
        router.push("/");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "cz", label: "Czech" },
  ];

  return (
    <Card className="shadow-lg ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
          Vytvoření nového uživatelského účtu
        </CardTitle>
        <CardDescription>
          Pro vytvoření uživatelského účtu budete také potřebovat privátní kód.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 overflow-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celé jméno</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uživatelské jméno</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="jdoe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="name@domain.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publicKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Privátní kód</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="clkyezmih0005de7g63vk4feyk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jazyk</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Vyber jazyk"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languageOptions.map((language, index) => (
                          <SelectItem key={index} value={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center w-full ">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Heslo</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          disabled={isLoading}
                          placeholder="e7g63vFDSAk4fDF"
                          type={show ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span
                  className="flex px-4 pt-7 w-16"
                  onClick={() => setShow(!show)}
                >
                  <FingerprintIcon size={25} className="text-gray-400" />
                </span>
              </div>
              <div className="flex items-center w-full ">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Potvrzení hesla</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          disabled={isLoading}
                          placeholder="e7g63vFDSAk4fDF"
                          type={show ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span
                  className="flex px-4 pt-7 w-16"
                  onClick={() => setShow(!show)}
                >
                  <FingerprintIcon size={25} className="text-gray-400" />
                </span>
              </div>
            </div>

            <div className="grid gap-2 py-5">
              <Button disabled={isLoading} type="submit">
                Vytvoření účtu
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-5">
        <div className="text-sm text-gray-500">
          Máte už účet?{" "}
          <Link href={"/sign-in"} className="text-blue-500">
            přihlašte se zde
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
