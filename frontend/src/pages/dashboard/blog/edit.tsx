import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { getBlogById, updateBlog } from "@/services/blog";
import { BlogForm } from "@/components/blog-form";

export default function BlogEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const blogId = Number(id);

  // Fetch the blog data
  const { data: blog, isLoading: isLoadingBlog, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId),
    enabled: !!blogId,
  });

  // Update blog mutation
  const updateMutation = useMutation({
    mutationFn: (data: { title: string; content: string; published: boolean }) =>
      updateBlog(blogId, data),
    onSuccess: () => {
      toast.success("Blog updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
      navigate("/dashboard/blog/list");
    },
    onError: (error) => {
      toast.error("Failed to update blog. Please try again.");
      console.error("Error updating blog:", error);
    },
  });

  function handleSubmit(values: { title: string; content: string; published: boolean }) {
    updateMutation.mutate(values);
  }

  function handleCancel() {
    navigate("/dashboard/blog/list");
  }

  if (isLoadingBlog) {
    return (
      <div className="container mx-auto">
        <div className="flex justify-center p-8">
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto">
        <div className="flex justify-center p-8 text-red-500">
          <p>Error loading blog. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!blog?.payload) {
    return (
      <div className="container mx-auto">
        <div className="flex justify-center p-8">
          <p>Blog not found.</p>
        </div>
      </div>
    );
  }

  return (
    <BlogForm
      mode="edit"
      initialData={blog.payload}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={updateMutation.isPending}
    />
  );
}
