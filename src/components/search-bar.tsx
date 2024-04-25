"use client"

import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const formSchema=z.object({
    search:z.string().min(0).max(50)
})

const SearchBar=()=>{

  const router=useRouter();
  const query=useSearchParams();

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            search:query.get("search") ?? "",
        }
    })

    async function onSubmit(values:z.infer<typeof formSchema>){
        if(values.search){
            router.push(`/rooms/?search=${values.search[0].toUpperCase()+values.search.slice(1)}`);
        }
        else{
            router.push("/rooms");
        }
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between w-[90vw]">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Search for keywords" className="w-[75vw]"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
                <Search />
            </Button>

            {query.get("search") && (
              <Button variant="link" onClick={()=>{
                form.setValue("search","");
                router.push("/rooms")
              }}>Clear</Button>
            )}
          </form>
        </Form>
      )
}

export default SearchBar;