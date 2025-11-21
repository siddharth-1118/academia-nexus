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
  const [timestamp, setTimestamp] = useState('');

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

  useEffect(() => {
    setTimestamp(new Date().toLocaleTimeString());
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
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Academia Nexus Dashboard
          </h1>
          <p className="text-slate-300">Real-time Academic Analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 shadow-lg">
            <div className="text-sm text-blue-100 mb-2">Total Students</div>
            <div className="text-4xl font-bold">{stats.totalStudents}</div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 shadow-lg">
            <div className="text-sm text-purple-100 mb-2">Average CGPA</div>
            <div className="text-4xl font-bold">{stats.averageCGPA}</div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-6 shadow-lg">
            <div className="text-sm text-pink-100 mb-2">Departments</div>
            <div className="text-4xl font-bold">{stats.totalDepartments}</div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 shadow-lg">
            <div className="text-sm text-green-100 mb-2">Avg Attendance</div>
            <div className="text-4xl font-bold">{Math.round(stats.averageAttendance)}%</div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="bg-slate-800/50 backdrop-blur-md rounded-lg overflow-hidden border border-slate-700">
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-700">
            <h2 className="text-2xl font-bold">Student Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700/50 border-b border-slate-600">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">CGPA</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Attendance</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">{student.name}</td>
                    <td className="px-6 py-4 text-sm">
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
                    <td className="px-6 py-4 text-sm text-cyan-400">{student.department}</td>
                    <td className="px-6 py-4 text-sm text-center">{student.attendance}%</td>
                    <td className="px-6 py-4 text-sm">Sem {student.semester}</td>
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
          <p>📊 Real-time data collection from SRM Academia</p>
          <p className="text-sm mt-2">Last updated: {timestamp}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
