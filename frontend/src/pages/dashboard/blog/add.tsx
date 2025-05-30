import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createBlog } from "@/services/blog";
import { BlogForm } from "@/components/blog-form";

export default function BlogAdd() {
  const navigate = useNavigate();

  const addMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      toast.success("Blog created successfully!");
      navigate("/dashboard/blog/list");
    },
    onError: (error) => {
      toast.error("Failed to create blog. Please try again.");
      console.error("Error creating blog:", error);
    },
  });

  function handleSubmit(values: { title: string; content: string; published: boolean }) {
    addMutation.mutate(values);
  }

  function handleCancel() {
    navigate("/dashboard/blog/list");
  }

  return (
    <BlogForm
      mode="create"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={addMutation.isPending}
    />
  );
}
