import { motion } from 'framer-motion'

const SUBJECTS = [
  { name: 'DSA', attendance: 88, marks: 82, color: '#A855F7' },
  { name: 'DBMS', attendance: 92, marks: 90, color: '#38BDF8' },
  { name: 'OS', attendance: 74, marks: 68, color: '#f59e0b' },
  { name: 'CN', attendance: 85, marks: 78, color: '#22c55e' },
  { name: 'SE', attendance: 96, marks: 94, color: '#A855F7' },
]

const TASKS = [
  { title: 'Complete DSA Assignment', priority: 'high', done: true },
  { title: 'Revise DBMS Notes', priority: 'medium', done: true },
  { title: 'OS Lab Prep', priority: 'high', done: false },
  { title: 'CN Numericals', priority: 'low', done: false },
]

const WEEKLY = [65, 80, 55, 90, 70, 85, 40]
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function StudySyncMockup({ accentColor }: { accentColor: string }) {
  const secondColor = '#38BDF8'

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 text-white"
      style={{
        background: 'linear-gradient(135deg, #0d0d1a 0%, #13131f 60%, #0a0d1a 100%)',
        boxShadow: `0 0 60px ${accentColor}18, 0 0 120px ${accentColor}08`,
        minHeight: 380,
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-black/30">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-3">
          <div
            className="rounded px-3 py-0.5 text-[10px] font-mono truncate"
            style={{ background: 'rgba(255,255,255,0.04)', color: accentColor + '80' }}
          >
            studysync.ai/dashboard
          </div>
        </div>
        <div
          className="text-[9px] font-mono px-2 py-0.5 rounded-full"
          style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}
        >
          Student
        </div>
      </div>

      <div className="flex h-[calc(100%-36px)]">
        {/* Sidebar */}
        <div className="w-10 sm:w-14 border-r border-white/5 py-3 flex flex-col items-center gap-3 bg-black/10">
          {[
            { icon: '🏠', active: true },
            { icon: '📚', active: false },
            { icon: '✅', active: false },
            { icon: '📊', active: false },
            { icon: '⏱️', active: false },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs cursor-pointer"
              style={
                item.active
                  ? { background: `${accentColor}20`, border: `1px solid ${accentColor}40` }
                  : { color: '#4b5563' }
              }
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 overflow-hidden flex flex-col gap-2.5">
          {/* KPI row */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Study Hrs', value: '42h', color: accentColor, icon: '📖' },
              { label: 'Tasks Done', value: '18', color: '#22c55e', icon: '✅' },
              { label: 'Avg Attend', value: '87%', color: secondColor, icon: '📅' },
              { label: 'Avg Marks', value: '82%', color: '#f59e0b', icon: '🎯' },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="rounded-lg p-2 border border-white/5"
                style={{ background: `${kpi.color}08` }}
              >
                <div className="text-[9px] text-gray-500 flex items-center gap-0.5 mb-0.5">
                  <span>{kpi.icon}</span>
                  <span>{kpi.label}</span>
                </div>
                <div className="text-sm font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Middle: weekly chart + pomodoro */}
          <div className="grid grid-cols-5 gap-2">
            {/* Weekly study hours bar chart */}
            <div className="col-span-3 rounded-lg p-2 border border-white/5 bg-white/[0.02]">
              <div className="text-[9px] text-gray-500 mb-2 flex justify-between">
                <span>Weekly Study Hours</span>
                <span style={{ color: accentColor }}>This Week</span>
              </div>
              <div className="flex items-end gap-1.5 h-16">
                {WEEKLY.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <motion.div
                      className="w-full rounded-sm"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.6 + i * 0.05, duration: 0.6, ease: 'easeOut' }}
                      style={{
                        background:
                          i === 3
                            ? `linear-gradient(to top, ${accentColor}, ${accentColor}60)`
                            : `linear-gradient(to top, ${accentColor}50, ${accentColor}15)`,
                      }}
                    />
                    <span className="text-[7px] text-gray-600">{DAYS[i].slice(0, 2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pomodoro timer */}
            <div className="col-span-2 rounded-lg p-2.5 border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-1.5">
              <div className="text-[9px] text-gray-500">Focus Session</div>
              <div className="relative w-14 h-14">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                  <motion.circle
                    cx="28" cy="28" r="22" fill="none"
                    stroke={accentColor} strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 22}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 22 * 0.35 }}
                    transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold" style={{ color: accentColor }}>18:42</span>
                  <span className="text-[7px] text-gray-600">Focus</span>
                </div>
              </div>
              <div
                className="text-[8px] px-2 py-0.5 rounded-full"
                style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}
              >
                ▶ Running
              </div>
            </div>
          </div>

          {/* Bottom: subject attendance + tasks */}
          <div className="grid grid-cols-5 gap-2 flex-1 min-h-0">
            {/* Subject attendance */}
            <div className="col-span-3 rounded-lg border border-white/5 bg-white/[0.02] overflow-hidden">
              <div className="text-[9px] text-gray-500 px-2.5 py-1.5 border-b border-white/5">
                Subject Performance
              </div>
              <div className="p-2 space-y-1.5">
                {SUBJECTS.map((sub, i) => (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.08 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[9px] text-gray-400 w-8 flex-shrink-0">{sub.name}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${sub.attendance}%` }}
                        transition={{ delay: 1 + i * 0.08, duration: 0.8 }}
                        style={{ background: `linear-gradient(90deg, ${sub.color}, ${sub.color}60)` }}
                      />
                    </div>
                    <span className="text-[9px] flex-shrink-0" style={{ color: sub.color }}>
                      {sub.attendance}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Task list */}
            <div className="col-span-2 rounded-lg border border-white/5 bg-white/[0.02] overflow-hidden">
              <div className="text-[9px] text-gray-500 px-2.5 py-1.5 border-b border-white/5">
                Tasks
              </div>
              <div className="p-2 space-y-1.5">
                {TASKS.map((task, i) => (
                  <motion.div
                    key={task.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 + i * 0.07 }}
                    className="flex items-start gap-1.5"
                  >
                    <div
                      className="w-3 h-3 rounded flex-shrink-0 mt-0.5 flex items-center justify-center text-[7px]"
                      style={{
                        background: task.done ? `${accentColor}20` : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${task.done ? accentColor + '50' : 'rgba(255,255,255,0.1)'}`,
                      }}
                    >
                      {task.done && <span style={{ color: accentColor }}>✓</span>}
                    </div>
                    <span
                      className="text-[8px] leading-tight"
                      style={{
                        color: task.done ? '#4b5563' : '#9ca3af',
                        textDecoration: task.done ? 'line-through' : 'none',
                      }}
                    >
                      {task.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
