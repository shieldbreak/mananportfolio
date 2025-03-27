import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-3xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-6 md:p-8">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <motion.a
                href="mailto:manan.sharma.ece22@gmail.com"
                className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition-all hover:bg-primary dark:hover:bg-primary hover:shadow-lg"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 group-hover:bg-white dark:bg-primary/20 rounded-full mb-4">
                  <i className="fas fa-envelope text-primary group-hover:text-primary dark:text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">Email</h3>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-white/90 transition-colors">john.doe@example.com</p>
              </motion.a>

              <motion.a
                href="https://github.com/MananSharma03"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition-all hover:bg-primary dark:hover:bg-primary hover:shadow-lg"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 group-hover:bg-white dark:bg-primary/20 rounded-full mb-4">
                  <i className="fab fa-github text-primary group-hover:text-primary dark:text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">GitHub</h3>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-white/90 transition-colors">github.com/johndoe</p>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/manan-sharma-446886207/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition-all hover:bg-primary dark:hover:bg-primary hover:shadow-lg"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 group-hover:bg-white dark:bg-primary/20 rounded-full mb-4">
                  <i className="fab fa-linkedin-in text-primary group-hover:text-primary dark:text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">LinkedIn</h3>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-white/90 transition-colors">linkedin.com/in/johndoe</p>
              </motion.a>
            </div>

            {/* Divider */}
            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-gray-900 px-4 text-sm text-gray-500 dark:text-gray-400">Or send a message</span>
              </div>
            </div>

            {/* Contact Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-blue-600 dark:bg-gray-800" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-blue-600 dark:bg-gray-800" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can I help you?" {...field} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-blue-600 dark:bg-gray-800" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message here..." {...field} rows={5} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-blue-600 dark:bg-gray-800" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <><i className="fas fa-paper-plane mr-2"></i> Send Message</>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
