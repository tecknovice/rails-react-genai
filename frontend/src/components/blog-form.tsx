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
import { AIContentGeneratorDialog } from "@/components/ai-content-generator-dialog";

const blogSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
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
      content: initialData?.content || "",
      published: initialData?.published || false,
    },
  });

  function handleSubmit(values: BlogFormValues) {
    onSubmit(values);
  }

  const handleContentGenerated = (generatedContent: string) => {
    form.setValue("content", generatedContent);
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Content</FormLabel>
                    <AIContentGeneratorDialog
                      onContentGenerated={handleContentGenerated}
                      triggerText="Generate with AI"
                      triggerVariant="outline"
                      triggerSize="sm"
                    />
                  </div>
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
                    Write the main content of your blog post, or use AI to
                    generate it.
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
