import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { appointmentSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Function to send WhatsApp notification
async function sendWhatsAppNotification(appointment: any) {
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

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(appointmentDetails);
    
    // WhatsApp API URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918379009320&text=${encodedMessage}`;
    
    console.log(`WhatsApp notification would be sent to: +918379009320`);
    console.log(`Message: ${appointmentDetails}`);
    console.log(`URL for testing: ${whatsappUrl}`);
    
    // In a production environment, you would use a proper WhatsApp Business API
    // This is a simplified version that logs the details
    return true;
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Appointment API endpoints
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = appointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      
      // Send WhatsApp notification
      await sendWhatsAppNotification(appointment);
      
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

  const httpServer = createServer(app);
  return httpServer;
}
