import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { appointmentSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Appointment API endpoints
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = appointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
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
