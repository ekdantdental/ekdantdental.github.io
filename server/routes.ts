import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { appointmentSchema, dentalCareRecommendationSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Function to log appointment details for potential WhatsApp notification
async function logAppointmentDetails(appointment: any) {
  try {
    // Format date and time for better readability
    const formattedDate = new Date(appointment.preferredDate).toLocaleDateString('en-IN');
    const appointmentDetails = `
*New Appointment Request*
Name: ${appointment.firstName} ${appointment.lastName}
Phone: ${appointment.phone}
Email: ${appointment.email}
Service: ${appointment.service}
Date: ${formattedDate}
Time: ${appointment.preferredTime}
${appointment.message ? `Message: ${appointment.message}` : ''}
    `.trim();
    
    console.log(`New appointment received:`);
    console.log(`-----------------------------------`);
    console.log(appointmentDetails);
    console.log(`-----------------------------------`);
    console.log(`Patient can use the "Notify via WhatsApp" button to send details to +918379009320`);
    
    return true;
  } catch (error) {
    console.error("Failed to log appointment details:", error);
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Appointment API endpoints
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = appointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      
      // Log appointment details
      await logAppointmentDetails(appointment);
      
      return res.status(201).json({
        message: "Appointment request received successfully",
        data: appointment,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationError.details,
        });
      }
      
      return res.status(500).json({
        message: "Failed to create appointment",
        error: (error as Error).message,
      });
    }
  });

  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.listAppointments();
      return res.json(appointments);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve appointments",
        error: (error as Error).message,
      });
    }
  });

  // Dental Care Recommendation API endpoints
  app.post("/api/dental-recommendations", async (req, res) => {
    try {
      const recommendationData = dentalCareRecommendationSchema.parse(req.body);
      const recommendation = await storage.createDentalCareRecommendation(recommendationData);
      
      return res.status(201).json({
        message: "Dental care recommendations generated successfully",
        data: recommendation,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationError.details,
        });
      }
      
      return res.status(500).json({
        message: "Failed to generate dental care recommendations",
        error: (error as Error).message,
      });
    }
  });

  app.get("/api/dental-recommendations/:id", async (req, res) => {
    try {
      const recommendationId = parseInt(req.params.id);
      const recommendation = await storage.getDentalCareRecommendationById(recommendationId);
      
      if (!recommendation) {
        return res.status(404).json({
          message: "Dental care recommendation not found",
        });
      }
      
      return res.json(recommendation);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve dental care recommendation",
        error: (error as Error).message,
      });
    }
  });

  app.get("/api/dental-recommendations", async (req, res) => {
    try {
      const { email } = req.query;
      
      if (email && typeof email === 'string') {
        // Get recommendations by email
        const recommendations = await storage.getDentalCareRecommendationsByEmail(email);
        return res.json(recommendations);
      } else {
        // Get all recommendations
        const recommendations = await storage.listDentalCareRecommendations();
        return res.json(recommendations);
      }
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve dental care recommendations",
        error: (error as Error).message,
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
