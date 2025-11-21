import { NextRequest, NextResponse } from 'next/server';

const VALID_NETIDS = ['RA2511026010006', 'RA2', 'CB.EN.U4CSE21001', 'U4C'];

// Mock student data - will be replaced with real Puppeteer scraping
const generateMockData = (netid: string) => ({
  netid,
  name: 'Sai Siddharth',
  department: 'Computer Science & Engineering',
  semester: 6,
  gpa: 8.7,
  overallAttendance: 94,
  courses: [
    { code: 'CS3001', name: 'Web Development', credits: 3, grade: 'A', attendance: 95 },
    { code: 'CS3002', name: 'Database Systems', credits: 3, grade: 'A', attendance: 92 },
    { code: 'CS3003', name: 'Algorithms', credits: 4, grade: 'A+', attendance: 96 },
    { code: 'CS3004', name: 'AI & Machine Learning', credits: 3, grade: 'A', attendance: 91 },
  ],
  lastSync: new Date().toISOString(),
});

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

    // Check if NetID format is valid (contains either RA2 or U4C pattern)
    const isValidFormat = netid.includes('RA2') || netid.includes('U4C') || netid.includes('CB');
    
    if (!isValidFormat) {
      return NextResponse.json(
        { error: 'Invalid NetID format. Please use your SRM NetID (e.g., RA2511026010006)' },
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

    // For now, accept any valid NetID format with non-empty password
    // In production, this will call Puppeteer to scrape real data
    const studentData = generateMockData(netid);

    console.log(`[Auth] Login successful for ${netid}`);

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
