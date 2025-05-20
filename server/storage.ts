import { 
  users, 
  type User, 
  type InsertUser, 
  type Appointment, 
  type InsertAppointment, 
  appointments,
  type DentalCareRecommendation,
  type InsertDentalCareRecommendation,
  dentalCareRecommendations
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  listAppointments(): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  createDentalCareRecommendation(recommendation: InsertDentalCareRecommendation): Promise<DentalCareRecommendation>;
  getDentalCareRecommendationById(id: number): Promise<DentalCareRecommendation | undefined>;
  getDentalCareRecommendationsByEmail(email: string): Promise<DentalCareRecommendation[]>;
  listDentalCareRecommendations(): Promise<DentalCareRecommendation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private dentalCareRecommendations: Map<number, DentalCareRecommendation>;
  private userId: number;
  private appointmentId: number;
  private dentalCareRecommendationId: number;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.dentalCareRecommendations = new Map();
    this.userId = 1;
    this.appointmentId = 1;
    this.dentalCareRecommendationId = 1;
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

  async createDentalCareRecommendation(insertRecommendation: InsertDentalCareRecommendation): Promise<DentalCareRecommendation> {
    const id = this.dentalCareRecommendationId++;
    const now = new Date();

    // Generate recommendations based on user inputs
    const recommendations = this.generateRecommendations(insertRecommendation);
    
    // Ensure painLevel is null if undefined
    const painLevel = insertRecommendation.painLevel === undefined ? null : insertRecommendation.painLevel;
    // Ensure concerns is an empty array if undefined
    const concerns = insertRecommendation.concerns === undefined ? [] : insertRecommendation.concerns;
    
    const recommendation: DentalCareRecommendation = {
      ...insertRecommendation,
      painLevel,
      concerns,
      id,
      userId: null,
      recommendations,
      createdAt: now
    };
    
    this.dentalCareRecommendations.set(id, recommendation);
    return recommendation;
  }

  async getDentalCareRecommendationById(id: number): Promise<DentalCareRecommendation | undefined> {
    return this.dentalCareRecommendations.get(id);
  }

  async getDentalCareRecommendationsByEmail(email: string): Promise<DentalCareRecommendation[]> {
    return Array.from(this.dentalCareRecommendations.values()).filter(
      (recommendation) => recommendation.email.toLowerCase() === email.toLowerCase()
    );
  }

  async listDentalCareRecommendations(): Promise<DentalCareRecommendation[]> {
    return Array.from(this.dentalCareRecommendations.values());
  }

  private generateRecommendations(data: InsertDentalCareRecommendation): any {
    // Initialize recommendation object with personalized categories
    const recommendations: {
      generalAdvice: string[];
      specificTreatments: string[];
      homeCareTips: string[];
      urgency: "urgent" | "normal" | "routine";
      followUp: "immediate" | "1_month" | "3_months" | "6_months";
      riskScore?: number;
      riskCategory?: "high" | "moderate" | "low";
      componentScores?: {
        pain: number;
        hygiene: number;
        periodontal: number;
        age: number;
        careHistory: number;
        concerns: number;
      };
    } = {
      generalAdvice: [],
      specificTreatments: [],
      homeCareTips: [],
      urgency: "normal",
      followUp: "6_months"
    };

    // Calculate overall oral health risk score (0-100) with weighted factors
    let riskScore = 0;
    let painScore = 0;
    let hygieneScore = 0;
    let periodontalScore = 0;
    let ageRiskScore = 0;
    let careHistoryScore = 0;
    let concernScore = 0;
    
    // COMPREHENSIVE RISK ASSESSMENT SYSTEM
    
    // 1. Age-specific risk factors (weighted by clinical relevance)
    if (data.age < 6) {
      ageRiskScore += 15; // Very young children have higher cavity risk and need early intervention
      recommendations.generalAdvice.push("Early childhood dental visits are crucial for establishing good habits and preventing cavities");
    } 
    else if (data.age >= 6 && data.age < 12) {
      ageRiskScore += 10; // School-age children have high cavity risk due to diet and developing habits
      recommendations.generalAdvice.push("Children's dental health sets the foundation for a lifetime of good oral health");
    } 
    else if (data.age >= 12 && data.age < 18) {
      ageRiskScore += 8; // Teenagers often have orthodontic needs and changing habits
      recommendations.generalAdvice.push("Teenage years are critical for addressing alignment issues and reinforcing good habits");
    } 
    else if (data.age >= 60) {
      ageRiskScore += 15; // Seniors have higher risk for periodontal disease, root decay, and medication effects
      recommendations.generalAdvice.push("Dental health needs often change with age due to medications, systemic health conditions, and lifetime wear");
    } 
    else if (data.age >= 40 && data.age < 60) {
      ageRiskScore += 8; // Middle-aged adults often show first signs of long-term dental issues
      recommendations.generalAdvice.push("Middle age is when many dental issues from earlier in life may begin requiring more attention");
    }

    riskScore += ageRiskScore;
    
    // 2. Oral hygiene practices (major risk determinant)
    if (data.dailyBrushingFrequency === 0) {
      hygieneScore += 35; // No brushing is a severe risk factor
      recommendations.generalAdvice.push("Regular brushing is the foundation of dental health and cavity prevention");
    } 
    else if (data.dailyBrushingFrequency === 1) {
      hygieneScore += 25; // Once daily is insufficient for most people
      recommendations.generalAdvice.push("Brushing twice daily significantly reduces plaque buildup and cavity risk");
    } 
    else if (data.dailyBrushingFrequency >= 4) {
      hygieneScore += 5; // Over-brushing can indicate abrasion issues
      recommendations.generalAdvice.push("Be careful not to brush too aggressively as this can damage enamel and gums");
    }

    if (data.flossingFrequency === "never") {
      hygieneScore += 20; // No flossing significantly increases interproximal decay and gum disease
      recommendations.generalAdvice.push("Areas between teeth can only be properly cleaned with floss or interdental cleaners");
    } 
    else if (data.flossingFrequency === "occasionally") {
      hygieneScore += 10; // Occasional flossing leaves periods of bacterial growth
      recommendations.generalAdvice.push("Consistent daily flossing is necessary for preventing gum disease and cavities between teeth");
    }

    riskScore += hygieneScore;
    
    // 3. Pain assessment (critical factor requiring immediate attention)
    if (data.hasPain === "yes") {
      painScore += 25; // Pain is always a significant concern requiring evaluation
      
      // Pain level severity analysis (using pain scale standard)
      if (data.painLevel) {
        if (data.painLevel >= 8) {
          painScore += 25; // Severe pain often indicates serious infection or injury
          recommendations.generalAdvice.push("Severe dental pain can indicate a serious infection that may require urgent treatment");
        } 
        else if (data.painLevel >= 5) {
          painScore += 15; // Moderate pain suggests active problems requiring treatment
          recommendations.generalAdvice.push("Moderate pain usually indicates active dental problems that need professional attention");
        } 
        else {
          painScore += 5; // Mild pain still requires evaluation but may be less urgent
          recommendations.generalAdvice.push("Even mild dental pain can be a warning sign of developing issues");
        }
      } else {
        painScore += 10; // Unspecified pain level still requires attention
      }
      
      // Pain pattern assessment (adding to detailed analysis)
      if (data.teethSensitivity === "high") {
        painScore += 5; // Pain with sensitivity suggests exposed dentin or cracked teeth
        recommendations.generalAdvice.push("Pain combined with sensitivity often suggests exposed dentin, enamel erosion, or potential cracks");
      }
    }

    riskScore += painScore;
    
    // 4. Periodontal (gum) health assessment
    if (data.bleedingGums === "yes") {
      periodontalScore += 25; // Bleeding gums indicate active gingivitis or periodontitis
      recommendations.generalAdvice.push("Bleeding gums are a clear indicator of gum inflammation that requires attention");
      
      // Correlate with other risk factors for more precise assessment
      if (data.flossingFrequency === "never") {
        periodontalScore += 5; // Combined lack of flossing with bleeding indicates likely periodontitis
        recommendations.generalAdvice.push("The combination of bleeding gums and lack of flossing significantly increases periodontal disease risk");
      }
      
      if (data.lastDentalVisit === "never" || data.lastDentalVisit === "more_than_12_months") {
        periodontalScore += 5; // Untreated bleeding for extended periods increases risk
        recommendations.generalAdvice.push("Untreated gum disease can progress to more serious conditions affecting both oral and systemic health");
      }
    }

    riskScore += periodontalScore;
    
    // 5. Sensitivity assessment (indicator of enamel loss, recession, or cracks)
    if (data.teethSensitivity === "high") {
      riskScore += 15;
      recommendations.generalAdvice.push("High sensitivity may indicate enamel erosion, receding gums, or exposed roots");
    } 
    else if (data.teethSensitivity === "medium") {
      riskScore += 8;
      recommendations.generalAdvice.push("Moderate sensitivity should be evaluated to prevent worsening conditions");
    }
    
    // 6. Dental care history (indicator of prevention and maintenance)
    if (data.lastDentalVisit === "never") {
      careHistoryScore += 30; // No dental history suggests likely undiagnosed issues
      recommendations.generalAdvice.push("Without regular dental exams, problems often go undetected until they become serious");
    } 
    else if (data.lastDentalVisit === "more_than_12_months") {
      careHistoryScore += 20; // Extended gaps in care allow progression of problems
      recommendations.generalAdvice.push("Regular dental visits are essential for early detection and treatment of dental issues");
    } 
    else if (data.lastDentalVisit === "6_to_12_months") {
      careHistoryScore += 5; // Slightly delayed care schedule
      recommendations.generalAdvice.push("Maintaining a consistent 6-month check-up schedule helps prevent dental problems");
    }

    riskScore += careHistoryScore;
    
    // 7. Specific concern assessment (weighted by clinical significance)
    if (data.concerns && data.concerns.length > 0) {
      // Base score for having concerns
      concernScore += Math.min(data.concerns.length * 3, 15);
      
      // Weight specific concerns by clinical importance
      data.concerns.forEach(concern => {
        switch(concern) {
          case "gum_disease":
            concernScore += 8; // Periodontal disease has systemic health implications
            break;
          case "cavities":
            concernScore += 6; // Active decay requires treatment
            break;
          case "missing_teeth":
            concernScore += 7; // Missing teeth affect function and adjacent teeth
            break;
          case "grinding_teeth":
            concernScore += 5; // Grinding causes long-term damage
            break;
          case "bad_breath":
            concernScore += 4; // May indicate underlying issues
            break;
          case "teeth_alignment":
            concernScore += 3; // Functional and aesthetic concern
            break;
          case "teeth_whitening":
            concernScore += 1; // Primarily aesthetic concern
            break;
        }
      });
    }

    riskScore += concernScore;
    
    // DETERMINE URGENCY BASED ON RISK SCORE
    if (riskScore >= 70 || (data.hasPain === "yes" && data.painLevel && data.painLevel >= 7)) {
      recommendations.urgency = "urgent";
      recommendations.followUp = "immediate";
    } else if (riskScore >= 40) {
      recommendations.urgency = "normal";
      recommendations.followUp = "1_month";
    } else {
      recommendations.urgency = "routine";
      recommendations.followUp = "6_months";
    }
    
    // PERSONALIZED RECOMMENDATIONS GENERATION
    
    // 1. ORAL HYGIENE RECOMMENDATIONS
    
    // Brushing recommendations
    if (data.dailyBrushingFrequency < 1) {
      recommendations.generalAdvice.push("Begin brushing teeth at least twice daily with fluoride toothpaste");
      recommendations.homeCareTips.push("Set reminders to brush in the morning and before bed");
    } else if (data.dailyBrushingFrequency < 2) {
      recommendations.generalAdvice.push("Increase brushing frequency to twice daily with fluoride toothpaste");
      recommendations.homeCareTips.push("Make sure to brush for at least 2 minutes each time");
    } else if (data.dailyBrushingFrequency === 2) {
      recommendations.generalAdvice.push("Continue your good habit of brushing twice daily");
      recommendations.homeCareTips.push("Consider using an electric toothbrush for more effective cleaning");
    } else {
      recommendations.generalAdvice.push("Your frequent brushing routine is excellent");
      recommendations.homeCareTips.push("Make sure you're using gentle technique to avoid gum damage");
    }

    // Flossing recommendations
    if (data.flossingFrequency === "never") {
      recommendations.homeCareTips.push("Start flossing daily to remove plaque between teeth");
      recommendations.homeCareTips.push("Consider using floss picks or a water flosser if traditional floss is difficult");
      recommendations.specificTreatments.push("Professional demonstration of proper flossing technique");
    } else if (data.flossingFrequency === "occasionally") {
      recommendations.homeCareTips.push("Increase flossing to once daily for better gum health");
      recommendations.homeCareTips.push("Try to incorporate flossing into your nightly routine");
    } else {
      recommendations.homeCareTips.push("Continue your excellent daily flossing routine");
    }

    // 2. PAIN MANAGEMENT RECOMMENDATIONS
    if (data.hasPain === "yes") {
      recommendations.specificTreatments.push("Comprehensive dental examination to diagnose the source of pain");
      
      if (data.painLevel && data.painLevel >= 7) {
        recommendations.specificTreatments.push("Emergency dental assessment for severe pain");
        recommendations.homeCareTips.push("Until your appointment, use over-the-counter pain relievers as directed");
      } else if (data.painLevel && data.painLevel >= 4) {
        recommendations.specificTreatments.push("Dental assessment to address moderate pain");
        recommendations.homeCareTips.push("Avoid extremely hot, cold, or sweet foods and beverages");
      } else {
        recommendations.specificTreatments.push("Dental check-up to address mild pain");
      }
      
      // Additional advice based on sensitivity
      if (data.teethSensitivity === "high") {
        recommendations.specificTreatments.push("Evaluation for exposed dentin or tooth fractures");
      }
    }

    // 3. SENSITIVITY RECOMMENDATIONS
    if (data.teethSensitivity === "high") {
      recommendations.specificTreatments.push("In-office desensitizing treatments");
      recommendations.specificTreatments.push("Professional fluoride application");
      recommendations.homeCareTips.push("Use desensitizing toothpaste (containing potassium nitrate or stannous fluoride)");
      recommendations.homeCareTips.push("Apply sensitive toothpaste directly to sensitive areas before bed");
      recommendations.homeCareTips.push("Use a soft-bristled toothbrush with gentle technique");
      
      if (recommendations.followUp === "6_months") {
        recommendations.followUp = "1_month";
      }
    } else if (data.teethSensitivity === "medium") {
      recommendations.specificTreatments.push("Evaluation for potential enamel wear or recession");
      recommendations.homeCareTips.push("Use toothpaste formulated for sensitive teeth");
      recommendations.homeCareTips.push("Avoid acidic foods and beverages that can worsen sensitivity");
      
      if (recommendations.followUp === "6_months") {
        recommendations.followUp = "3_months";
      }
    }

    // 4. GUM HEALTH RECOMMENDATIONS
    if (data.bleedingGums === "yes") {
      recommendations.specificTreatments.push("Comprehensive periodontal evaluation");
      recommendations.specificTreatments.push("Professional cleaning to remove plaque and tartar");
      recommendations.homeCareTips.push("Gentle but thorough brushing along the gumline");
      recommendations.homeCareTips.push("Daily flossing to remove bacteria between teeth");
      recommendations.homeCareTips.push("Consider using an antimicrobial mouthwash");
      recommendations.generalAdvice.push("Gum bleeding is not normal and typically indicates inflammation");
      
      if (recommendations.followUp === "6_months" || recommendations.followUp === "3_months") {
        recommendations.followUp = "1_month";
      }
    }

    // 5. RECOMMENDATIONS BASED ON DENTAL HISTORY
    if (data.lastDentalVisit === "never") {
      recommendations.specificTreatments.push("Complete dental examination including x-rays");
      recommendations.specificTreatments.push("Professional cleaning and oral health assessment");
      recommendations.generalAdvice.push("Regular dental check-ups every 6 months are essential for prevention");
      
      if (recommendations.followUp === "6_months" && data.hasPain !== "yes") {
        recommendations.followUp = "1_month";
      }
    } else if (data.lastDentalVisit === "more_than_12_months") {
      recommendations.specificTreatments.push("Comprehensive dental examination and professional cleaning");
      recommendations.generalAdvice.push("Regular dental check-ups twice a year help prevent major issues");
      
      if (recommendations.followUp === "6_months" && data.hasPain !== "yes") {
        recommendations.followUp = "1_month";
      }
    } else if (data.lastDentalVisit === "6_to_12_months") {
      recommendations.generalAdvice.push("Resume regular 6-month dental check-ups for preventive care");
    } else {
      recommendations.generalAdvice.push("Continue with your regular dental check-ups");
    }

    // 6. AGE-SPECIFIC RECOMMENDATIONS
    if (data.age < 12) {
      recommendations.specificTreatments.push("Professional fluoride application for cavity prevention");
      recommendations.specificTreatments.push("Dental sealants for cavity-prone molars if not already present");
      recommendations.homeCareTips.push("Parental supervision during brushing for thorough cleaning");
      recommendations.generalAdvice.push("Limit sugary snacks and drinks to protect developing teeth");
    } 
    else if (data.age >= 12 && data.age < 18) {
      recommendations.specificTreatments.push("Fluoride treatment for cavity prevention");
      
      if (data.age > 7 && data.age < 14) {
        recommendations.specificTreatments.push("Orthodontic evaluation for alignment and bite issues");
      }
      
      recommendations.generalAdvice.push("Maintain good oral hygiene during teenage years when cavity risk is high");
    } 
    else if (data.age >= 18 && data.age < 40) {
      recommendations.generalAdvice.push("Regular professional cleanings to prevent gum disease");
      
      if (data.concerns && data.concerns.includes("wisdom_teeth")) {
        recommendations.specificTreatments.push("Wisdom teeth evaluation if not previously addressed");
      }
    } 
    else if (data.age >= 40 && data.age < 60) {
      recommendations.specificTreatments.push("Comprehensive periodontal evaluation");
      recommendations.generalAdvice.push("Monitor for signs of gum recession and increased sensitivity");
      recommendations.homeCareTips.push("Consider using prescription-strength fluoride toothpaste");
    } 
    else { // 60+
      recommendations.specificTreatments.push("Comprehensive oral cancer screening");
      recommendations.specificTreatments.push("Evaluation for dry mouth and related conditions");
      recommendations.homeCareTips.push("Extra attention to gum health as risk of periodontitis increases");
      recommendations.generalAdvice.push("Discuss medication side effects that may impact oral health");
    }

    // 7. SPECIFIC DENTAL CONCERNS RECOMMENDATIONS
    if (data.concerns && data.concerns.length > 0) {
      data.concerns.forEach(concern => {
        switch (concern) {
          case "cavities":
            recommendations.specificTreatments.push("Comprehensive cavity assessment and potential fillings");
            recommendations.specificTreatments.push("Professional fluoride treatment to remineralize early cavities");
            recommendations.homeCareTips.push("Reduce frequency of sugary foods and drinks");
            recommendations.homeCareTips.push("Use a fluoride mouthwash daily to strengthen enamel");
            break;
            
          case "gum_disease":
            recommendations.specificTreatments.push("Deep cleaning (scaling and root planing)");
            recommendations.specificTreatments.push("Periodontal evaluation and possible referral to specialist");
            recommendations.homeCareTips.push("Use an antibacterial mouthwash to reduce bacteria");
            recommendations.homeCareTips.push("Consider investing in a water flosser for deeper cleaning");
            recommendations.followUp = recommendations.followUp === "immediate" ? "immediate" : "1_month";
            break;
            
          case "bad_breath":
            recommendations.specificTreatments.push("Professional assessment for underlying causes of halitosis");
            recommendations.specificTreatments.push("Tongue cleaning demonstration and oral hygiene instruction");
            recommendations.homeCareTips.push("Clean your tongue daily with a tongue scraper");
            recommendations.homeCareTips.push("Use alcohol-free antimicrobial mouthwash");
            recommendations.homeCareTips.push("Stay hydrated to prevent dry mouth, which can cause bad breath");
            break;
            
          case "teeth_alignment":
            recommendations.specificTreatments.push("Orthodontic consultation for alignment options");
            recommendations.specificTreatments.push("3D scanning for precise treatment planning");
            recommendations.generalAdvice.push("Explore both traditional braces and clear aligner options");
            
            if (data.age < 18) {
              recommendations.generalAdvice.push("Early orthodontic intervention can reduce treatment time");
            }
            break;
            
          case "teeth_whitening":
            recommendations.specificTreatments.push("Professional assessment for whitening options");
            recommendations.specificTreatments.push("Customized take-home whitening treatment");
            recommendations.homeCareTips.push("Avoid or limit staining substances: coffee, tea, red wine, tobacco");
            recommendations.homeCareTips.push("Use whitening toothpaste for maintenance after treatment");
            break;
            
          case "missing_teeth":
            recommendations.specificTreatments.push("Comprehensive evaluation for replacement options");
            recommendations.specificTreatments.push("3D imaging for implant planning if applicable");
            recommendations.generalAdvice.push("Discuss benefits and limitations of implants, bridges, and dentures");
            recommendations.generalAdvice.push("Address missing teeth promptly to prevent bone loss and shifting");
            recommendations.followUp = recommendations.followUp === "immediate" ? "immediate" : "1_month";
            break;
            
          case "grinding_teeth":
            recommendations.specificTreatments.push("Custom night guard fabrication and fitting");
            recommendations.specificTreatments.push("Evaluation for TMJ-related issues");
            recommendations.homeCareTips.push("Practice stress reduction techniques like meditation or deep breathing");
            recommendations.homeCareTips.push("Avoid caffeine and alcohol close to bedtime");
            recommendations.generalAdvice.push("Be aware of clenching during daytime and practice relaxing your jaw");
            break;
            
          default:
            break;
        }
      });
    }

    // 8. PREVENTIVE ADVICE FOR EVERYONE
    if (!recommendations.generalAdvice.includes("Drink plenty of water throughout the day to help wash away food particles")) {
      recommendations.generalAdvice.push("Drink plenty of water throughout the day to help wash away food particles");
    }
    
    if (!recommendations.homeCareTips.includes("Replace your toothbrush every 3-4 months")) {
      recommendations.homeCareTips.push("Replace your toothbrush every 3-4 months");
    }

    // Remove any duplicate recommendations
    recommendations.generalAdvice = recommendations.generalAdvice.filter((item, index) => 
      recommendations.generalAdvice.indexOf(item) === index);
    recommendations.specificTreatments = recommendations.specificTreatments.filter((item, index) => 
      recommendations.specificTreatments.indexOf(item) === index);
    recommendations.homeCareTips = recommendations.homeCareTips.filter((item, index) => 
      recommendations.homeCareTips.indexOf(item) === index);

    // Add risk score to recommendations for UI visualization
    const scoredRecommendations = recommendations as typeof recommendations & { 
      riskScore: number;
      riskCategory: "high" | "moderate" | "low";
      componentScores: {
        pain: number;
        hygiene: number;
        periodontal: number;
        age: number;
        careHistory: number;
        concerns: number;
      };
    };
    
    scoredRecommendations.riskScore = Math.min(100, riskScore);
    
    // Add risk category based on score
    if (riskScore >= 70) {
      scoredRecommendations.riskCategory = "high";
    } else if (riskScore >= 40) {
      scoredRecommendations.riskCategory = "moderate";
    } else {
      scoredRecommendations.riskCategory = "low";
    }
    
    // Add component scores for detailed breakdown
    scoredRecommendations.componentScores = {
      pain: painScore,
      hygiene: hygieneScore,
      periodontal: periodontalScore,
      age: ageRiskScore,
      careHistory: careHistoryScore,
      concerns: concernScore
    };
    
    return scoredRecommendations;
  }
}

export const storage = new MemStorage();
