import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router";
import { getPublicBlogById } from "@/services/blog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Globe,
  AlertCircle,
} from "lucide-react";
import type { Blog } from "@/types/blog";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const blogId = Number(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["publicBlog", blogId],
    queryFn: () => getPublicBlogById(blogId),
    enabled: !!blogId,
  });

  const blog = data?.payload as Blog;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-full" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="border border-red-200 bg-red-50 rounded-lg p-6">
          <div className="mb-4">
            <h1 className="text-red-700 text-xl font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error Loading Blog
            </h1>
          </div>
          <div>
            <p className="text-red-700 mb-4">
              {error instanceof Error
                ? error.message
                : "The blog post you're looking for could not be found or may not be published."}
            </p>
            <Link to="/blogs">
              <Button variant="outline">View All Blogs</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="text-center p-8">
          <h1 className="text-xl font-semibold mb-2">Blog Not Found</h1>
          <p className="text-gray-600 mb-4">
            The blog post you're looking for could not be found or may not be
            published.
          </p>
          <Link to="/blogs">
            <Button variant="outline">View All Blogs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Header Section */}
          <header className="space-y-4">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <Badge variant="default" className="w-fit">
                <Globe className="h-3 w-3 mr-1" />
                Published
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
              {blog.user && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">
                    {blog.user.email.split("@")[0]}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Published on{" "}
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {blog.updated_at !== blog.created_at && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    Updated{" "}
                    {new Date(blog.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            <Separator />
          </header>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {blog.content}
            </div>
          </div>
        </div>
      </article>

      {/* Actions */}
      <div className="mt-8 flex justify-center">
        <Link to="/blogs">
          <Button variant="outline" size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Blogs
          </Button>
        </Link>
      </div>
    </div>
  );
}
