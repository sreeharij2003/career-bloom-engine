import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Download, FileText, User, Phone, Mail, Linkedin, BookOpen, 
  GraduationCap, Briefcase, Award, Languages, Star, Plus, Trash2, 
  Move, Save, FileUp, Eye, HelpCircle
} from "lucide-react";
import { toast } from "sonner";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Define section types to maintain type safety
type ResumeSection = 
  | "contact" 
  | "summary" 
  | "education" 
  | "projects" 
  | "skills" 
  | "certifications" 
  | "interests" 
  | "activities" 
  | "volunteering" 
  | "languages" 
  | "experience" 
  | "awards" 
  | "publications" 
  | "workshops" 
  | "hobbies";

// Resume structure
interface Resume {
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    linkedin?: string;
  };
  summary: string;
  education: Array<{
    id: string;
    degree: string;
    major: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string;
    duration: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    proficiency: "beginner" | "intermediate" | "advanced" | "expert";
  }>;
  certifications: Array<{
    id: string;
    name: string;
    organization: string;
    date: string;
  }>;
  interests: string[];
  activities: Array<{
    id: string;
    name: string;
    role: string;
    duration: string;
    description: string;
  }>;
  volunteering: Array<{
    id: string;
    organization: string;
    role: string;
    duration: string;
    description: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    proficiency: "basic" | "intermediate" | "fluent" | "native";
  }>;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    responsibilities: string;
  }>;
  awards: Array<{
    id: string;
    name: string;
    organization: string;
    date: string;
  }>;
  publications: Array<{
    id: string;
    title: string;
    publication: string;
    date: string;
  }>;
  workshops: Array<{
    id: string;
    title: string;
    organization: string;
    date: string;
  }>;
  hobbies: string[];
}

// Define section metadata for UI rendering
interface SectionMetadata {
  id: ResumeSection;
  title: string;
  icon: React.ElementType;
  required: boolean;
  description: string;
  helpText: string;
}

const sectionsList: SectionMetadata[] = [
  {
    id: "contact",
    title: "Contact Information",
    icon: User,
    required: true,
    description: "Your basic contact details",
    helpText: "Include professional contact information that employers can use to reach you."
  },
  {
    id: "summary",
    title: "Profile Summary",
    icon: BookOpen,
    required: true,
    description: "Brief overview of your career goals and strengths",
    helpText: "Keep it concise (2-3 sentences) and highlight your key strengths and career objectives."
  },
  {
    id: "education",
    title: "Education Details",
    icon: GraduationCap,
    required: true,
    description: "Your academic background",
    helpText: "List your most recent education first. Include relevant coursework if applicable."
  },
  {
    id: "projects",
    title: "Projects",
    icon: FileText,
    required: true,
    description: "Showcase your practical skills",
    helpText: "Highlight projects that demonstrate relevant skills for your target roles."
  },
  {
    id: "skills",
    title: "Technical Skills",
    icon: Star,
    required: true,
    description: "Your professional competencies",
    helpText: "Group skills by category and indicate proficiency level."
  },
  {
    id: "certifications",
    title: "Certifications",
    icon: Award,
    required: false,
    description: "Professional qualifications",
    helpText: "Include relevant certifications that validate your expertise."
  },
  {
    id: "interests",
    title: "Areas of Interest",
    icon: Star,
    required: false,
    description: "Professional interests",
    helpText: "List areas in your field that you're particularly passionate about."
  },
  {
    id: "activities",
    title: "Extracurricular Activities",
    icon: Star,
    required: false,
    description: "Beyond academics and work",
    helpText: "Include activities that highlight leadership, teamwork, or other soft skills."
  },
  {
    id: "volunteering",
    title: "Volunteering",
    icon: Briefcase,
    required: false,
    description: "Community engagement",
    helpText: "Highlight volunteer work that demonstrates relevant skills or values."
  },
  {
    id: "languages",
    title: "Languages",
    icon: Languages,
    required: false,
    description: "Language proficiencies",
    helpText: "Indicate your level of proficiency for each language."
  },
  {
    id: "experience",
    title: "Work Experience",
    icon: Briefcase,
    required: false,
    description: "Professional history",
    helpText: "List your most recent positions first. Focus on achievements rather than daily tasks."
  },
  {
    id: "awards",
    title: "Awards & Honors",
    icon: Award,
    required: false,
    description: "Recognition received",
    helpText: "Include awards that highlight your excellence or dedication."
  },
  {
    id: "publications",
    title: "Publications",
    icon: FileText,
    required: false,
    description: "Published works",
    helpText: "List any papers, articles, or other published materials."
  },
  {
    id: "workshops",
    title: "Workshops & Trainings",
    icon: GraduationCap,
    required: false,
    description: "Additional learning",
    helpText: "Include workshops that demonstrate continued professional development."
  },
  {
    id: "hobbies",
    title: "Hobbies & Interests",
    icon: Star,
    required: false,
    description: "Personal activities",
    helpText: "Include hobbies that might be relevant or interesting to employers."
  }
];

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Create empty resume template
const createEmptyResume = (): Resume => ({
  contact: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    linkedin: "",
  },
  summary: "",
  education: [{ 
    id: generateId(),
    degree: "", 
    major: "", 
    institution: "", 
    year: "", 
    gpa: "" 
  }],
  projects: [{ 
    id: generateId(),
    title: "", 
    description: "", 
    technologies: "", 
    duration: "" 
  }],
  skills: [{ 
    id: generateId(),
    name: "", 
    proficiency: "intermediate" 
  }],
  certifications: [],
  interests: [],
  activities: [],
  volunteering: [],
  languages: [],
  experience: [],
  awards: [],
  publications: [],
  workshops: [],
  hobbies: []
});

const ResumeBuilder = () => {
  const [resume, setResume] = useState<Resume>(createEmptyResume());
  const [activeSections, setActiveSections] = useState<ResumeSection[]>([
    "contact", "summary", "education", "projects", "skills"
  ]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOverSection, setDragOverSection] = useState<string | null>(null);

  // Handle adding a new section
  const addSection = (sectionId: ResumeSection) => {
    if (!activeSections.includes(sectionId)) {
      setActiveSections([...activeSections, sectionId]);
      toast.success(`Added ${sectionId} section to your resume`);
    }
  };

  // Handle removing a section
  const removeSection = (sectionId: ResumeSection) => {
    if (sectionId === "contact" || sectionId === "summary") {
      toast.error("Cannot remove required sections");
      return;
    }
    setActiveSections(activeSections.filter(s => s !== sectionId));
    toast.success(`Removed ${sectionId} section from your resume`);
  };

  // Handle adding a new item to an array section
  const addItem = (sectionKey: keyof Resume) => {
    if (!Array.isArray(resume[sectionKey])) return;
    
    let newItem: any = { id: generateId() };
    
    // Define default structure based on section type
    switch (sectionKey) {
      case "education":
        newItem = { ...newItem, degree: "", major: "", institution: "", year: "", gpa: "" };
        break;
      case "projects":
        newItem = { ...newItem, title: "", description: "", technologies: "", duration: "" };
        break;
      case "skills":
        newItem = { ...newItem, name: "", proficiency: "intermediate" };
        break;
      case "certifications":
        newItem = { ...newItem, name: "", organization: "", date: "" };
        break;
      case "activities":
        newItem = { ...newItem, name: "", role: "", duration: "", description: "" };
        break;
      case "volunteering":
        newItem = { ...newItem, organization: "", role: "", duration: "", description: "" };
        break;
      case "languages":
        newItem = { ...newItem, name: "", proficiency: "intermediate" };
        break;
      case "experience":
        newItem = { ...newItem, title: "", company: "", duration: "", responsibilities: "" };
        break;
      case "awards":
        newItem = { ...newItem, name: "", organization: "", date: "" };
        break;
      case "publications":
        newItem = { ...newItem, title: "", publication: "", date: "" };
        break;
      case "workshops":
        newItem = { ...newItem, title: "", organization: "", date: "" };
        break;
      default:
        return;
    }

    setResume({
      ...resume,
      [sectionKey]: [...(resume[sectionKey] as any[]), newItem]
    });
  };

  // Handle removing an item from an array section
  const removeItem = (sectionKey: keyof Resume, itemId: string) => {
    if (!Array.isArray(resume[sectionKey])) return;
    
    const updatedItems = (resume[sectionKey] as any[]).filter(item => item.id !== itemId);
    
    // Ensure we don't remove the last item from required sections
    const isRequired = ["education", "projects", "skills"].includes(sectionKey);
    if (isRequired && updatedItems.length === 0) {
      toast.error(`You must have at least one entry in the ${sectionKey} section`);
      return;
    }
    
    setResume({
      ...resume,
      [sectionKey]: updatedItems
    });
  };

  // Handle input changes
  const handleChange = (
    sectionKey: keyof Resume, 
    field: string, 
    value: string, 
    itemId?: string
  ) => {
    if (itemId) {
      // Update array item
      if (Array.isArray(resume[sectionKey])) {
        setResume({
          ...resume,
          [sectionKey]: (resume[sectionKey] as any[]).map(item => 
            item.id === itemId ? { ...item, [field]: value } : item
          )
        });
      }
    } else {
      // Update direct field or nested object field
      if (field.includes('.')) {
        const [parentField, childField] = field.split('.');
        setResume({
          ...resume,
          [parentField]: {
            ...(resume[parentField] as object),
            [childField]: value
          }
        });
      } else {
        setResume({
          ...resume,
          [field]: value
        });
      }
    }
  };

  // Handle simple array updates (like interests, hobbies)
  const handleSimpleArrayChange = (sectionKey: "interests" | "hobbies", value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    setResume({
      ...resume,
      [sectionKey]: items
    });
  };

  // Handle drag and drop reordering
  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setIsDragging(sectionId);
  };

  const handleDragOver = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault();
    if (isDragging !== sectionId) {
      setDragOverSection(sectionId);
    }
  };

  const handleDrop = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault();
    if (!isDragging || isDragging === targetSectionId) return;

    const currentSections = [...activeSections];
    const draggedIndex = currentSections.findIndex(s => s === isDragging);
    const targetIndex = currentSections.findIndex(s => s === targetSectionId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove dragged item
      currentSections.splice(draggedIndex, 1);
      // Insert at new position
      currentSections.splice(targetIndex, 0, isDragging as ResumeSection);
      setActiveSections(currentSections);
    }

    setIsDragging(null);
    setDragOverSection(null);
  };

  const handleDragEnd = () => {
    setIsDragging(null);
    setDragOverSection(null);
  };

  // Save resume
  const saveResume = async () => {
    // Validate required fields
    if (!resume.contact.firstName || !resume.contact.lastName || !resume.contact.email) {
      toast.error("Please fill in all required contact fields");
      return;
    }

    if (!resume.summary) {
      toast.error("Please provide a profile summary");
      return;
    }

    setIsSaving(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Resume saved successfully!");
      
      // In a real app, you might save the ID returned from the backend
      // setResumeId(response.id);
    } catch (error) {
      toast.error("Failed to save resume. Please try again.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  // Export resume
  const exportResume = (format: 'pdf' | 'docx') => {
    // In a real application, this would generate and download the file
    toast.success(`Exporting resume as ${format.toUpperCase()}...`);
    // Mock download after a short delay
    setTimeout(() => {
      toast.success(`Resume exported as ${format.toUpperCase()}`);
    }, 1500);
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Render the form fields for a section
  const renderSection = (sectionId: ResumeSection) => {
    const section = sectionsList.find(s => s.id === sectionId);
    if (!section) return null;
    
    return (
      <Card 
        key={sectionId}
        className={cn(
          "mb-6",
          isDragging === sectionId && "opacity-50",
          dragOverSection === sectionId && "border-primary"
        )}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, sectionId)}
        onDragOver={(e) => handleDragOver(e, sectionId)}
        onDrop={(e) => handleDrop(e, sectionId)}
        onDragEnd={handleDragEnd}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-primary/10">
              <section.icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl">{section.title}</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle size={16} className="text-muted-foreground cursor-help ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{section.helpText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <Move className="h-5 w-5 cursor-move text-muted-foreground" />
            {!section.required && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeSection(sectionId)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {renderSectionFields(sectionId)}
        </CardContent>
      </Card>
    );
  };

  // Render the fields for each section type
  const renderSectionFields = (sectionId: ResumeSection) => {
    switch (sectionId) {
      case "contact":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input 
                id="firstName"
                value={resume.contact.firstName}
                onChange={(e) => handleChange("contact", "firstName", e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input 
                id="lastName"
                value={resume.contact.lastName}
                onChange={(e) => handleChange("contact", "lastName", e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <div className="flex items-center mt-1">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email"
                  type="email"
                  value={resume.contact.email}
                  onChange={(e) => handleChange("contact", "email", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="flex items-center mt-1">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="phone"
                  value={resume.contact.phone}
                  onChange={(e) => handleChange("contact", "phone", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="linkedin">LinkedIn Profile (optional)</Label>
              <div className="flex items-center mt-1">
                <Linkedin className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="linkedin"
                  value={resume.contact.linkedin || ""}
                  onChange={(e) => handleChange("contact", "linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
          </div>
        );
      
      case "summary":
        return (
          <div>
            <Label htmlFor="summary">Career Objective / Profile Summary *</Label>
            <Textarea 
              id="summary"
              value={resume.summary}
              onChange={(e) => handleChange("summary", "summary", e.target.value)}
              className="mt-1"
              rows={4}
              placeholder="Brief overview of your experience, skills, and career goals..."
              required
            />
          </div>
        );
      
      case "education":
        return (
          <>
            {resume.education.map((edu, index) => (
              <div key={edu.id} className="mb-6 border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Education #{index + 1}</h4>
                  {resume.education.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem("education", edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor={`degree-${edu.id}`}>Degree *</Label>
                    <Input 
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => handleChange("education", "degree", e.target.value, edu.id)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`major-${edu.id}`}>Major/Field of Study *</Label>
                    <Input 
                      id={`major-${edu.id}`}
                      value={edu.major}
                      onChange={(e) => handleChange("education", "major", e.target.value, edu.id)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`institution-${edu.id}`}>Institution *</Label>
                    <Input 
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => handleChange("education", "institution", e.target.value, edu.id)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div className="grid gap-4 grid-cols-2">
                    <div>
                      <Label htmlFor={`year-${edu.id}`}>Graduation Year *</Label>
                      <Input 
                        id={`year-${edu.id}`}
                        value={edu.year}
                        onChange={(e) => handleChange("education", "year", e.target.value, edu.id)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`gpa-${edu.id}`}>GPA (optional)</Label>
                      <Input 
                        id={`gpa-${edu.id}`}
                        value={edu.gpa || ""}
                        onChange={(e) => handleChange("education", "gpa", e.target.value, edu.id)}
                        className="mt-1"
                        placeholder="e.g. 3.8/4.0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={() => addItem("education")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Another Education
            </Button>
          </>
        );

      case "projects":
        return (
          <>
            {resume.projects.map((project, index) => (
              <div key={project.id} className="mb-6 border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Project #{index + 1}</h4>
                  {resume.projects.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem("projects", project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor={`project-title-${project.id}`}>Project Title *</Label>
                      <Input 
                        id={`project-title-${project.id}`}
                        value={project.title}
                        onChange={(e) => handleChange("projects", "title", e.target.value, project.id)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`project-duration-${project.id}`}>Duration *</Label>
                      <Input 
                        id={`project-duration-${project.id}`}
                        value={project.duration}
                        onChange={(e) => handleChange("projects", "duration", e.target.value, project.id)}
                        className="mt-1"
                        placeholder="e.g. Jan 2023 - Mar 2023"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`project-tech-${project.id}`}>Technologies Used *</Label>
                    <Input 
                      id={`project-tech-${project.id}`}
                      value={project.technologies}
                      onChange={(e) => handleChange("projects", "technologies", e.target.value, project.id)}
                      className="mt-1"
                      placeholder="e.g. React, Node.js, MongoDB"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-desc-${project.id}`}>Description *</Label>
                    <Textarea 
                      id={`project-desc-${project.id}`}
                      value={project.description}
                      onChange={(e) => handleChange("projects", "description", e.target.value, project.id)}
                      className="mt-1"
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={() => addItem("projects")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Another Project
            </Button>
          </>
        );

      case "skills":
        return (
          <>
            {resume.skills.map((skill, index) => (
              <div key={skill.id} className="mb-4 flex items-center gap-4">
                <div className="flex-1">
                  <Input 
                    value={skill.name}
                    onChange={(e) => handleChange("skills", "name", e.target.value, skill.id)}
                    placeholder="Skill name"
                    required
                  />
                </div>
                <div className="w-40">
                  <select
                    value={skill.proficiency}
                    onChange={(e) => handleChange(
                      "skills", 
                      "proficiency", 
                      e.target.value as "beginner" | "intermediate" | "advanced" | "expert", 
                      skill.id
                    )}
                    className="w-full h-10 border rounded-md px-3 py-2"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                {resume.skills.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeItem("skills", skill.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={() => addItem("skills")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Another Skill
            </Button>
          </>
        );

      case "certifications":
        return (
          <>
            {resume.certifications.length === 0 ? (
              <p className="text-muted-foreground text-sm mb-4">No certifications added yet.</p>
            ) : (
              resume.certifications.map((cert, index) => (
                <div key={cert.id} className="mb-6 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Certification #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem("certifications", cert.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor={`cert-name-${cert.id}`}>Certification Name</Label>
                      <Input 
                        id={`cert-name-${cert.id}`}
                        value={cert.name}
                        onChange={(e) => handleChange("certifications", "name", e.target.value, cert.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`cert-org-${cert.id}`}>Issuing Organization</Label>
                      <Input 
                        id={`cert-org-${cert.id}`}
                        value={cert.organization}
                        onChange={(e) => handleChange("certifications", "organization", e.target.value, cert.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`cert-date-${cert.id}`}>Date Obtained</Label>
                      <Input 
                        id={`cert-date-${cert.id}`}
                        value={cert.date}
                        onChange={(e) => handleChange("certifications", "date", e.target.value, cert.id)}
                        className="mt-1"
                        placeholder="e.g. June 2023"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button 
              variant="outline" 
              onClick={() => addItem("certifications")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Certification
            </Button>
          </>
        );

      case "interests":
        return (
          <div>
            <Label htmlFor="interests">Areas of Professional Interest</Label>
            <Textarea 
              id="interests"
              value={resume.interests.join(", ")}
              onChange={(e) => handleSimpleArrayChange("interests", e.target.value)}
              className="mt-1"
              placeholder="Enter interests separated by commas (e.g. Machine Learning, Cloud Computing, UI Design)"
              rows={2}
            />
          </div>
        );

      case "activities":
        return (
          <>
            {resume.activities.length === 0 ? (
              <p className="text-muted-foreground text-sm mb-4">No activities added yet.</p>
            ) : (
              resume.activities.map((activity, index) => (
                <div key={activity.id} className="mb-6 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Activity #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem("activities", activity.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor={`activity-name-${activity.id}`}>Activity Name</Label>
                      <Input 
                        id={`activity-name-${activity.id}`}
                        value={activity.name}
                        onChange={(e) => handleChange("activities", "name", e.target.value, activity.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`activity-role-${activity.id}`}>Your Role</Label>
                      <Input 
                        id={`activity-role-${activity.id}`}
                        value={activity.role}
                        onChange={(e) => handleChange("activities", "role", e.target.value, activity.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`activity-duration-${activity.id}`}>Duration</Label>
                      <Input 
                        id={`activity-duration-${activity.id}`}
                        value={activity.duration}
                        onChange={(e) => handleChange("activities", "duration", e.target.value, activity.id)}
                        className="mt-1"
                        placeholder="e.g. 2021-2023"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`activity-desc-${activity.id}`}>Description</Label>
                      <Textarea 
                        id={`activity-desc-${activity.id}`}
                        value={activity.description}
                        onChange={(e) => handleChange("activities", "description", e.target.value, activity.id)}
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button 
              variant="outline" 
              onClick={() => addItem("activities")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Activity
            </Button>
          </>
        );

      case "volunteering":
        return (
          <>
            {resume.volunteering.length === 0 ? (
              <p className="text-muted-foreground text-sm mb-4">No volunteering experiences added yet.</p>
            ) : (
              resume.volunteering.map((vol, index) => (
                <div key={vol.id} className="mb-6 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Volunteering #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem("volunteering", vol.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor={`vol-org-${vol.id}`}>Organization</Label>
                      <Input 
                        id={`vol-org-${vol.id}`}
                        value={vol.organization}
                        onChange={(e) => handleChange("volunteering", "organization", e.target.value, vol.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`vol-role-${vol.id}`}>Your Role</Label>
                      <Input 
                        id={`vol-role-${vol.id}`}
                        value={vol.role}
                        onChange={(e) => handleChange("volunteering", "role", e.target.value, vol.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`vol-duration-${vol.id}`}>Duration</Label>
                      <Input 
                        id={`vol-duration-${vol.id}`}
                        value={vol.duration}
                        onChange={(e) => handleChange("volunteering", "duration", e.target.value, vol.id)}
                        className="mt-1"
                        placeholder="e.g. Jan 2022 - Present"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`vol-desc-${vol.id}`}>Description</Label>
                      <Textarea 
                        id={`vol-desc-${vol.id}`}
                        value={vol.description}
                        onChange={(e) => handleChange("volunteering", "description", e.target.value, vol.id)}
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button 
              variant="outline" 
              onClick={() => addItem("volunteering")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Volunteering Experience
            </Button>
          </>
        );

      case "languages":
        return (
          <>
            {resume.languages.length === 0 ? (
              <p className="text-muted-foreground text-sm mb-4">No languages added yet.</p>
            ) : (
              resume.languages.map((lang, index) => (
                <div key={lang.id} className="mb-4 flex items-center gap-4">
                  <div className="flex-1">
                    <Input 
                      value={lang.name}
                      onChange={(e) => handleChange("languages", "name", e.target.value, lang.id)}
                      placeholder="Language name"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={lang.proficiency}
                      onChange={(e) => handleChange(
                        "languages", 
                        "proficiency", 
                        e.target.value as "basic" | "intermediate" | "fluent" | "native", 
                        lang.id
                      )}
                      className="w-full h-10 border rounded-md px-3 py-2"
                    >
                      <option value="basic">Basic</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="fluent">Fluent</option>
                      <option value="native">Native</option>
                    </select>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeItem("languages", lang.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
            <Button 
              variant="outline" 
              onClick={() => addItem("languages")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Language
            </Button>
          </>
        );

      case "experience":
        return (
          <>
            {resume.experience.length === 0 ? (
              <p className="text-muted-foreground text-sm mb-4">No work experience added yet.</p>
            ) : (
              resume.experience.map((exp, index) => (
                <div key={exp.id} className="mb-6 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Experience #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem("experience", exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor={`exp-title-${exp.id}`}>Job Title</Label>
                      <Input 
                        id={`exp-title-${exp.id}`}
                        value={exp.title}
                        onChange={(e) => handleChange("experience", "title", e.target.value, exp.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`exp-company-${exp.id}`}>Company Name</Label>
                      <Input 
                        id={`exp-company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) => handleChange("experience", "company", e.target.value, exp.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`exp-duration-${exp.id}`}>Duration</Label>
                      <Input 
                        id={`exp-duration-${exp.id}`}
                        value={exp.duration}
                        onChange={(e) => handleChange("experience", "duration", e.target.value, exp.id)}
                        className="mt-1"
                        placeholder="e.g. Jan 2022 - Present"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`exp-resp-${exp.id}`}>Responsibilities & Achievements</Label>
                      <Textarea 
                        id={`exp-resp-${exp.id}`}
                        value={exp.responsibilities}
                        onChange={(e) => handleChange("experience", "responsibilities", e.target.value, exp.id)}
                        className="mt-1"
                        rows={3}
                        placeholder="Describe your key responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button 
              variant="outline" 
              onClick={() => addItem("experience")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Work Experience
            </Button>
          </>
        );

      case "awards":
        return (
          <>
            {resume.awards.length === 0 ? (
              <p className="text-muted-foreground text-sm mb-4">No awards added yet.</p>
            ) : (
              resume.awards.map((award, index) => (
                <div key={award.id} className="mb-6 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Award #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem("awards", award.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor={`award-name-${award.id}`}>Award Name</Label>
                      <Input 
                        id={`award-name-${award.id}`}
                        value={award.name}
                        onChange={(e) => handleChange("awards", "name", e.target.value, award.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`award-org-${award.id}`}>Issuing Organization</Label>
                      <Input 
                        id={`award-org-${award.id}`}
                        value={award.organization}
                        onChange={(e) => handleChange("awards", "organization", e.target.value, award.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`award-date-${award.id}`}>Date Received</Label>
                      <Input 
                        id={`award-date-${award.id}`}
                        value={award.date}
                        onChange={(e) => handleChange("awards", "date", e.target.value, award.id)}
                        className="mt-1"
                        placeholder="e.g. May 2023"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button 
              variant="outline" 
              onClick={() => addItem("awards")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Award
            </Button>
          </>
        );

      case "publications":
        return (
          <>
            {resume.publications.length === 0 ? (
              <p className="text-muted-foreground text-sm mb-4">No publications added yet.</p>
            ) : (
              resume.publications.map((pub, index) => (
                <div key={pub.id} className="mb-6 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Publication #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem("publications", pub.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor={`pub-title-${pub.id}`}>Publication Title</Label>
                      <Input 
                        id={`pub-title-${pub.id}`}
                        value={pub.title}
                        onChange={(e) => handleChange("publications", "title", e.target.value, pub.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`pub-name-${pub.id}`}>Publication Name/Journal</Label>
                      <Input 
                        id={`pub-name-${pub.id}`}
                        value={pub.publication}
                        onChange={(e) => handleChange("publications", "publication", e.target.value, pub.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`pub-date-${pub.id}`}>Date Published</Label>
                      <Input 
                        id={`pub-date-${pub.id}`}
                        value={pub.date}
                        onChange={(e) => handleChange("publications", "date", e.target.value, pub.id)}
                        className="mt-1"
                        placeholder="e.g. October 2023"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button 
              variant="outline" 
              onClick={() => addItem("publications")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Publication
            </Button>
          </>
        );

      case "workshops":
        return (
          <>
            {resume.workshops.length === 0 ? (
              <p className="text-muted-foreground text-sm mb-4">No workshops or trainings added yet.</p>
            ) : (
              resume.workshops.map((workshop, index) => (
                <div key={workshop.id} className="mb-6 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Workshop #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem("workshops", workshop.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor={`workshop-title-${workshop.id}`}>Workshop/Training Title</Label>
                      <Input 
                        id={`workshop-title-${workshop.id}`}
                        value={workshop.title}
                        onChange={(e) => handleChange("workshops", "title", e.target.value, workshop.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`workshop-org-${workshop.id}`}>Organization</Label>
                      <Input 
                        id={`workshop-org-${workshop.id}`}
                        value={workshop.organization}
                        onChange={(e) => handleChange("workshops", "organization", e.target.value, workshop.id)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`workshop-date-${workshop.id}`}>Date</Label>
                      <Input 
                        id={`workshop-date-${workshop.id}`}
                        value={workshop.date}
                        onChange={(e) => handleChange("workshops", "date", e.target.value, workshop.id)}
                        className="mt-1"
                        placeholder="e.g. March 2023"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button 
              variant="outline" 
              onClick={() => addItem("workshops")} 
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Workshop/Training
            </Button>
          </>
        );

      case "hobbies":
        return (
          <div>
            <Label htmlFor="hobbies">Hobbies & Personal Interests</Label>
            <Textarea 
              id="hobbies"
              value={resume.hobbies.join(", ")}
              onChange={(e) => handleSimpleArrayChange("hobbies", e.target.value)}
              className="mt-1"
              placeholder="Enter hobbies separated by commas (e.g. Photography, Hiking, Chess)"
              rows={2}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Render the preview mode
  const renderPreview = () => {
    // In a real application, this would be a styled preview of the resume
    return (
      <div className="border rounded-lg p-8 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            {resume.contact.firstName} {resume.contact.lastName}
          </h1>
          <div className="flex justify-center items-center gap-4 mt-2 text-muted-foreground">
            {resume.contact.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span>{resume.contact.email}</span>
              </div>
            )}
            {resume.contact.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} />
                <span>{resume.contact.phone}</span>
              </div>
            )}
            {resume.contact.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin size={14} />
                <span>{resume.contact.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {resume.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Profile Summary</h2>
            <p>{resume.summary}</p>
          </div>
        )}

        {resume.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Education</h2>
            {resume.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{edu.degree} in {edu.major}</h3>
                    <p>{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <p>{edu.year}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {resume.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {skill.name} ({skill.proficiency})
                </span>
              ))}
            </div>
          </div>
        )}

        {resume.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Projects</h2>
            {resume.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{project.title}</h3>
                  <span className="text-sm text-muted-foreground">{project.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Technologies: {project.technologies}</p>
                <p className="mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {resume.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Work Experience</h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.title}</h3>
                  <span className="text-sm text-muted-foreground">{exp.duration}</span>
                </div>
                <p className="text-muted-foreground">{exp.company}</p>
                <p className="mt-1">{exp.responsibilities}</p>
              </div>
            ))}
          </div>
        )}

        {/* Render other sections as needed */}
        
        <div className="text-center text-sm text-muted-foreground mt-8">
          Preview mode - formatting and styling will be improved in PDF/DOCX export
        </div>
      </div>
    );
  };

  // Render section selector
  const renderSectionSelector = () => {
    const availableSections = sectionsList.filter(
      section => !activeSections.includes(section.id)
    );
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Add Sections</h3>
        {availableSections.length === 0 ? (
          <p className="text-sm text-muted-foreground">All available sections have been added.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {availableSections.map(section => (
              <Button 
                key={section.id}
                variant="outline" 
                className="justify-start"
                onClick={() => addSection(section.id)}
              >
                <section.icon className="mr-2 h-4 w-4" />
                {section.title}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Resume Builder</h2>
          <p className="text-muted-foreground">Create and customize your professional resume</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? (
              <>
                <FileText className="h-4 w-4" />
                Edit
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Preview
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => exportResume('pdf')}
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => exportResume('docx')}
          >
            <Download className="h-4 w-4" />
            Export DOCX
          </Button>
          <Button
            className="gap-2"
            onClick={saveResume}
            disabled={isSaving}
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Resume'}
          </Button>
        </div>
      </div>

      <div>
        {isPreviewMode ? renderPreview() : (
          <>
            {renderSectionSelector()}
            
            <div className="space-y-4">
              {activeSections.map(sectionId => renderSection(sectionId))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
