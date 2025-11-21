import { NextRequest, NextResponse } from 'next/server';

// Demo scraper - In production, use Puppeteer on a backend server
const demoStudentData = {
  'CB.EN.U4CSE21001': {
    name: 'Sai Siddharth',
    department: 'Computer Science & Engineering',
    semester: 6,
    courses: [
      { name: 'Data Structures', credits: 4, grade: 'A+', attendance: 95 },
      { name: 'Web Technologies', credits: 3, grade: 'A', attendance: 92 },
      { name: 'Database Systems', credits: 4, grade: 'A+', attendance: 98 },
      { name: 'AI & ML', credits: 3, grade: 'A', attendance: 90 },
    ],
    gpa: 8.7,
    overallAttendance: 94,
  },
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

    // Demo authentication (replace with actual Puppeteer scraping in production)
    if (netid === 'CB.EN.U4CSE21001' && password === 'demo123') {
      const studentData = demoStudentData[netid as keyof typeof demoStudentData];
      return NextResponse.json({
        success: true,
        student: {
          netid,
          ...studentData,
          lastSync: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid credentials. Use demo123 as password.' },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Server error during authentication' },
      { status: 500 }
    );
  }
}

/* 
PUPPETEER IMPLEMENTATION (for production use):

import puppeteer from 'puppeteer';

const ACADEMIA_URL = 'https://academia.srmist.edu.in/#WELCOME';

async function scrapeAcademiaPortal(netid: string, password: string) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(ACADEMIA_URL, { waitUntil: 'networkidle2' });

    // Login
    await page.type('input[name="uid"]', netid);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // Extract student data
    const studentData = await page.evaluate(() => {
      const name = document.querySelector('.student-name')?.textContent || '';
      const gpa = parseFloat(document.querySelector('.gpa-value')?.textContent || '0');
      const courses = Array.from(document.querySelectorAll('tr.course-row')).map(row => ({
        name: row.querySelector('.course-name')?.textContent || '',
        grade: row.querySelector('.grade')?.textContent || '',
        attendance: parseInt(row.querySelector('.attendance')?.textContent || '0'),
      }));

      return { name, gpa, courses };
    });

    return studentData;
  } finally {
    if (browser) await browser.close();
  }
}
*/
