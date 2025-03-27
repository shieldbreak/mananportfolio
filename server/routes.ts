import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, messageSchema } from "@shared/schema";
import fs from "fs";
import path from "path";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route prefix
  const apiRouter = app.route("/api");

  // Chat API endpoint - uses Groq API
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const result = messageSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      const { message } = result.data;

      // System prompt for the LLM to understand the context
      const systemPrompt = `
        You are a helpful assistant for John Doe's portfolio website. 
        Your role is to answer questions about John's background, skills, 
        and experience based on the following information:

        ABOUT JOHN:
        John is a Data Engineer & DevOps Specialist with over 5 years of experience.
        He transforms complex data challenges into efficient, scalable solutions.

        WORK EXPERIENCE:
        - Senior Data Engineer at TechCorp Inc. (2020-Present)
          Led the design and implementation of scalable data pipelines processing 5TB+ daily.
          Reduced processing time by 40% through optimization and parallel processing techniques.
        
        - DevOps Engineer at InnoSystems LLC (2018-2020)
          Implemented CI/CD pipelines reducing deployment time by 60%.
          Managed Kubernetes clusters and containerized applications for improved scalability and resource utilization.

        EDUCATION:
        - M.S. in Computer Science, Stanford University (2016-2018)
          Specialized in Data Systems and Cloud Computing.
          Thesis on distributed data processing systems.
        
        - B.S. in Computer Engineering, MIT (2012-2016)
          Graduated with honors. Focus on software engineering and database systems.

        SKILLS:
        - Data Engineering: SQL & NoSQL Databases (90%), ETL/ELT Pipelines (85%), 
          Data Warehousing (80%), Big Data Technologies (75%), Data Modeling (85%)
        
        - DevOps: CI/CD Pipelines (90%), Container Orchestration (85%), 
          Infrastructure as Code (80%), Cloud Platforms (85%), 
          Monitoring & Observability (75%)

        CERTIFICATIONS:
        - AWS Certified Data Analytics Specialty (2022)
        - Certified Kubernetes Administrator (2021)
        - Google Professional Data Engineer (2020)
        - Azure DevOps Engineer Expert (2019)

        TECHNOLOGIES:
        Python, SQL, AWS, Docker, Kubernetes, Git

        Keep your answers focused on the details provided. Be helpful, concise, 
        and professional. If you don't know something, say so rather than making up information.
      `;

      try {
        // Get GROQ_API_KEY from environment variables
        const apiKey = process.env.GROQ_API_KEY || "";
        if (!apiKey) {
          console.error("GROQ_API_KEY is not set");
          return res.status(500).json({ error: "API key configuration error" });
        }

        // Call Groq API
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama3-8b-8192",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 1024
          },
          {
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            }
          }
        );

        // Extract the assistant response
        const assistantReply = response.data.choices[0].message.content;
        return res.json({ reply: assistantReply });
      } catch (error: any) {
        console.error("Error calling Groq API:", error.response?.data || error.message);
        return res.status(500).json({ error: "Failed to get response from AI service" });
      }
    } catch (error) {
      console.error("Chat API error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const result = contactSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid contact form data" });
      }

      const contact = result.data;

      // In a real implementation, you might send an email
      // or store the contact information in a database
      console.log("Contact form submission:", contact);

      return res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Contact API error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Resume download endpoint
  app.get("/api/resume/download", (req: Request, res: Response) => {
    try {
      // In a real implementation, this would be a path to the actual resume file
      const filePath = path.join(__dirname, "resume.pdf");

      // For this demonstration, we're creating a simple text file
      // that says "John Doe's Resume" as a placeholder
      const tempFilePath = path.join(__dirname, "temp_resume.txt");
      fs.writeFileSync(tempFilePath, "John Doe's Resume - Data Engineer & DevOps Specialist");

      res.download(tempFilePath, "john_doe_resume.txt", (err) => {
        // Delete the temporary file after download
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }

        if (err) {
          console.error("Resume download error:", err);
          return res.status(500).json({ error: "Failed to download resume" });
        }
      });
    } catch (error) {
      console.error("Resume API error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
