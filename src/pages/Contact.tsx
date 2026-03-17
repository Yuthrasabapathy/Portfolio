import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import SectionReveal from "@/components/SectionReveal";
import MagneticButton from "@/components/MagneticButton";

const InputField = ({
  name, label, type = "text", value, error, onChange,
}: {
  name: string; label: string; type?: string;
  value: string; error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
    <motion.input
      whileFocus={{ scale: 1.01 }}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
        error ? "border-destructive" : "border-border"
      }`}
      placeholder={`Your ${label.toLowerCase()}`}
    />
    {error && (
      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-xs mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> {error}
      </motion.p>
    )}
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    toast.success("Message sent successfully! I'll get back to you soon.");
    // ✅ Submits form data to FormSubmit → sends email to you
    (e.target as HTMLFormElement).submit();
  };

  const gmailUrl = "https://mail.google.com/mail/u/0/#inbox?compose=new";

  return (
    <PageTransition>
      <section className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-mono mb-3 text-center">Contact</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-foreground">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto">
              Have a project in mind or just want to say hello? Drop me a message.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-5 gap-8">
            <SectionReveal className="md:col-span-3">
              <form
                action="https://formsubmit.co/Yuthrasabapathy@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 space-y-5"
              >
                {/* FormSubmit hidden settings */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Portfolio Message!" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField name="name" label="Name" value={form.name} error={errors.name} onChange={handleChange} />
                  <InputField name="email" label="Email" type="email" value={form.email} error={errors.email} onChange={handleChange} />
                  <InputField name="subject" label="Subject" value={form.subject} error={errors.subject} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                      errors.message ? "border-destructive" : "border-border"
                    }`}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </motion.p>
                  )}
                </div>
                <MagneticButton>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 glow-primary hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </MagneticButton>
              </form>
            </SectionReveal>

            <SectionReveal delay={0.2} className="md:col-span-2">
              <div className="glass rounded-2xl p-8 h-full flex flex-col justify-center space-y-12">
                <div>
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <a href={gmailUrl} className="text-primary hover:underline text-sm " target="_blank"
                    rel="noopener noreferrer">
                    yuthrasabapathy@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className=" font-bold text-foreground mb-2 ">Location</h3>
                  <p className="text-muted-foreground text-sm ">Chennai</p>
                </div>
                <div>
                  <h3 className="  font-bold text-foreground mb-2 ">Response Time</h3>
                  <p className="text-muted-foreground text-sm ">Usually within 24 hours</p>
                </div>
                <MagneticButton>
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glow-border text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Email Directly
                  </a>
                </MagneticButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;