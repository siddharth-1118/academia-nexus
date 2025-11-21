import { NextRequest, NextResponse } from 'next/server';

// Generate deterministic but unique data based on NetID
const generateStudentData = (netid: string) => {
  // Extract numeric part from NetID for seeding data
  const numericPart = netid.replace(/\D/g, '');
  const seed = numericPart ? parseInt(numericPart.slice(-6)) : 12345;
  
  // Generate pseudo-random but deterministic values
  const courses = [
    'Web Development',
    'Database Systems',
    'Algorithms',
    'AI & Machine Learning',
    'Cloud Computing',
    'Data Science',
  ];
  
  const departments = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Electrical Engineering',
  ];
  
  // Seed-based selection
  const deptIndex = seed % departments.length;
  const gpaBase = 7 + (seed % 3) + (seed % 100) / 100;
  const attendanceBase = 80 + (seed % 20);
  const semesterBase = 1 + (seed % 8);
  
  // Generate 4 courses with seed-based data
  const studentCourses = [];
  for (let i = 0; i < 4; i++) {
    const courseIndex = (seed + i) % courses.length;
    const courseCode = `CS${3000 + (seed + i) % 100}`;
    const grade = ['A+', 'A', 'B+', 'B'][((seed + i) % 4)];
    const credits = [3, 4][((seed + i) % 2)];
    const att = 85 + ((seed + i * 10) % 12);
    
    studentCourses.push({
      code: courseCode,
      name: courses[courseIndex],
      credits,
      grade,
      attendance: att,
    });
  }
  
  // Extract student name from NetID or use generic
  const getStudentName = () => {
    const firstNames = ['Arjun', 'Priya', 'Rohan', 'Ananya', 'Rahul', 'Divya', 'Aditya', 'Neha'];
    const lastNames = ['Singh', 'Kumar', 'Sharma', 'Patel', 'Gupta', 'Reddy', 'Verma', 'Joshi'];
    const fIndex = seed % firstNames.length;
    const lIndex = (seed + 5) % lastNames.length;
    return `${firstNames[fIndex]} ${lastNames[lIndex]}`;
  };
  
  return {
    netid,
    name: getStudentName(),
    department: departments[deptIndex],
    semester: semesterBase,
    gpa: Math.round(gpaBase * 10) / 10,
    overallAttendance: attendanceBase,
    courses: studentCourses,
    lastSync: new Date().toISOString(),
  };
};

export async function POST(req: NextRequest) {
  try {
    const { netid, password } = await req.json();

    // Validate input
    if (!netid || !password) {
      return NextResponse.json(
        { error: 'NetID and password are required' },
        { status: 400 }
      );
    }

    console.log(`[Auth] Login attempt for NetID: ${netid}`);

    // Validate NetID format (RA2*, U4C*, CB.EN.*)
    const isValidFormat = 
      netid.toUpperCase().includes('RA2') || 
      netid.toUpperCase().includes('U4C') || 
      netid.toUpperCase().includes('CB');
    
    if (!isValidFormat) {
      return NextResponse.json(
        { error: 'Invalid NetID format. Please use your SRM NetID (e.g., RA2511026010006 or CB.EN.U4CSE21001)' },
        { status: 401 }
      );
    }

    // Validate password is not empty
    if (password.length < 1) {
      return NextResponse.json(
        { error: 'Password cannot be empty' },
        { status: 401 }
      );
    }

    // Generate personalized student data
    const studentData = generateStudentData(netid);

    console.log(`[Auth] Login successful for ${netid} (${studentData.name})`);

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      student: studentData,
    });

  } catch (error: any) {
    console.error('[Auth] Error:', error);
    
    return NextResponse.json(
      { error: 'Authentication failed. Please try again.' },
      { status: 401 }
    );
  }
}
