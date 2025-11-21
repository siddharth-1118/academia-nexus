'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface StudentData {
  netid: string;
  name: string;
  department: string;
  semester: number;
  gpa: number;
  overallAttendance: number;
  courses: Array<{
    code: string;
    name: string;
    credits: number;
    grade: string;
    attendance: number;
  }>;
  lastSync: string;
}

const StatCard = ({ icon, label, value, gradient, bgColor }: any) => {
  return (
    <div className={`relative group overflow-hidden rounded-2xl ${bgColor} backdrop-blur-xl border border-white/10 p-6 hover:border-white/30 transition-all duration-300 hover:shadow-2xl cursor-pointer`}>
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-4xl">{icon}</span>
          <div className={`text-sm font-bold px-3 py-1 rounded-full ${gradient} bg-clip-text text-transparent`}>LIVE</div>
        </div>
        <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-1">{label}</p>
        <p className={`text-4xl font-black ${gradient} bg-clip-text text-transparent`}>{value}</p>
      </div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full group-hover:translate-x-40 group-hover:translate-y-40 transition-transform duration-500" />
    </div>
  );
};

const CourseCard = ({ course, index }: any) => {
  const colors = [
    { gradient: 'from-blue-500 to-cyan-500', text: 'text-cyan-400' },
    { gradient: 'from-purple-500 to-pink-500', text: 'text-pink-400' },
    { gradient: 'from-green-500 to-emerald-500', text: 'text-emerald-400' },
    { gradient: 'from-orange-500 to-red-500', text: 'text-red-400' },
  ];
  const color = colors[index % 4];

  return (
    <div className="group relative">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${color.gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`} />
      
      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 h-full">
        <div className="relative z-10">
          <div className="mb-6">
            <div className={`inline-block bg-gradient-to-r ${color.gradient} bg-clip-text text-transparent text-xs font-black uppercase tracking-widest mb-2`}>
              {course.code}
            </div>
            <h3 className="text-2xl font-black text-white group-hover:translate-x-2 transition-transform duration-300">
              {course.name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-xl p-4 group-hover:bg-slate-800 transition-colors">
              <p className="text-slate-400 text-xs uppercase font-bold mb-1">Grade</p>
              <p className="text-3xl font-black text-white">{course.grade}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 group-hover:bg-slate-800 transition-colors">
              <p className="text-slate-400 text-xs uppercase font-bold mb-1">Credits</p>
              <p className="text-3xl font-black text-white">{course.credits}</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-400 text-sm font-bold">ATTENDANCE</span>
              <span className={`text-sm font-black bg-gradient-to-r ${color.gradient} bg-clip-text text-transparent`}>{course.attendance}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${color.gradient} rounded-full transition-all duration-500 group-hover:shadow-lg`}
                style={{ width: `${course.attendance}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedStudent = localStorage.getItem('studentData');
    if (storedStudent) {
      try {
        setStudent(JSON.parse(storedStudent));
      } catch (e) {
        setError('Failed to load student data');
      }
    } else {
      setError('No student data found. Please login first.');
      setTimeout(() => router.push('/login'), 2000);
    }
    setLoading(false);
  }, [router]);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-bold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-2xl font-bold mb-4">{error}</div>
          <div className="text-slate-400">Redirecting to login...</div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl font-bold">No student data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 backdrop-blur-xl bg-black/40 border-b border-slate-800/50 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  <h1 className="text-5xl font-black">ACADEMIA</h1>
                  <h1 className="text-5xl font-black">NEXUS</h1>
                </div>
                <p className="text-slate-400 font-semibold">Your Creative Academic Command Center</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('studentData');
                  router.push('/login');
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
              >
                Logout →
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Card */}
          <div className="mb-12 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
              <h2 className="text-3xl font-black mb-2">
                Welcome back, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{student.name}</span>!
              </h2>
              <p className="text-slate-400 text-lg">📊 Semester {student.semester} • 🎓 {student.department} • 🆔 {student.netid}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon="📚"
              label="Overall GPA"
              value={student.gpa.toFixed(2)}
              gradient="from-green-400 to-emerald-400"
              bgColor="bg-green-500/10"
            />
            <StatCard
              icon="✅"
              label="Attendance"
              value={`${student.overallAttendance}%`}
              gradient="from-purple-400 to-pink-400"
              bgColor="bg-purple-500/10"
            />
            <StatCard
              icon="📖"
              label="Total Courses"
              value={student.courses.length}
              gradient="from-orange-400 to-red-400"
              bgColor="bg-orange-500/10"
            />
            <StatCard
              icon="⭐"
              label="Avg Grade"
              value="A"
              gradient="from-yellow-400 to-orange-400"
              bgColor="bg-yellow-500/10"
            />
          </div>

          {/* Performance Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-8 text-white">📊 YOUR COURSES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {student.courses.map((course, index) => (
                <CourseCard key={index} course={course} index={index} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-center text-slate-500 text-sm">
              <p>Last synced: {new Date(student.lastSync).toLocaleString()}</p>
              <p className="mt-4 sm:mt-0">Academia Nexus © 2024 - Creative Dashboard by Siddharth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
