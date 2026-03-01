import { motion } from 'motion/react';
import { Terminal, BriefcaseBusiness, GraduationCap, FolderGit2, Coffee } from 'lucide-react';
import profileImg from '@/imports/photo.jpg';

interface AboutProps {
  language: 'en' | 'pl';
}

export function About({ language }: AboutProps) {
  const ui = {
    en: {
      sectionTitle: '#About.system',
      operator: 'OPERATOR',
      role: 'ROLE',
      location: 'LOCATION',
      status: 'STATUS',
      open: 'AVAILABLE',
      terminalFile: 'user_profile.log',
      whoami: 'get-user',
      missionCmd: 'cat mission.txt',
      whoamiText:
        'Computer Science student at the University of Łódź and aspiring Full-Stack Developer focused on building practical software. I enjoy combining clean backend architecture, user-friendly interfaces, and problem-solving grounded in real-world needs.',
      missionText:
        "I turn ideas, requirements, and data into maintainable software. Right now I'm growing through .NET internship work, academic projects in algorithms and machine learning, and hands-on full-stack development.",
      focusLabel: 'Currently focused on',
      studies: 'STUDIES',
      projects: 'PROJECTS',
      experience: 'EXPERIENCE',
      caffeine: 'COFFEE',
      studyValue: '3rd yr',
      expValue: '1+ yr',
    },
    pl: {
      sectionTitle: '#O_mnie.system',
      operator: 'OPERATOR',
      role: 'ROLA',
      location: 'LOKALIZACJA',
      status: 'STATUS',
      open: 'DOSTĘPNA',
      terminalFile: 'profil_uzytkownika.log',
      whoami: 'get-user',
      missionCmd: 'cat mission.txt',
      whoamiText:
        'Jestem studentką Informatyki i rozwijam się jako Full-Stack Developer. Tworzę praktyczne oprogramowanie: od czystej architektury backendu po dopracowane interfejsy i rozwiązywanie realnych problemów.',
      missionText:
        'Zamieniam pomysły, wymagania i dane w utrzymywalne oprogramowanie. Rozwijam się poprzez staż w .NET oraz projekty z algorytmów i machine learningu — od prototypu do wdrożenia.',
      focusLabel: 'Obecnie skupiam się na',
      studies: 'STUDIA',
      projects: 'PROJEKTY',
      experience: 'DOŚWIADCZENIE',
      caffeine: 'KAWA',
      studyValue: '3 rok',
      expValue: '1+ rok',
    },
  }[language];

  const stats = [
    { icon: GraduationCap, label: ui.studies, value: ui.studyValue, color: 'var(--accent-blue)' },
    { icon: FolderGit2, label: ui.projects, value: '10+', color: 'var(--accent-purple)' },
    { icon: BriefcaseBusiness, label: ui.experience, value: ui.expValue, color: 'var(--accent-blue)' },
    { icon: Coffee, label: ui.caffeine, value: '∞ ml', color: 'var(--accent-purple)' },
  ];

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-blue)]" />
            <h2 className="text-2xl sm:text-3xl code-font text-[var(--text-primary)]">
              {ui.sectionTitle}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left panel - Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] p-5 sm:p-8"
          >
            {/* Profile image */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-[var(--accent-blue)] shadow-[0_0_30px_rgba(88,166,255,0.3)]">
                  <img
                    src={profileImg}
                    alt="Katarzyna Stańczyk"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute bottom-1.5 right-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--accent-green)] border-4 border-[var(--bg-secondary)] animate-pulse" />
              </div>
            </div>

            {/* Profile info */}
            <div className="space-y-2">
              <InfoRow label={ui.operator} value="Katarzyna Stańczyk" valueClassName="text-[var(--accent-blue)]" />
              <InfoRow label={ui.role} value="FULL_STACK_DEVELOPER" valueClassName="text-[var(--accent-purple)]" />
              <InfoRow label={ui.location} value="Łódź, Poland" valueClassName="text-[var(--text-primary)]" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">
                <span className="text-xs sm:text-sm text-[var(--text-secondary)] code-font">
                  {ui.status}
                </span>
                <span className="self-start sm:self-auto px-3 py-1 bg-[var(--accent-green)]/20 border border-[var(--accent-green)] text-white rounded code-font text-xs sm:text-sm shadow-[0_0_15px_rgba(63,185,80,0.35)]">
                  {ui.open}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right panel - Terminal window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden min-w-0"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2 text-xs sm:text-sm code-font text-[var(--text-secondary)] min-w-0">
                <Terminal className="w-4 h-4 text-[var(--accent-blue)] shrink-0" />
                <span className="truncate">{ui.terminalFile}</span>
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 code-font text-xs sm:text-sm">
              {/* whoami */}
              <div>
                <div className="flex items-center gap-2 text-[var(--accent-blue)] mb-2">
                  <span className="shrink-0">➜</span>
                  <span className="truncate">{ui.whoami}</span>
                </div>
                <p className="text-[var(--text-primary)] leading-relaxed pl-4 border-l border-[var(--border-default)] break-words">
                  {ui.whoamiText}
                </p>
              </div>

              {/* mission */}
              <div>
                <div className="flex items-center gap-2 text-[var(--accent-blue)] mb-2">
                  <span className="shrink-0">➜</span>
                  <span className="truncate">{ui.missionCmd}</span>
                </div>
                <p className="text-[var(--text-primary)] leading-relaxed pl-4 border-l border-[var(--border-default)] break-words">
                  {ui.missionText}
                </p>
              </div>

              {/* Focus line */}
              <div className="pl-4 space-y-2 text-[var(--text-primary)] border-l border-[var(--border-default)] break-words">
                <div>
                  {ui.focusLabel}:{' '}
                  <span className="text-[var(--accent-blue)]">.NET</span>,{' '}
                  <span className="text-[var(--accent-blue)]">Full-Stack</span>,{' '}
                  <span className="text-[var(--accent-blue)]">Algorithms</span>,{' '}
                  <span className="text-[var(--accent-blue)]">ML / AI</span>.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] p-4 sm:p-6 hover:border-[var(--accent-blue)] transition-colors"
            >
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-2 sm:mb-3" style={{ color: stat.color }} />
              <div className="text-[10px] sm:text-xs text-[var(--text-secondary)] mb-1 code-font">
                {stat.label}
              </div>
              <div className="text-xl sm:text-2xl code-font" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="py-3 border-b border-[var(--border-default)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
        <span className="text-xs sm:text-sm text-[var(--text-secondary)] code-font">
          {label}
        </span>
        <span className={`code-font break-words ${valueClassName ?? ''}`}>
          {value}
        </span>
      </div>
    </div>
  );
}
