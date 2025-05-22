import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../services/blogs";

export default function Blogs() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {data &&
          data.map((blog) => (
            <li key={blog.id}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
