import { motion } from 'framer-motion'

const ATTENDANCE_DATA = [72, 85, 60, 90, 78, 95, 65, 88, 74, 92, 80, 97]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CALENDAR_DAYS = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  status: [2, 5, 7, 9, 14, 20, 25, 27].includes(i + 1)
    ? 'absent'
    : [1, 3, 6, 8, 10, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22, 23, 24, 26, 28, 29, 30].includes(i + 1)
    ? 'present'
    : 'weekend',
}))

const EMPLOYEES = [
  { name: 'Anjali R', dept: 'Engineering', status: 'present', time: '09:02 AM' },
  { name: 'Ravi K', dept: 'Design', status: 'late', time: '10:15 AM' },
  { name: 'Sneha P', dept: 'Engineering', status: 'present', time: '08:58 AM' },
  { name: 'Arjun M', dept: 'HR', status: 'absent', time: '—' },
]

export default function AttendanceMockup({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 text-white"
      style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 60%, #0d1421 100%)',
        boxShadow: `0 0 60px ${accentColor}18, 0 0 120px ${accentColor}08`,
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/8 bg-black/30">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-2 min-w-0">
          <div
            className="rounded px-2 py-0.5 text-[9px] font-mono truncate"
            style={{ background: 'rgba(255,255,255,0.04)', color: accentColor + '80' }}
          >
            attendance.app/dashboard
          </div>
        </div>
        <div
          className="text-[8px] font-mono px-1.5 py-0.5 rounded-full flex-shrink-0"
          style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}
        >
          Mgr
        </div>
      </div>

      <div className="flex">
        {/* Sidebar — icon only, always narrow */}
        <div className="w-9 border-r border-white/5 py-3 flex flex-col items-center gap-2.5 bg-black/10 flex-shrink-0">
          {[
            { icon: '📊', active: true },
            { icon: '👥', active: false },
            { icon: '📅', active: false },
            { icon: '📤', active: false },
            { icon: '⚙️', active: false },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] cursor-pointer"
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

        {/* Main — always a single flex column */}
        <div className="flex-1 p-2.5 flex flex-col gap-2 min-w-0">

          {/* KPI row — always 4 cols but compact */}
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label: 'Total', value: '142', color: accentColor, icon: '👤' },
              { label: 'Present', value: '128', color: '#22c55e', icon: '✅' },
              { label: 'Absent', value: '10', color: '#ef4444', icon: '❌' },
              { label: 'Late', value: '4', color: '#f59e0b', icon: '⏰' },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="rounded-lg p-1.5 border border-white/5"
                style={{ background: `${kpi.color}08` }}
              >
                <div className="text-[8px] text-gray-500 flex items-center gap-0.5 mb-0.5">
                  <span>{kpi.icon}</span>
                  <span className="truncate">{kpi.label}</span>
                </div>
                <div className="text-xs font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Bar chart — full width */}
          <div className="rounded-lg p-2 border border-white/5 bg-white/[0.02]">
            <div className="text-[8px] text-gray-500 mb-1.5 flex justify-between">
              <span>Monthly Attendance %</span>
              <span style={{ color: accentColor }}>2025</span>
            </div>
            <div className="flex items-end gap-0.5 h-10">
              {ATTENDANCE_DATA.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <motion.div
                    className="w-full rounded-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.6 + i * 0.04, duration: 0.6, ease: 'easeOut' }}
                    style={{ background: `linear-gradient(to top, ${accentColor}90, ${accentColor}30)` }}
                  />
                  <span className="text-[6px] text-gray-600">{MONTHS[i].slice(0, 1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Employee list */}
          <div className="rounded-lg border border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="text-[8px] text-gray-500 px-2 py-1 border-b border-white/5 flex justify-between">
              <span>Live Attendance Feed</span>
              <span style={{ color: accentColor }}>Today</span>
            </div>
            {EMPLOYEES.map((emp, i) => (
              <motion.div
                key={emp.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="flex items-center gap-1.5 px-2 py-1.5 border-b border-white/[0.03] last:border-0"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold flex-shrink-0"
                  style={{ background: `${accentColor}20`, color: accentColor }}
                >
                  {emp.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[8px] text-gray-300 truncate">{emp.name}</div>
                  <div className="text-[7px] text-gray-600 truncate">{emp.dept}</div>
                </div>
                <div
                  className="text-[7px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background:
                      emp.status === 'present' ? '#22c55e15' : emp.status === 'late' ? '#f59e0b15' : '#ef444415',
                    color:
                      emp.status === 'present' ? '#22c55e' : emp.status === 'late' ? '#f59e0b' : '#ef4444',
                  }}
                >
                  {emp.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
