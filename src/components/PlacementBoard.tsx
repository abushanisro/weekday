import { useState } from "react";
import { Building2, Share2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Status = "shortlisted" | "round1" | "round2" | "round3" | "selected";

interface Candidate {
  name: string;
  status: Status;
  package?: string;
  branch: string;
}

interface Role {
  title: string;
  candidates: Candidate[];
}

interface Company {
  name: string;
  icon: string;
  roles: Role[];
}

const companiesData: Company[] = [
  {
    name: "Microsoft",
    icon: "https://www.microsoft.com/favicon.ico",
    roles: [
      {
        title: "Software Development Engineer",
        candidates: [
          { name: "Priya Patel", status: "selected", branch: "Computer Science" },
          { name: "Ravi Shankar", status: "round3", branch: "Computer Science" },
          { name: "Neha Agarwal", status: "round2", branch: "Computer Science" },
          { name: "Suresh Babu", status: "round1", branch: "Computer Science" },
          { name: "Anjali Verma", status: "selected", branch: "Computer Science" },
          { name: "Karan Singh", status: "round3", branch: "Information Technology" },
          { name: "Sanya Reddy", status: "round2", branch: "Computer Science" },
          { name: "Rohit Kumar", status: "shortlisted", branch: "Computer Science" },
        ],
      },
      {
        title: "Product Manager",
        candidates: [
          { name: "Aditya Verma", status: "round2", branch: "Information Technology" },
          { name: "Sneha Singh", status: "shortlisted", branch: "MBA" },
        ],
      },
    ],
  },
  {
    name: "GitLab",
    icon: "https://gitlab.com/favicon.ico",
    roles: [
      {
        title: "Backend Engineer",
        candidates: [
          { name: "Rahul Sharma", status: "selected", branch: "Computer Science" },
          { name: "Anjali Kumar", status: "round3", branch: "Computer Science" },
          { name: "Deepika Rao", status: "round2", branch: "Computer Science" },
          { name: "Arjun Nair", status: "round1", branch: "Information Technology" },
          { name: "Meera Iyer", status: "selected", branch: "Computer Science" },
          { name: "Varun Kapoor", status: "shortlisted", branch: "Computer Science" },
        ],
      },
      {
        title: "Frontend Engineer",
        candidates: [
          { name: "Vikram Joshi", status: "round1", branch: "Information Technology" },
          { name: "Pooja Desai", status: "shortlisted", branch: "Computer Science" },
          { name: "Ishaan Malhotra", status: "round3", branch: "Computer Science" },
          { name: "Tanya Gupta", status: "round2", branch: "Information Technology" },
        ],
      },
    ],
  },
  {
    name: "HubSpot",
    icon: "https://www.hubspot.com/favicon.ico",
    roles: [
      {
        title: "Tech Lead",
        candidates: [
          { name: "Amit Kumar", status: "selected", branch: "Computer Science" },
          { name: "Deepak Yadav", status: "round2", branch: "Information Technology" },
        ],
      },
    ],
  },
  {
    name: "Cognizant",
    icon: "https://www.cognizant.com/favicon.ico",
    roles: [
      {
        title: "Software Engineer",
        candidates: [
          { name: "Kavya Nair", status: "selected", branch: "Computer Science" },
          { name: "Aryan Gupta", status: "round3", branch: "Computer Science" },
          { name: "Simran Kaur", status: "round1", branch: "Information Technology" },
          { name: "Lakshmi Menon", status: "shortlisted", branch: "Electronics" },
          { name: "Dev Patel", status: "selected", branch: "Computer Science" },
          { name: "Nisha Reddy", status: "round2", branch: "Information Technology" },
          { name: "Kunal Jain", status: "round3", branch: "Computer Science" },
          { name: "Aditi Sharma", status: "shortlisted", branch: "Computer Science" },
          { name: "Yash Kumar", status: "round1", branch: "Information Technology" },
          { name: "Shruti Desai", status: "selected", branch: "Computer Science" },
        ],
      },
    ],
  },
  {
    name: "Innovaccer",
    icon: "https://innovaccer.com/favicon.ico",
    roles: [
      {
        title: "Backend Engineer",
        candidates: [
          { name: "Rohan Mehta", status: "round3", branch: "Computer Science" },
          { name: "Tanvi Sharma", status: "round2", branch: "Information Technology" },
          { name: "Aarav Singh", status: "selected", branch: "Computer Science" },
          { name: "Diya Agarwal", status: "round1", branch: "Computer Science" },
          { name: "Ritesh Kumar", status: "shortlisted", branch: "Information Technology" },
          { name: "Priyanka Joshi", status: "round3", branch: "Computer Science" },
        ],
      },
      {
        title: "UI/UX Designer",
        candidates: [
          { name: "Isha Malhotra", status: "round1", branch: "Design" },
          { name: "Kartik Mehta", status: "shortlisted", branch: "Design" },
          { name: "Zara Khan", status: "selected", branch: "Design" },
          { name: "Neil Bhatia", status: "round2", branch: "Design" },
        ],
      },
    ],
  },
  {
    name: "American Express",
    icon: "https://www.americanexpress.com/favicon.ico",
    roles: [
      {
        title: "Software Engineer",
        candidates: [
          { name: "Vivek Singh", status: "selected", branch: "Computer Science" },
          { name: "Divya Sharma", status: "round2", branch: "Information Technology" },
        ],
      },
    ],
  },
  {
    name: "Priceline",
    icon: "https://www.priceline.com/favicon.ico",
    roles: [
      {
        title: "Frontend Engineer",
        candidates: [
          { name: "Arjun Verma", status: "round3", branch: "Computer Science" },
          { name: "Pooja Iyer", status: "round1", branch: "Computer Science" },
        ],
      },
    ],
  },
  {
    name: "MetLife",
    icon: "https://www.metlife.com/favicon.ico",
    roles: [
      {
        title: "Software Development Engineer",
        candidates: [
          { name: "Nikhil Menon", status: "selected", branch: "Computer Science" },
          { name: "Shreya Pillai", status: "round2", branch: "Information Technology" },
        ],
      },
    ],
  },
  {
    name: "Societe Generale",
    icon: "https://www.societegenerale.com/favicon.ico",
    roles: [
      {
        title: "Quantitative Analyst",
        candidates: [
          { name: "Karthik Iyer", status: "round3", branch: "Finance" },
          { name: "Meera Joshi", status: "round1", branch: "Mathematics" },
        ],
      },
    ],
  },
  {
    name: "TELUS International",
    icon: "https://www.telusinternational.com/favicon.ico",
    roles: [
      {
        title: "Support Technician",
        candidates: [
          { name: "Akash Verma", status: "selected", branch: "Information Technology" },
          { name: "Sanjay Rao", status: "shortlisted", branch: "Computer Science" },
        ],
      },
    ],
  },
  {
    name: "SBI Life Insurance",
    icon: "https://www.sbilife.co.in/favicon.ico",
    roles: [
      {
        title: "Software Engineer",
        candidates: [
          { name: "Ananya Gupta", status: "round2", branch: "Computer Science" },
          { name: "Rahul Bhat", status: "shortlisted", branch: "Information Technology" },
        ],
      },
    ],
  },
  {
    name: "Mahindra & Mahindra",
    icon: "https://www.mahindra.com/favicon.ico",
    roles: [
      {
        title: "Software Developer",
        candidates: [
          { name: "Sneha Reddy", status: "selected", branch: "Computer Science" },
          { name: "Aditya Kapoor", status: "round3", branch: "Automobile Engineering" },
        ],
      },
    ],
  },
  {
    name: "Canary Technologies",
    icon: "https://canarytechnologies.com/favicon.ico",
    roles: [
      {
        title: "Backend Engineer",
        candidates: [
          { name: "Vikram Singh", status: "round2", branch: "Computer Science" },
          { name: "Priya Nair", status: "round1", branch: "Information Technology" },
        ],
      },
    ],
  },
  {
    name: "Zamp",
    icon: "https://zamp.com/favicon.ico",
    roles: [
      {
        title: "Full Stack Developer",
        candidates: [
          { name: "Aryan Patel", status: "round3", branch: "Computer Science" },
          { name: "Riya Sharma", status: "shortlisted", branch: "Information Technology" },
        ],
      },
    ],
  },
  {
    name: "Coulomb AI",
    icon: "https://coulomb.ai/favicon.ico",
    roles: [
      {
        title: "ML Engineer",
        candidates: [
          { name: "Dev Malhotra", status: "selected", branch: "AI & ML" },
          { name: "Ishita Roy", status: "round2", branch: "Data Science" },
        ],
      },
    ],
  },
];

const getStatusColor = (status: Status) => {
  switch (status) {
    case "shortlisted":
      return "bg-yellow-100 text-yellow-800";
    case "round1":
      return "bg-blue-100 text-blue-800";
    case "round2":
      return "bg-purple-100 text-purple-800";
    case "round3":
      return "bg-orange-100 text-orange-800";
    case "selected":
      return "bg-green-100 text-green-800";
  }
};

const getStatusLabel = (status: Status) => {
  switch (status) {
    case "shortlisted":
      return "Shortlisted";
    case "round1":
      return "Round 1";
    case "round2":
      return "Round 2";
    case "round3":
      return "Round 3";
    case "selected":
      return "Selected";
  }
};

const PlacementBoard = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCompanyClick = (companyName: string) => {
    setSelectedCompany(companyName);
    setSelectedRole(null);
  };

  const handleRoleClick = (roleTitle: string) => {
    setSelectedRole(roleTitle);
  };

  const handleBackToCompanies = () => {
    setSelectedCompany(null);
    setSelectedRole(null);
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  const handleShare = async (candidate: Candidate, e: React.MouseEvent) => {
    e.stopPropagation();

    const shareText = `🎉 ${candidate.name} - ${getStatusLabel(candidate.status)}!\n\n` +
      `🏢 Company: ${selectedCompany}\n` +
      `💼 Role: ${selectedRole}\n` +
      `🎓 Branch: ${candidate.branch}\n` +
      (candidate.package ? `💰 Package: ${candidate.package}\n` : '') +
      `\n#PlacementTracker #Placements2024`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Placement Update',
          text: shareText,
        });
        toast({
          title: "Shared successfully!",
          description: "Placement details have been shared.",
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied to clipboard!",
          description: "Placement details copied. You can now paste and share.",
        });
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast({
          title: "Share failed",
          description: "Could not share the placement details.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#FDCF2A' }}>
      <div className="max-w-7xl mx-auto">
        {/* Bulletin Board Frame */}
        <div className="relative rounded-3xl p-6 shadow-2xl" style={{ backgroundColor: '#FDCF2A' }}>
          {/* Decorative wavy border */}
          <div className="absolute inset-4 border-4 border-dashed rounded-2xl pointer-events-none" style={{ borderColor: 'rgba(58, 60, 61, 0.2)' }} />

          {/* Dark Board Background */}
          <div className="relative rounded-2xl p-8 min-h-[700px]" style={{ backgroundColor: '#3A3C3D' }}>
            {/* Push Pins */}
            <div className="absolute top-4 left-4 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: '#FDCF2A' }} />
            <div className="absolute top-4 right-4 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: '#FDCF2A' }} />
            <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: '#FDCF2A' }} />
            <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: '#FDCF2A' }} />

            {/* Header */}
            <div className="text-center mb-12">
              {!selectedCompany ? (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src="/Screenshot 2025-12-19 193417.png"
                    alt="Weekend Logo"
                    className="h-16 md:h-24 w-auto"
                  />
                  <h2
                    className="text-2xl md:text-3xl font-bold tracking-wide"
                    style={{ color: '#FDCF2A', textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}
                  >
                    "Every day is a chance to begin again"
                  </h2>
                </div>
              ) : (
                <div>
                  <h1
                    className="text-5xl md:text-7xl font-black tracking-wider mb-2"
                    style={{ color: '#FDCF2A', textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}
                  >
                    {selectedCompany.toUpperCase()}
                  </h1>
                  <h2
                    className="text-2xl md:text-3xl font-bold tracking-wide"
                    style={{ color: '#FDCF2A', textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}
                  >
                    {selectedRole ? selectedRole.toUpperCase() : 'SELECT A ROLE'}
                  </h2>
                </div>
              )}
            </div>

            {/* Content Area */}
            {!selectedCompany ? (
              /* Companies Cards */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {companiesData.map((company, index) => (
                  <div
                    key={company.name}
                    onClick={() => handleCompanyClick(company.name)}
                    className="rounded-lg p-5 shadow-xl cursor-pointer transform hover:scale-110 hover:rotate-2 transition-all duration-300"
                    style={{
                      backgroundColor: '#FFFFFF',
                      transform: `rotate(${(index % 3 - 1) * 2}deg)`,
                    }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={company.icon}
                        alt={company.name}
                        className="w-14 h-14 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                      <Building2 className="w-14 h-14 hidden" style={{ color: '#3A3C3D' }} />
                      <div className="text-center">
                        <div className="font-bold text-sm mb-1" style={{ color: '#3A3C3D' }}>{company.name}</div>
                        <div className="text-xs" style={{ color: '#3A3C3D' }}>
                          {company.roles.length} {company.roles.length === 1 ? 'Role' : 'Roles'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !selectedRole ? (
              /* Roles Cards */
              <div>
                <button
                  onClick={handleBackToCompanies}
                  className="mb-8 px-5 py-2 font-bold rounded-lg transition-colors shadow-lg"
                  style={{ backgroundColor: '#FDCF2A', color: '#3A3C3D' }}
                >
                  ← Back
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companiesData
                    .find((c) => c.name === selectedCompany)
                    ?.roles.map((role, index) => (
                      <div
                        key={role.title}
                        onClick={() => handleRoleClick(role.title)}
                        className="rounded-lg p-6 shadow-xl cursor-pointer transform hover:scale-105 hover:rotate-1 transition-all duration-300"
                        style={{
                          backgroundColor: '#FFFFFF',
                          transform: `rotate(${(index % 3 - 1) * 1.5}deg)`,
                        }}
                      >
                        <div className="text-center">
                          <h3 className="font-bold text-lg mb-3" style={{ color: '#3A3C3D' }}>{role.title}</h3>
                          <div className="text-sm" style={{ color: '#3A3C3D' }}>
                            {role.candidates.length} {role.candidates.length === 1 ? 'Candidate' : 'Candidates'}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              /* Candidates Cards */
              <div>
                <button
                  onClick={handleBackToRoles}
                  className="mb-6 px-4 py-2 font-bold rounded-lg transition-colors shadow-lg"
                  style={{ backgroundColor: '#FDCF2A', color: '#3A3C3D' }}
                >
                  ← Back
                </button>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {companiesData
                    .find((c) => c.name === selectedCompany)
                    ?.roles.find((r) => r.title === selectedRole)
                    ?.candidates.map((candidate, index) => (
                      <div
                        key={index}
                        className="rounded-lg p-4 shadow-lg relative transform hover:scale-105 hover:rotate-1 transition-all duration-300"
                        style={{
                          backgroundColor: '#FFFFFF',
                          transform: `rotate(${(index % 3 - 1) * 1}deg)`,
                        }}
                      >
                        {/* Share Button */}
                        <button
                          onClick={(e) => handleShare(candidate, e)}
                          className="absolute top-2 right-2 p-1.5 rounded-full transition-colors shadow-md"
                          style={{ backgroundColor: '#FDCF2A' }}
                          title="Share"
                        >
                          <Share2 className="w-3.5 h-3.5" style={{ color: '#3A3C3D' }} />
                        </button>

                        <div className="space-y-2 pr-6">
                          <div className="font-bold text-sm" style={{ color: '#3A3C3D' }}>{candidate.name}</div>
                          <div className="text-xs" style={{ color: '#3A3C3D' }}>{candidate.branch}</div>
                          {candidate.package && (
                            <div className="text-base font-bold text-green-600">{candidate.package}</div>
                          )}
                          <div className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(candidate.status)}`}>
                            {getStatusLabel(candidate.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementBoard;
