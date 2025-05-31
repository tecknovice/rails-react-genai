import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { format } from "date-fns";
import { toast } from "sonner"; // Changed from "@/components/ui/use-toast" to "sonner"

// Shadcn UI components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Icons
import {
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Plus,
  Globe,
  FileLock,
} from "lucide-react";

// API service - using correct path
import {
  getBlogs,
  deleteBlog,
  publishBlog,
  unpublishBlog,
} from "@/services/blog";

// Types
interface Blog {
  id: number;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function BlogList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch blogs
  const { data, isLoading, error } = useQuery({
    queryKey: ["getBlogs"],
    queryFn: getBlogs,
  });

  // Delete blog mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
      toast("Blog deleted", {
        description: "Your blog has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: "Failed to delete blog. Please try again.",
      });
    },
  });

  // Publish blog mutation
  const publishMutation = useMutation({
    mutationFn: publishBlog,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
      toast("Blog updated", {
        description: "Your blog has been published.",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: "Failed to publish status. Please try again.",
      });
    },
  });

  // Publish blog mutation
  const unpublishMutation = useMutation({
    mutationFn: unpublishBlog,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
      toast("Blog unpublished", {
        description: "Your blog has been unpublished.",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: "Failed to unpublish status. Please try again.",
      });
    },
  });

  // Handle blog actions
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteMutation.mutate(id);
    }
  };

  const handlePublish = (id: number, currentStatus: boolean) => {
    if (currentStatus) {
      unpublishMutation.mutate(id);
    } else {
      publishMutation.mutate(id);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/dashboard/blog/edit/${id}`);
  };

  const handleView = (id: number) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Blogs</h1>
          <p className="text-muted-foreground mt-1">
            Manage your blog posts here
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/blog/add">
            <Plus className="mr-2 h-4 w-4" /> New Blog
          </Link>
        </Button>
      </div>

      <Separator className="my-6" />

      {isLoading ? (
        <div className="flex justify-center p-8">
          <p>Loading blogs...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center p-8 text-red-500">
          <p>Error loading blogs. Please try again.</p>
        </div>
      ) : data?.payload?.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/50">
          <h3 className="font-medium text-lg mb-2">No blogs found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first blog post to get started.
          </p>
          <Button asChild>
            <Link to="/dashboard/blog/add">Create Blog</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.payload?.map((blog: Blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>
                    <Badge variant={blog.published ? "default" : "outline"}>
                      {blog.published ? (
                        <Globe className="mr-1 h-3 w-3 inline" />
                      ) : (
                        <FileLock className="mr-1 h-3 w-3 inline" />
                      )}
                      {blog.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(blog.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(blog.updated_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(blog.id)}>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(blog.id)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handlePublish(blog.id, blog.published)}
                        >
                          {blog.published ? (
                            <>
                              <FileLock className="mr-2 h-4 w-4" /> Unpublish
                            </>
                          ) : (
                            <>
                              <Globe className="mr-2 h-4 w-4" /> Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
