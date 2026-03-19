import api from "./api";

export interface Application {
  id: number;
  company: string;
  position: string;
  status: string;
  job_description: string | null;
  notes: string | null;
  applied_date: string;
  updated_at: string | null;
  user_id: number;
}

export interface ApplicationCreate {
  company: string;
  position: string;
  status: string;
  job_description?: string;
  notes?: string;
}

export interface AIAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  keywords_found: string[];
  keywords_missing: string[];
}

export const STATUS_OPTIONS = [
  { value: "applied", label: "Aplicado", color: "bg-blue-100 text-blue-800" },
  { value: "interview", label: "Entrevista", color: "bg-yellow-100 text-yellow-800" },
  { value: "technical", label: "Prueba Técnica", color: "bg-purple-100 text-purple-800" },
  { value: "offer", label: "Oferta", color: "bg-green-100 text-green-800" },
  { value: "rejected", label: "Rechazado", color: "bg-red-100 text-red-800" },
];

export const getApplications = async (): Promise<Application[]> => {
  const response = await api.get("/applications/");
  return response.data;
};

export const createApplication = async (data: ApplicationCreate): Promise<Application> => {
  const response = await api.post("/applications/", data);
  return response.data;
};

export const updateApplication = async (id: number, data: Partial<ApplicationCreate>): Promise<Application> => {
  const response = await api.put(`/applications/${id}`, data);
  return response.data;
};

export const deleteApplication = async (id: number): Promise<void> => {
  await api.delete(`/applications/${id}`);
};

export const analyzeApplication = async (
  application_id: number,
  cv_text: string
): Promise<AIAnalysis> => {
  const response = await api.post("/ai/analyze", { application_id, cv_text });
  return response.data;
};