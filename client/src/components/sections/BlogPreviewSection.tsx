import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, CalendarDays } from "lucide-react";
import { getBlogPosts, BlogPost } from "@/lib/blogData";

const BlogPreviewSection = () => {
  // Get blog posts from static data
  const blogPosts = getBlogPosts();

  // Get the latest 3 blog posts
  const latestPosts = blogPosts.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <section id="dental-health-tips" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Dental Health Tips</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Helpful articles and resources to keep your teeth and gums healthy. Learn about proper dental care practices and the latest in dental health.
          </p>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post: BlogPost) => (
              <Card key={post.id} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 line-clamp-3">{post.summary}</p>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read Article
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500">No blog posts available yet. Check back soon!</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/blog">
              View All Dental Health Tips
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
