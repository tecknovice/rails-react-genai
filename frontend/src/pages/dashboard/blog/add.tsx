"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const blogSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  content: z
    .string()
    .min(10, {
      message: "Content must be at least 10 characters.",
    })
    .max(5000, {
      message: "Content must not exceed 5000 characters.",
    }),
  published: z.boolean(),
});

export default function BlogAdd() {
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false,
    },
  });

  function onSubmit(values: z.infer<typeof blogSchema>) {
    // TODO: Submit to API
    console.log(values);
    // Here you would typically make an API call to create the blog
    // Example: createBlog(values)
  }

  return (
    <div className="container mx-auto">
      <div className=" mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Blog</h1>
          <p className="text-muted-foreground mt-2">
            Create a new blog post. Fill in the title and content below.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog title..."
                      {...field}
                      aria-invalid={
                        form.formState.errors.title ? "true" : "false"
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    This will be the title of your blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog content here..."
                      className="min-h-[200px]"
                      {...field}
                      aria-invalid={
                        form.formState.errors.content ? "true" : "false"
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Write the main content of your blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publish immediately</FormLabel>
                    <FormDescription>
                      Check this to make your blog post visible to the public
                      immediately.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">Create Blog</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
