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
import type { Blog } from "@/types/blog";
import { generateText } from "@/services/genai";

const blogSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  prompt: z
    .string()
    .min(5, {
      message: "Prompt must be at least 5 characters.",
    })
    .max(1000, {
      message: "Prompt must not exceed 1000 characters.",
    })
    .optional(),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  published: z.boolean(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  mode: "create" | "edit";
  initialData?: Blog;
  onSubmit: (data: BlogFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function BlogForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: BlogFormProps) {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: initialData?.title || "",
      prompt: initialData?.prompt || "",
      content: initialData?.content || "",
      published: initialData?.published || false,
    },
  });

  function handleSubmit(values: BlogFormValues) {
    onSubmit(values);
  }

  const handleGenerateContent = async () => {
    const prompt = form.getValues("prompt");
    if (prompt) {
      const response = await generateText(prompt);
      if (response.payload) form.setValue("content", response.payload.content);
    }
  };

  const isEditing = mode === "edit";

  return (
    <div className="container mx-auto">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Blog" : "Add New Blog"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isEditing
              ? "Update your blog post details below."
              : "Create a new blog post. Fill in the title and content below."}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
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
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Enter a prompt for your blog post..."
                        className="min-h-[100px] pr-28"
                        {...field}
                        aria-invalid={
                          form.formState.errors.prompt ? "true" : "false"
                        }
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="absolute bottom-2 right-2 h-10 w-10 p-0 rounded-full bg-white hover:bg-gray-50 border-gray-300 text-lg"
                        onClick={handleGenerateContent}
                      >
                        ֎
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is an optional prompt to guide your blog content.
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
                    <FormLabel>
                      {isEditing ? "Published" : "Publish immediately"}
                    </FormLabel>
                    <FormDescription>
                      {isEditing
                        ? "Check this to make your blog post visible to the public."
                        : "Check this to make your blog post visible to the public immediately."}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                  ? "Update Blog"
                  : "Create Blog"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isLoading}
              >
                Reset
              </Button>
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
