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
    
    // Ensure message is null if it's undefined
    const message = insertAppointment.message === undefined ? null : insertAppointment.message;
    
    const appointment: Appointment = { 
      ...insertAppointment, 
      message,
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
    const recommendations = {
      generalAdvice: [] as string[],
      specificTreatments: [] as string[],
      homeCareTips: [] as string[],
      urgency: "normal" as "urgent" | "normal" | "routine",
      followUp: "6_months" as "immediate" | "1_month" | "3_months" | "6_months"
    };

    // General advice based on brushing habits
    if (data.dailyBrushingFrequency < 2) {
      recommendations.generalAdvice.push("Increase brushing to at least twice daily with fluoride toothpaste");
    } else {
      recommendations.generalAdvice.push("Continue your good habit of brushing twice daily");
    }

    // Flossing recommendations
    if (data.flossingFrequency === "never") {
      recommendations.homeCareTips.push("Start flossing daily to remove plaque between teeth");
      recommendations.homeCareTips.push("Consider using a water flosser if traditional floss is difficult to use");
    } else if (data.flossingFrequency === "occasionally") {
      recommendations.homeCareTips.push("Increase flossing to once daily for better gum health");
    } else {
      recommendations.homeCareTips.push("Continue your excellent flossing routine");
    }

    // Handle pain and sensitivity
    if (data.hasPain === "yes") {
      recommendations.urgency = "urgent";
      recommendations.followUp = "immediate";
      recommendations.specificTreatments.push("Comprehensive dental examination to diagnose the source of pain");
      
      if (data.painLevel && data.painLevel >= 7) {
        recommendations.specificTreatments.push("Possible emergency treatment for severe pain");
      }
    }

    // Sensitivity recommendations
    if (data.teethSensitivity === "high") {
      recommendations.specificTreatments.push("Desensitizing treatments or fluoride application");
      recommendations.homeCareTips.push("Use toothpaste for sensitive teeth");
      if (recommendations.followUp !== "immediate") {
        recommendations.followUp = "1_month";
      }
    } else if (data.teethSensitivity === "medium") {
      recommendations.homeCareTips.push("Use toothpaste for sensitive teeth");
      if (recommendations.followUp === "6_months") {
        recommendations.followUp = "3_months";
      }
    }

    // Bleeding gums recommendations
    if (data.bleedingGums === "yes") {
      recommendations.specificTreatments.push("Professional cleaning and gum assessment");
      recommendations.homeCareTips.push("Gentle but thorough brushing along the gumline");
      recommendations.homeCareTips.push("Consider using an antimicrobial mouthwash");
      if (recommendations.followUp === "6_months") {
        recommendations.followUp = "3_months";
      }
    }

    // Recommendations based on last dental visit
    if (data.lastDentalVisit === "never" || data.lastDentalVisit === "more_than_12_months") {
      recommendations.specificTreatments.push("Comprehensive dental examination and professional cleaning");
      recommendations.generalAdvice.push("Regular dental check-ups every 6 months are recommended");
      if (recommendations.followUp === "6_months" && data.hasPain !== "yes") {
        recommendations.followUp = "1_month";
      }
    } else if (data.lastDentalVisit === "6_to_12_months") {
      recommendations.generalAdvice.push("Resume regular 6-month dental check-ups");
    } else {
      recommendations.generalAdvice.push("Continue with your regular dental check-ups");
    }

    // Age-specific recommendations
    if (data.age < 18) {
      recommendations.specificTreatments.push("Fluoride treatment for cavity prevention");
      if (data.age > 7 && data.age < 14) {
        recommendations.specificTreatments.push("Orthodontic evaluation may be appropriate at this age");
      }
    } else if (data.age >= 40) {
      recommendations.specificTreatments.push("Comprehensive periodontal evaluation");
      recommendations.generalAdvice.push("Monitor for signs of gum recession and increased sensitivity");
    }

    // Recommendations based on specific concerns
    if (data.concerns && data.concerns.length > 0) {
      data.concerns.forEach(concern => {
        switch (concern) {
          case "cavities":
            recommendations.specificTreatments.push("Cavity risk assessment and potential fillings");
            recommendations.homeCareTips.push("Consider reducing sugar intake and using fluoride mouthwash");
            break;
          case "gum_disease":
            recommendations.specificTreatments.push("Deep cleaning (scaling and root planing)");
            recommendations.followUp = recommendations.followUp === "immediate" ? "immediate" : "1_month";
            break;
          case "bad_breath":
            recommendations.specificTreatments.push("Oral hygiene assessment and tongue cleaning demonstration");
            recommendations.homeCareTips.push("Regular tongue cleaning and antimicrobial mouthwash");
            break;
          case "teeth_alignment":
            recommendations.specificTreatments.push("Orthodontic consultation for alignment options");
            break;
          case "teeth_whitening":
            recommendations.specificTreatments.push("Professional whitening options assessment");
            recommendations.homeCareTips.push("Avoid staining foods and beverages (coffee, tea, wine)");
            break;
          case "missing_teeth":
            recommendations.specificTreatments.push("Consultation for replacement options (implants, bridges, dentures)");
            recommendations.followUp = recommendations.followUp === "immediate" ? "immediate" : "1_month";
            break;
          case "grinding_teeth":
            recommendations.specificTreatments.push("Night guard evaluation and fitting");
            recommendations.homeCareTips.push("Stress reduction techniques and jaw relaxation exercises");
            break;
          default:
            break;
        }
      });
    }

    return recommendations;
  }
}

export const storage = new MemStorage();
