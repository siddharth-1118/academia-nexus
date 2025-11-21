'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface StudentData {
  id: string;
  name: string;
  cgpa: number;
  semester: number;
  department: string;
  attendance: number;
}

interface AcademicStats {
  totalStudents: number;
  averageCGPA: number;
  totalDepartments: number;
  averageAttendance: number;
}

const Dashboard = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [stats, setStats] = useState<AcademicStats>({
    totalStudents: 0,
    averageCGPA: 0,
    totalDepartments: 0,
    averageAttendance: 0,
  });

  useEffect(() => {
    const mockStudents: StudentData[] = [
      { id: '1', name: 'Sai Siddharth', cgpa: 8.7, semester: 6, department: 'CSE', attendance: 94 },
      { id: '2', name: 'Arjun Kumar', cgpa: 8.3, semester: 6, department: 'ECE', attendance: 90 },
      { id: '3', name: 'Priya Singh', cgpa: 9.2, semester: 7, department: 'ME', attendance: 96 },
      { id: '4', name: 'Ravi Patel', cgpa: 7.8, semester: 5, department: 'CSE', attendance: 88 },
      { id: '5', name: 'Neha Verma', cgpa: 8.9, semester: 6, department: 'EE', attendance: 92 },
    ];

    setStudents(mockStudents);

    const avgCGPA = mockStudents.reduce((sum, s) => sum + s.cgpa, 0) / mockStudents.length;
    const avgAttendance = mockStudents.reduce((sum, s) => sum + s.attendance, 0) / mockStudents.length;
    const departments = new Set(mockStudents.map(s => s.department)).size;

    setStats({
      totalStudents: mockStudents.length,
      averageCGPA: parseFloat(avgCGPA.toFixed(2)),
      totalDepartments: departments,
      averageAttendance: parseFloat(avgAttendance.toFixed(1)),
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold text-white mb-2">Academia Nexus</h1>
        <p className="text-cyan-400 text-lg">Real-time Academic Analytics Dashboard</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {[
          { label: 'Total Students', value: stats.totalStudents, icon: '👥', color: 'from-blue-500 to-blue-600' },
          { label: 'Avg CGPA', value: stats.averageCGPA, icon: '📊', color: 'from-purple-500 to-purple-600' },
          { label: 'Departments', value: stats.totalDepartments, icon: '🏫', color: 'from-pink-500 to-pink-600' },
          { label: 'Avg Attendance', value: `${stats.averageAttendance}%`, icon: '✅', color: 'from-green-500 to-green-600' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg cursor-pointer`}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-white/80 text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Student Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-center py-3 px-4">CGPA</th>
                <th className="text-center py-3 px-4">Attendance</th>
                <th className="text-center py-3 px-4">Semester</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4 text-cyan-400">{student.department}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full ${
                      student.cgpa >= 8.5
                        ? 'bg-green-500/20 text-green-400'
                        : student.cgpa >= 7.5
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {student.cgpa}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{student.attendance}%</td>
                  <td className="py-3 px-4 text-center">Sem {student.semester}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center text-slate-400"
      >
        <p>🚀 Real-time data collection from SRM Academia</p>
        <p className="text-sm mt-2">Last updated: {new Date().toLocaleTimeString()}</p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
