import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ChevronLeft, CalendarDays, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Categories and their display names
const CATEGORIES = {
  "oral-hygiene": "Oral Hygiene",
  "preventive-care": "Preventive Care",
  "patient-education": "Patient Education",
  "dental-procedures": "Dental Procedures",
  "medical-dental": "Medical & Dental Health",
  "children-dental": "Children's Dental Health"
};

type Category = keyof typeof CATEGORIES;

const BlogPostPage = () => {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: [`/api/blog-posts/slug/${slug}`],
    enabled: !!slug
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-40 mb-6" />
          <Skeleton className="h-12 w-full mb-4" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-80 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-6 text-gray-600">The blog post you're looking for doesn't exist or there was an error loading it.</p>
          <Button asChild>
            <Link href="/blog">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Category badge */}
        <div className="mb-4">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {CATEGORIES[post.category as Category] || post.category}
          </Badge>
        </div>

        {/* Post title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

        {/* Post metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{post.authorName}</span>
            {post.authorTitle && (
              <span className="ml-1 text-gray-400">({post.authorTitle})</span>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-1">
              <Tag className="h-4 w-4 mr-1" />
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="text-primary hover:underline cursor-pointer">
                  #{tag}{index < post.tags.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Featured image */}
        {post.imageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Post content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Separator className="my-8" />

        {/* Related articles section could be added here */}
        
        {/* Call to action */}
        <div className="bg-primary/5 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Have questions about your dental health?</h3>
          <p className="mb-4">Our team at Ekdant Multi Speciality and Implant Center is here to help.</p>
          <Button asChild>
            <Link href="/appointment">Schedule an Appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;