"use client";

import React from "react";
import { z } from "zod";

import { useRouter } from "next/navigation";
//import { toast } from "react-hot-toast";
import { useToast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import moment from "moment";

type Props = {};

export function FraudForm({}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const formSchema = z.object({
    date: z.date(),
    time: z.string(),
    place: z.string(),
    situation: z.string(),
    situation_when: z.string(),
    situation_where: z.string(),
    situation_who: z.string(),
    situation_what: z.string(),
    situation_why: z.string(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  });

  type NewFraudFormValues = z.infer<typeof formSchema>;

  const form = useForm<NewFraudFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: NewFraudFormValues) => {
    //console.log(data);
    setIsLoading(true);
    try {
      const response = await axios.post("/api/crm/account", data);
      toast({
        title: "Success",
        description: "Account created successfully",
      });

      /*     if (response.status === 200) {
        router.push("/");
      } */
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data,
      });
    } finally {
      router.refresh();
      setIsLoading(false);
      router.push("/crm/accounts");
    }
  };

  const now = moment(new Date()).format("HH-mm-ss");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full px-10 overflow-auto"
      >
        {/*         <div>
          <pre>
            <code>{JSON.stringify(form.watch(), null, 2)}</code>
          </pre>
        </div> */}
        <div className="grid gap-2 mx-auto w-[800px] text-sm">
          <div className="p-5 space-y-3 w-full ">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Základní informace k pozorování
            </h4>
            <div className="flex w-full justify-between space-x-5">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Kdy k tomu došlo?</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Vyber datum události</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            //@ts-ignore
                            //TODO: fix this
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Čas pozorování</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={moment(new Date()).format("HH:mm:ss")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Místo</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Popište co nejpodrobněji místo pozorování"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="p-5 space-y-3 w-full ">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Všeobecné otázky
            </h4>
            <div className="flex flex-col w-full space-y-5">
              <FormField
                control={form.control}
                name="situation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Popiště co Vás znepokojilo?</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Popište co nejpodrobněji situaci"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="situation_when"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Popiště slovy kdy se pozorování odehrálo?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Popište co nejpodrobněji situaci z poledu času"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="situation_where"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Popiště slovy kde se pozorování odehrálo?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Popište co nejpodrobněji situaci z poledu místa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="situation_who"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Popiště slovy osoby kterých se pozorování týká?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Popište co nejpodrobněji situaci z poledu zůčastněných osob"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="situation_what"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Popiště slovy co se při pozorování odehrálo?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Popište co nejpodrobněji situaci z Vašeho pohledu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="situation_why"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Popiště slovy přoč si myslíte, že k dané věci došlo?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Popište co nejpodrobněji situaci, jak si myslíte, že k dané věci došlo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="p-5 space-y-3 w-full ">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Kontaktní informace
            </h4>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              V případě, že chcete být kontaktováni, vyplňte prosím následující
              údaje. V opačném případě můžete formulář odeslat zcela anonymně i
              bez vyplnění. Bude Vám vygenerován unikátní kód, kterým se můžete
              kdykoliv vrátit a zkontrolovat stav Vašeho pozorování.
            </p>
            <div className="flex  w-full space-x-5">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jméno</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={"Jméno"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Přijmení</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={"Přijmení"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex  w-full space-x-5">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={"jmeno@domena.cz"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={"+420 123 456 789"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-2 mx-auto w-[800px] py-10">
          <Button disabled={isLoading} type="submit">
            Odeslat pozorování
          </Button>
        </div>
      </form>
    </Form>
  );
}
