// Static blog data for GitHub Pages deployment
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  category: string;
  tags: string[] | null;
  authorName: string;
  authorTitle: string | null;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
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
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublished: true
  },
  {
    id: 2,
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
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublished: true
  },
  {
    id: 3,
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
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublished: true
  },
  {
    id: 4,
    title: "Effective Hypertension Management and Control",
    slug: "hypertension-management-control",
    summary: "Essential strategies for managing high blood pressure through lifestyle changes, medication adherence, and regular monitoring.",
    content: `<p>Hypertension, or high blood pressure, affects millions of people worldwide and is often called the "silent killer" because it typically has no symptoms until serious complications occur. Proper management is crucial for preventing heart disease, stroke, and kidney damage.</p>
             <h3>Understanding Your Blood Pressure Numbers</h3>
             <p>Blood pressure is measured in two numbers:</p>
             <ul>
               <li><strong>Systolic pressure (top number):</strong> Pressure when your heart beats</li>
               <li><strong>Diastolic pressure (bottom number):</strong> Pressure when your heart rests between beats</li>
             </ul>
             <p>Normal blood pressure is below 120/80 mmHg. Hypertension is diagnosed when readings consistently reach 140/90 mmHg or higher.</p>
             <h3>Lifestyle Modifications for Blood Pressure Control</h3>
             <ul>
               <li><strong>DASH Diet:</strong> Follow the Dietary Approaches to Stop Hypertension diet - rich in fruits, vegetables, whole grains, and low-fat dairy products</li>
               <li><strong>Reduce Sodium:</strong> Limit salt intake to less than 2,300 mg per day, ideally 1,500 mg</li>
               <li><strong>Maintain Healthy Weight:</strong> Even losing 5-10 pounds can significantly lower blood pressure</li>
               <li><strong>Regular Exercise:</strong> Aim for 150 minutes of moderate aerobic activity per week</li>
               <li><strong>Limit Alcohol:</strong> No more than 2 drinks per day for men, 1 for women</li>
               <li><strong>Quit Smoking:</strong> Smoking raises blood pressure and damages blood vessels</li>
               <li><strong>Manage Stress:</strong> Practice relaxation techniques like meditation, yoga, or deep breathing</li>
             </ul>
             <h3>Medication Adherence</h3>
             <p>If prescribed blood pressure medication:</p>
             <ul>
               <li>Take medications exactly as directed, even when feeling well</li>
               <li>Never skip doses or stop medication without consulting your doctor</li>
               <li>Use pill organizers or phone reminders to stay on schedule</li>
               <li>Discuss any side effects with your healthcare provider</li>
             </ul>
             <h3>Regular Monitoring</h3>
             <ul>
               <li>Check blood pressure at home regularly with a reliable monitor</li>
               <li>Keep a log of your readings to share with your doctor</li>
               <li>Measure at the same time each day for consistency</li>
               <li>Schedule regular checkups with your healthcare provider</li>
             </ul>
             <p>At Ekdant Multi Speciality and Implant Center, Dr. Sunil Pawar provides comprehensive hypertension management with personalized treatment plans, regular monitoring, and lifestyle counseling to help you maintain healthy blood pressure levels and reduce cardiovascular risk.</p>`,
    imageUrl: "/images/blog/hypertension-management.jpg",
    category: "health-wellness",
    tags: ["hypertension", "blood pressure", "cardiovascular health", "lifestyle modifications"],
    authorName: "Dr. Sunil Pawar",
    authorTitle: "MBBS, DNB, FNB - Critical Care Medicine",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublished: true
  },
  {
    id: 5,
    title: "Essential Tips for Blood Sugar Control",
    slug: "blood-sugar-control-tips",
    summary: "Practical strategies for maintaining healthy blood glucose levels through diet, exercise, and lifestyle management.",
    content: `<p>Controlling blood sugar levels is essential for managing diabetes and preventing complications. Whether you have Type 1, Type 2 diabetes, or prediabetes, these evidence-based strategies can help you maintain stable glucose levels.</p>
             <h3>Dietary Strategies for Blood Sugar Control</h3>
             <ul>
               <li><strong>Choose Complex Carbohydrates:</strong> Opt for whole grains, legumes, and vegetables instead of refined carbs and sugary foods</li>
               <li><strong>Portion Control:</strong> Use the plate method - fill half your plate with non-starchy vegetables, a quarter with lean protein, and a quarter with whole grains</li>
               <li><strong>Eat Regularly:</strong> Don't skip meals, especially breakfast. Consistent meal timing helps maintain stable blood sugar</li>
               <li><strong>Include Fiber:</strong> Aim for 25-30 grams of fiber daily from vegetables, fruits, whole grains, and legumes</li>
               <li><strong>Healthy Fats:</strong> Include sources like nuts, avocados, olive oil, and fatty fish to slow carbohydrate absorption</li>
               <li><strong>Limit Sugary Drinks:</strong> Avoid sodas, sweetened juices, and energy drinks that cause rapid blood sugar spikes</li>
               <li><strong>Stay Hydrated:</strong> Drink plenty of water throughout the day to help kidneys flush out excess sugar</li>
             </ul>
             <h3>Physical Activity for Better Glucose Control</h3>
             <ul>
               <li><strong>Regular Exercise:</strong> Aim for at least 150 minutes of moderate aerobic activity per week</li>
               <li><strong>Strength Training:</strong> Build muscle mass 2-3 times per week to improve insulin sensitivity</li>
               <li><strong>Post-Meal Walks:</strong> A 10-15 minute walk after meals can significantly reduce blood sugar spikes</li>
               <li><strong>Stay Consistent:</strong> Regular physical activity is more effective than sporadic intense workouts</li>
             </ul>
             <h3>Lifestyle Habits</h3>
             <ul>
               <li><strong>Monitor Regularly:</strong> Check your blood glucose as recommended by your doctor to identify patterns</li>
               <li><strong>Get Quality Sleep:</strong> Aim for 7-9 hours per night; poor sleep can increase insulin resistance</li>
               <li><strong>Manage Stress:</strong> Chronic stress raises cortisol levels, which can increase blood sugar</li>
               <li><strong>Limit Alcohol:</strong> Alcohol can cause blood sugar fluctuations; if drinking, do so with food</li>
             </ul>
             <h3>Carbohydrate Counting</h3>
             <p>Learning to count carbohydrates helps you understand how different foods affect your blood sugar:</p>
             <ul>
               <li>Read nutrition labels carefully</li>
               <li>Understand serving sizes</li>
               <li>Track your carbohydrate intake throughout the day</li>
               <li>Work with a dietitian to determine your ideal carb intake</li>
             </ul>
             <h3>Foods That Help Stabilize Blood Sugar</h3>
             <ul>
               <li>Leafy greens (spinach, kale, lettuce)</li>
               <li>Non-starchy vegetables (broccoli, cauliflower, peppers)</li>
               <li>Beans and lentils</li>
               <li>Nuts and seeds</li>
               <li>Fish rich in omega-3 fatty acids</li>
               <li>Cinnamon and other blood sugar-friendly spices</li>
             </ul>
             <h3>Warning Signs of Blood Sugar Problems</h3>
             <p>Contact your healthcare provider if you experience:</p>
             <ul>
               <li>Frequent urination or excessive thirst (high blood sugar)</li>
               <li>Shakiness, confusion, or sweating (low blood sugar)</li>
               <li>Persistent high or low readings despite following your plan</li>
               <li>Unexplained changes in blood sugar patterns</li>
             </ul>
             <p>At Ekdant Multi Speciality and Implant Center, we offer comprehensive diabetes management services including blood sugar monitoring, medication management, nutritional counseling, and lifestyle modification guidance. Dr. Sunil Pawar works closely with each patient to develop personalized strategies for optimal glucose control and overall health.</p>`,
    imageUrl: "/images/blog/blood-sugar-control.jpg",
    category: "health-wellness",
    tags: ["diabetes", "blood sugar", "nutrition", "diet management", "preventive care"],
    authorName: "Dr. Sunil Pawar",
    authorTitle: "MBBS, DNB, FNB - Critical Care Medicine",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublished: true
  }
];

// Helper functions
export function getBlogPosts(): BlogPost[] {
  return blogPosts.filter(post => post.isPublished);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.isPublished);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.isPublished && post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.isPublished && post.tags && post.tags.includes(tag));
}
