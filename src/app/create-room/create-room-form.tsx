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

const formSchema=z.object({
    name:z.string().min(1).max(50),
    description:z.string().min(10).max(50),
    language:z.string().min(1).max(50),
    githubRepo:z.string().min(1).max(50),
})

const CreateRoomForm=()=>{
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            description:"",
            language:"",
            githubRepo:""
        }
    })

    function onSubmit(values:z.infer<typeof formSchema>){
        console.log(values);
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public room name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input{...field} />
                  </FormControl>
                  <FormDescription>
                    Please describe what you are coding on
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Programming Language</FormLabel>
                  <FormControl>
                    <Input{...field} />
                  </FormControl>
                  <FormDescription>
                    List the primary programming language you are working with
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Repository</FormLabel>
                  <FormControl>
                    <Input{...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your Github Repository if got any
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
}

export default CreateRoomForm;