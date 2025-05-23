import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/services/blogs";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  ChevronRight,
  FileText,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router";
import Navbar from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  // Filter blogs based on search term
  const filteredBlogs = data?.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-0">
                <Skeleton className="h-5 w-20 mb-2" />
                <Skeleton className="h-7 w-full mb-2" />
              </CardHeader>
              <CardContent className="py-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-700 flex items-center gap-2">
              <X className="h-5 w-5" />
              Error Loading Blogs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-red-700">
              {error.message}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-gray-800">
            {searchTerm
              ? `Search Results ${
                  filteredBlogs?.length ? `(${filteredBlogs.length})` : ""
                }`
              : "All Articles"}
          </h2>
        </div>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search blogs..."
              className="pl-8 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Link to="/blogs/new">
            <Button>Create New</Button>
          </Link>
        </div>
      </div>

      {filteredBlogs && filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.id}`}
              className="block transition-all hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
            >
              <Card className="h-full overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        blog.published
                          ? "border-transparent bg-green-100 text-green-800"
                          : "border-transparent bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                    {blog.user && (
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">
                          {blog.user.email.split("@")[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="py-2">
                  <CardDescription className="line-clamp-3">
                    {blog.content}
                  </CardDescription>
                </CardContent>

                <CardFooter className="pt-3 flex items-center justify-between border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span className="text-xs">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center text-primary font-medium text-sm hover:translate-x-1 transition-transform">
                    <span className="mr-1">Read More</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="text-center">
          <CardHeader>
            <CardTitle>No blogs found</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {searchTerm
                ? "No blogs match your search criteria. Try a different search term."
                : "There are no blog posts available yet."}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/blogs/new">
              <Button>Create your first blog</Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
