import { Globe, Linkedin, Instagram, Youtube, Construction } from 'lucide-react';

const iconMap = {
  website: Globe,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  comingSoon: Construction,
};

export default function ProjectCard({ project }) {
  const { name, logo, description, links, comingSoon } = project;

  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#e94560]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#e94560]/10">
      {comingSoon && (
        <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          <Construction size={12} />
          <span>Coming Soon</span>
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        <img 
          src={logo} 
          alt={name} 
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#e94560] transition-colors">
            {name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {links.map((link, index) => {
              const Icon = iconMap[link.type] || Globe;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    link.type === 'comingSoon'
                      ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                      : 'bg-[#e94560]/20 text-[#e94560] hover:bg-[#e94560] hover:text-white'
                  }`}
                  onClick={link.type === 'comingSoon' ? (e) => e.preventDefault() : undefined}
                >
                  <Icon size={14} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
