import { Application, STATUS_OPTIONS } from "@/lib/applications";

interface StatsCardsProps {
  applications: Application[];
}

export default function StatsCards({ applications }: StatsCardsProps) {
  const total = applications.length;
  const interviews = applications.filter((a) => a.status === "interview").length;
  const offers = applications.filter((a) => a.status === "offer").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;

  const stats = [
    { label: "Total Postulaciones", value: total, color: "from-blue-500 to-blue-600", icon: "📋" },
    { label: "Entrevistas", value: interviews, color: "from-yellow-500 to-yellow-600", icon: "🎯" },
    { label: "Ofertas", value: offers, color: "from-green-500 to-green-600", icon: "🎉" },
    { label: "Rechazados", value: rejected, color: "from-red-500 to-red-600", icon: "❌" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg`}
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className="text-3xl font-bold">{stat.value}</div>
          <div className="text-sm opacity-90 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
} 
