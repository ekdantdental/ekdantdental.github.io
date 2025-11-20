import { 
  users, 
  type User, 
  type InsertUser, 
  type Appointment, 
  type InsertAppointment, 
  appointments,
  type BlogPost,
  type InsertBlogPost,
  blogPosts
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  listAppointments(): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  listBlogPosts(): Promise<BlogPost[]>;
  listBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  listBlogPostsByTag(tag: string): Promise<BlogPost[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private blogPosts: Map<number, BlogPost>;
  private userId: number;
  private appointmentId: number;
  private blogPostId: number;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.blogPosts = new Map();
    this.userId = 1;
    this.appointmentId = 1;
    this.blogPostId = 1;
    
    // Initialize with some sample blog posts for dental health tips
    this.initializeSampleBlogPosts();
  }
  
  private initializeSampleBlogPosts() {
    const samplePosts: InsertBlogPost[] = [
      {
        title: "The Importance of Flossing Daily",
        slug: "importance-of-flossing-daily",
        summary: "Why flossing is a crucial part of your daily oral hygiene routine and how to do it properly.",
        content: `<p>Flossing is an essential part of oral hygiene that many people neglect. While brushing cleans the surface of your teeth, floss reaches areas your toothbrush can't - between teeth and under the gumline.</p>
                 <p>Regular flossing helps prevent:</p>
                 <ul>
                   <li>Plaque buildup and tartar formation</li>
                   <li>Gum disease (gingivitis and periodontitis)</li>
                   <li>Cavities between teeth</li>
                   <li>Bad breath</li>
                 </ul>
                 <p>To floss correctly:</p>
                 <ol>
                   <li>Use about 18 inches of floss, winding most around your middle fingers</li>
                   <li>Hold 1-2 inches between your thumbs and forefingers</li>
                   <li>Guide the floss gently between teeth using a rubbing motion</li>
                   <li>Curve the floss into a C-shape against one tooth when it reaches the gumline</li>
                   <li>Gently slide it into the space between the gum and tooth</li>
                   <li>Rub the side of the tooth with up-and-down movements</li>
                   <li>Repeat for the adjacent tooth and all teeth</li>
                 </ol>
                 <p>For those who find traditional flossing difficult, consider water flossers or floss picks as alternatives.</p>`,
        imageUrl: "/images/blog/flossing-technique.jpg",
        category: "oral-hygiene",
        tags: ["flossing", "oral hygiene", "gum health", "preventive care"],
        authorName: "Dr. Reshma Rathod",
        authorTitle: "MDS, BDS (Prosthodontist & Implantologist)",
        isPublished: true
      },
      {
        title: "How to Manage Dental Anxiety",
        slug: "managing-dental-anxiety",
        summary: "Practical strategies to overcome fear and anxiety related to dental visits.",
        content: `<p>Dental anxiety affects many people, from mild uneasiness to severe phobia. If fear keeps you from regular dental checkups, your oral health may suffer.</p>
                 <p>Here are effective strategies to manage dental anxiety:</p>
                 <h3>Before Your Appointment</h3>
                 <ul>
                   <li>Communicate your fears to your dentist - they can adapt their approach</li>
                   <li>Schedule appointments during less busy times when the office is calmer</li>
                   <li>Bring a trusted friend or family member for support</li>
                   <li>Practice relaxation techniques like deep breathing and meditation</li>
                 </ul>
                 <h3>During Treatment</h3>
                 <ul>
                   <li>Establish a signal with your dentist to pause if you need a break</li>
                   <li>Use distraction techniques like listening to music or podcasts</li>
                   <li>Progressive muscle relaxation can help reduce physical tension</li>
                 </ul>
                 <p>At Ekdant Multi Speciality and Implant Center, we understand dental anxiety and prioritize creating a comfortable, stress-free environment. Our team is trained to work with anxious patients and can offer various accommodation options.</p>
                 <p>Remember that modern dental care has advanced significantly, with many painless treatment options now available.</p>`,
        imageUrl: "/images/blog/dental-anxiety.jpg",
        category: "patient-education",
        tags: ["dental anxiety", "patient comfort", "mental health", "dental phobia"],
        authorName: "Dr. Sonali J Patil",
        authorTitle: "MDS, BDS (Prosthodontist)",
        isPublished: true
      },
      {
        title: "The Connection Between Diabetes and Oral Health",
        slug: "diabetes-oral-health-connection",
        summary: "Understanding how diabetes affects your dental health and special care considerations.",
        content: `<p>The relationship between diabetes and oral health is bidirectional - diabetes affects oral health, and oral health impacts diabetes management.</p>
                 <p>People with diabetes are more susceptible to:</p>
                 <ul>
                   <li><strong>Gum disease:</strong> Higher risk of gingivitis and periodontitis</li>
                   <li><strong>Dry mouth:</strong> Reduced saliva flow increases cavity risk</li>
                   <li><strong>Infections:</strong> Slower healing and increased infection risk</li>
                   <li><strong>Burning mouth syndrome:</strong> Painful burning sensation in the mouth</li>
                 </ul>
                 <h3>Special Oral Care for Diabetes Patients</h3>
                 <ul>
                   <li>Maintain good blood glucose control</li>
                   <li>Brush twice daily with fluoride toothpaste</li>
                   <li>Floss daily to remove plaque between teeth</li>
                   <li>Schedule dental checkups every 3-4 months instead of every 6 months</li>
                   <li>Inform your dentist about your diabetes and medication</li>
                   <li>Don't smoke, as it significantly increases complications</li>
                   <li>Treat dry mouth with sugar-free gum or lozenges</li>
                 </ul>
                 <p>At Ekdant Multi Speciality and Implant Center, our integrated approach to medical and dental care is especially beneficial for patients with diabetes. We coordinate with your diabetes management plan to ensure optimal oral health while supporting your overall health goals.</p>`,
        imageUrl: "/images/blog/diabetes-oral-health.jpg",
        category: "medical-dental",
        tags: ["diabetes", "gum disease", "medical conditions", "preventive care"],
        authorName: "Dr. Sunil Pawar",
        authorTitle: "MBBS, DNB, FNB - Critical Care Medicine",
        isPublished: true
      }
    ];
    
    // Add sample posts to the storage
    samplePosts.forEach(post => {
      const id = this.blogPostId++;
      const now = new Date();
      
      // Handle optional fields to match the schema
      const imageUrl = post.imageUrl || null;
      const tags = post.tags || null;
      const authorTitle = post.authorTitle || null;
      const isPublished = post.isPublished === undefined ? true : post.isPublished;
      
      const blogPost: BlogPost = {
        ...post,
        imageUrl,
        tags,
        authorTitle,
        isPublished,
        id,
        publishedAt: now,
        updatedAt: now
      };
      
      this.blogPosts.set(id, blogPost);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentId++;
    const now = new Date();
    
    // Ensure optional fields are null if undefined
    const message = insertAppointment.message === undefined ? null : insertAppointment.message;
    const anxietyLevel = insertAppointment.anxietyLevel === undefined ? null : insertAppointment.anxietyLevel;
    const anxietyAccommodations = insertAppointment.anxietyAccommodations === undefined ? null : insertAppointment.anxietyAccommodations;
    
    const appointment: Appointment = { 
      ...insertAppointment, 
      message,
      anxietyLevel,
      anxietyAccommodations,
      id, 
      createdAt: now,
      status: "pending" 
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async listAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  // Blog post methods
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const now = new Date();
    
    // Handle optional fields properly
    const imageUrl = insertBlogPost.imageUrl || null;
    const tags = insertBlogPost.tags || null;
    const authorTitle = insertBlogPost.authorTitle || null;
    const isPublished = insertBlogPost.isPublished === undefined ? true : insertBlogPost.isPublished;
    
    const blogPost: BlogPost = {
      ...insertBlogPost,
      imageUrl,
      tags,
      authorTitle,
      isPublished,
      id,
      publishedAt: now,
      updatedAt: now
    };
    
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }
  
  async listBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.isPublished)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
  
  async listBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.isPublished && post.category === category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
  
  async listBlogPostsByTag(tag: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.isPublished && post.tags && post.tags.includes(tag))
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
}

export const storage = new MemStorage();
