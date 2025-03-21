import { users, type User, type InsertUser, type Appointment, type InsertAppointment, appointments } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  listAppointments(): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private userId: number;
  private appointmentId: number;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.userId = 1;
    this.appointmentId = 1;
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
    const appointment: Appointment = { 
      ...insertAppointment, 
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
}

export const storage = new MemStorage();
