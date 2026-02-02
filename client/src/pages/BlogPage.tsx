import { useState } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays } from "lucide-react";
import { getBlogPosts, BlogPost } from "@/lib/blogData";

// Categories and their display names
const CATEGORIES = {
  "oral-hygiene": "Oral Hygiene",
  "preventive-care": "Preventive Care",
  "patient-education": "Patient Education",
  "dental-procedures": "Dental Procedures",
  "medical-dental": "Medical & Dental Health",
  "children-dental": "Children's Dental Health",
  "health-wellness": "Health & Wellness"
};

type Category = keyof typeof CATEGORIES;

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  
  // Get blog posts from static data
  const blogPosts = getBlogPosts();

  // Filter posts by category if a category is selected
  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter((post: BlogPost) => post.category === activeCategory);

  const handleCategoryChange = (category: Category | "all") => {
    setActiveCategory(category);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Dental Health Tips</h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Practical advice, tips, and information to help maintain optimal dental and oral health
            </p>
          </div>
          <Separator className="my-4" />
        </div>

        <Tabs defaultValue="all" className="mt-8 w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-flow-col auto-cols-auto gap-2">
              <TabsTrigger 
                value="all" 
                onClick={() => handleCategoryChange("all")}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Topics
              </TabsTrigger>
              {Object.entries(CATEGORIES).map(([key, value]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  onClick={() => handleCategoryChange(key as Category)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {value}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-6">
            {filteredPosts?.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">No blog posts found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts?.map((post: BlogPost) => (
                  <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                    {post.imageUrl && (
                      <div className="aspect-[16/9] relative">
                        <img 
                          src={post.imageUrl || '/images/blog-placeholder.jpg'} 
                          alt={post.title} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-none">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          {CATEGORIES[post.category as Category] || post.category}
                        </Badge>
                      </div>
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
                      <p className="text-gray-500 line-clamp-3">{post.summary}</p>
                    </CardContent>
                    <CardFooter className="flex-none border-t pt-4">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm text-gray-500">By {post.authorName}</span>
                        <Link href={`/blog/${post.slug}`} className="text-primary hover:underline font-medium text-sm">
                          Read More
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default BlogPage;
