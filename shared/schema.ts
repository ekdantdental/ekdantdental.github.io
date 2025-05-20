import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema remains the same
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Add appointment schema
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  anxietyLevel: text("anxiety_level"),
  anxietyAccommodations: text("anxiety_accommodations").array(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("pending"),
});

export const appointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertAppointment = z.infer<typeof appointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Dental care recommendation schema
export const dentalCareRecommendations = pgTable("dental_care_recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  email: text("email").notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  hasPain: text("has_pain").notNull(), // "yes" or "no"
  painLevel: integer("pain_level"), // 1-10
  teethSensitivity: text("teeth_sensitivity").notNull(), // "low", "medium", "high"
  bleedingGums: text("bleeding_gums").notNull(), // "yes" or "no"
  lastDentalVisit: text("last_dental_visit").notNull(), // "less_than_6_months", "6_to_12_months", "more_than_12_months", "never"
  dailyBrushingFrequency: integer("daily_brushing_frequency").notNull(), // 0, 1, 2, or more
  flossingFrequency: text("flossing_frequency").notNull(), // "daily", "occasionally", "never"
  concerns: text("concerns").array(), // Array of concerns like "cavities", "gum_disease", etc.
  recommendations: json("recommendations"), // JSON data for recommendations
  createdAt: timestamp("created_at").defaultNow(),
});

export const dentalCareRecommendationSchema = createInsertSchema(dentalCareRecommendations).omit({
  id: true,
  userId: true,
  recommendations: true,
  createdAt: true,
});

export type InsertDentalCareRecommendation = z.infer<typeof dentalCareRecommendationSchema>;
export type DentalCareRecommendation = typeof dentalCareRecommendations.$inferSelect;
