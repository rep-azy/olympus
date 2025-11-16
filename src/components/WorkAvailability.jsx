import { useState } from 'react';
import { Clock } from 'lucide-react';

const WorkAvailability = () => {
  // Change this number to update your status: 0, 1, 2, 3, or 4
  const [status] = useState(0);

  /* const availabilityStates = {
    0: {
      label: "Open to Opportunities",
      description: "Actively seeking both freelance projects and full-time employment. Ready to bring your ideas to life!",
      color: "bg-green-500",
      ringColor: "ring-green-500/20",
      dotColor: "bg-green-400",
      workTypes: ["Freelance", "Full-time", "Remote"],
      timeline: "Available Immediately"
    },
    1: {
      label: "Selective Projects",
      description: "Currently engaged but open to exciting opportunities that align with my expertise and interests.",
      color: "bg-yellow-500",
      ringColor: "ring-yellow-500/20",
      dotColor: "bg-yellow-400",
      workTypes: ["Freelance", "Contract", "Part-time"],
      timeline: "Flexible Start Date"
    },
    2: {
      label: "Freelance Only",
      description: "Available for project-based work and contract opportunities. Let's collaborate on your next big idea!",
      color: "bg-blue-500",
      ringColor: "ring-blue-500/20",
      dotColor: "bg-blue-400",
      workTypes: ["Freelance", "Contract", "Remote"],
      timeline: "Available Now"
    },
    3: {
      label: "Fully Booked",
      description: "Currently committed to ongoing projects. Feel free to reach out for future opportunities!",
      color: "bg-red-500",
      ringColor: "ring-red-500/20",
      dotColor: "bg-red-400",
      workTypes: ["Future Projects"],
      timeline: "Available Q1 2026"
    },
    4: {
      label: "Open to Collaborate",
      description: "Interested in partnering with fellow developers and teams on innovative projects and ideas.",
      color: "bg-purple-500",
      ringColor: "ring-purple-500/20",
      dotColor: "bg-purple-400",
      workTypes: ["Collaboration", "Open Source", "Side Projects"],
      timeline: "Ongoing"
    }
  };
 */
  const availabilityStates = {
    0: {
      label: "Open Calling",
      description: "Like a cozy hearth on a crisp autumn day, I'm warmly inviting new opportunities.",
      color: "bg-lime-300",
      ringColor: "ring-lime-400/20",
      dotColor: "bg-lime-300",
      workTypes: ["Freelance", "Full-time", "Remote"],
      timeline: "Ready to Connect",
      icon: "assets/others/status-0.png"
    },
    1: {
      label: "Limited Invitation",
      description: "Currently tending to projects, but there's always room by the fireside for something that truly resonates and sparks inspiration.",
      color: "bg-orange-400",
      ringColor: "ring-orange-400/20",
      dotColor: "bg-orange-400",
      workTypes: ["Freelance", "Contract", "Part-time"],
      timeline: "Flexible Timing",
      icon: "assets/others/status-1.png"
    },
    2: {
      label: "Project Gathering",
      description: "Embracing the seasonal spirit of collaboration through freelance and contract work. Let's create something warm together.",
      color: "bg-teal-500",
      ringColor: "ring-teal-500/20",
      dotColor: "bg-teal-400",
      workTypes: ["Freelance", "Contract", "Remote"],
      timeline: "Open Now",
      icon: "assets/others/status-2.png"
    },
    3: {
      label: "Full Harvest",
      description: "Deep in the season's work, but always happy to share a cup of tea and discuss what we might create when the time is right.",
      color: "bg-red-500",
      ringColor: "ring-red-500/20",
      dotColor: "bg-red-400",
      workTypes: ["Future Projects"],
      timeline: "Next Season",
      icon: "assets/others/status-3.png"
    },
    4: {
      label: "Community Campfire",
      description: "Gathering around shared passions with fellow creators. Let's swap stories, share knowledge, and build something meaningful together.",
      color: "bg-purple-500",
      ringColor: "ring-purple-500/20",
      dotColor: "bg-purple-400",
      workTypes: ["Collaboration", "Open Source", "Side Projects"],
      timeline: "Always Welcome",
      icon: "assets/others/status-4.png"
    }
  };

  const currentStatus = availabilityStates[status];

  return (
    <div className="relative w-full h-full p-0 flex flex-col justify-between">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Status Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`relative flex items-center justify-center w-12 h-12 rounded-full ${currentStatus.color} ${currentStatus.ringColor} ring-4`}>
            <div className={`absolute w-3 h-3 ${currentStatus.dotColor} rounded-full animate-pulse`} />
            <img 
              src={currentStatus.icon} 
              alt={currentStatus.label}
              className="w-10 h-10 object-contain relative z-10"
            />
          </div>
          <div>
            <p className="text-neutral-400 text-sm md:text-base text-pretty">Current Status</p>
            <p className="text-xl text-white">{currentStatus.label}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {currentStatus.description}
        </p>

        {/* Work Types */}
        <div className="flex flex-wrap gap-2 mb-4">
          {currentStatus.workTypes.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-semibold text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline Footer */}
      <div className="relative z-10 flex items-center gap-2 text-gray-400 text-sm pt-4 border-t border-white/10">
        <Clock className="w-4 h-4" />
        <span>{currentStatus.timeline}</span>
      </div>

      {/* Decorative Element */}
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${currentStatus.color} opacity-20 rounded-full blur-3xl`} />
    </div>
  );
};

export default WorkAvailability;