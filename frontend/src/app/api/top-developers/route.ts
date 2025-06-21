import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// Mock data for demonstration - in production this would come from a database
const mockTopDevelopers = [
  {
    id: '1',
    username: 'alexchen',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    bio: 'Full-stack developer passionate about React, Node.js, and open source. Building scalable applications and contributing to the community.',
    location: 'San Francisco, CA',
    company: 'TechCorp',
    contributionScore: 95,
    experienceLevel: 'Senior',
    stats: {
      repositories: 28,
      starsEarned: 1250,
      contributions: 156,
      languages: 8,
    },
    topLanguages: ['TypeScript', 'JavaScript', 'Python', 'Go'],
    topRepos: [
      { name: 'react-awesome-lib', stars: 450, language: 'TypeScript' },
      { name: 'node-microservice', stars: 320, language: 'JavaScript' },
      { name: 'python-data-tool', stars: 280, language: 'Python' },
    ],
    availability: 'Available for hire',
    hourlyRate: '$120-150',
    contactInfo: {
      email: 'alex.chen@example.com',
      linkedin: 'linkedin.com/in/alexchen',
      twitter: '@alexchen_dev',
    },
  },
  {
    id: '2',
    username: 'sarahkim',
    name: 'Sarah Kim',
    email: 'sarah.kim@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/2345678?v=4',
    bio: 'Backend engineer specializing in distributed systems and cloud architecture. Open source contributor and tech community leader.',
    location: 'New York, NY',
    company: 'CloudScale',
    contributionScore: 88,
    experienceLevel: 'Senior',
    stats: {
      repositories: 22,
      starsEarned: 890,
      contributions: 134,
      languages: 6,
    },
    topLanguages: ['Go', 'Python', 'Rust', 'Java'],
    topRepos: [
      { name: 'distributed-cache', stars: 380, language: 'Go' },
      { name: 'cloud-orchestrator', stars: 290, language: 'Python' },
      { name: 'rust-performance-tool', stars: 220, language: 'Rust' },
    ],
    availability: 'Available for hire',
    hourlyRate: '$130-160',
    contactInfo: {
      email: 'sarah.kim@example.com',
      linkedin: 'linkedin.com/in/sarahkim',
      twitter: '@sarahkim_eng',
    },
  },
  {
    id: '3',
    username: 'mikezhang',
    name: 'Mike Zhang',
    email: 'mike.zhang@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/3456789?v=4',
    bio: 'Frontend specialist with expertise in React, Vue, and modern web technologies. Creating beautiful and performant user experiences.',
    location: 'Seattle, WA',
    company: 'WebFlow',
    contributionScore: 82,
    experienceLevel: 'Mid-Senior',
    stats: {
      repositories: 19,
      starsEarned: 720,
      contributions: 98,
      languages: 5,
    },
    topLanguages: ['JavaScript', 'TypeScript', 'Vue', 'CSS'],
    topRepos: [
      { name: 'vue-component-lib', stars: 310, language: 'Vue' },
      { name: 'react-hooks-collection', stars: 280, language: 'TypeScript' },
      { name: 'css-framework', stars: 190, language: 'CSS' },
    ],
    availability: 'Available for hire',
    hourlyRate: '$100-130',
    contactInfo: {
      email: 'mike.zhang@example.com',
      linkedin: 'linkedin.com/in/mikezhang',
      twitter: '@mikezhang_dev',
    },
  },
  {
    id: '4',
    username: 'emilyrodriguez',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/4567890?v=4',
    bio: 'DevOps engineer and infrastructure specialist. Expert in Kubernetes, Docker, and cloud-native technologies.',
    location: 'Austin, TX',
    company: 'DevOpsPro',
    contributionScore: 78,
    experienceLevel: 'Mid-Senior',
    stats: {
      repositories: 15,
      starsEarned: 580,
      contributions: 87,
      languages: 4,
    },
    topLanguages: ['Python', 'Shell', 'YAML', 'Terraform'],
    topRepos: [
      { name: 'k8s-helm-charts', stars: 250, language: 'YAML' },
      { name: 'docker-templates', stars: 180, language: 'Shell' },
      { name: 'terraform-modules', stars: 150, language: 'HCL' },
    ],
    availability: 'Available for hire',
    hourlyRate: '$110-140',
    contactInfo: {
      email: 'emily.rodriguez@example.com',
      linkedin: 'linkedin.com/in/emilyrodriguez',
      twitter: '@emily_devops',
    },
  },
  {
    id: '5',
    username: 'davidlee',
    name: 'David Lee',
    email: 'david.lee@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/5678901?v=4',
    bio: 'Mobile developer focused on iOS and Android. Creating intuitive mobile experiences with React Native and native development.',
    location: 'Los Angeles, CA',
    company: 'MobileFirst',
    contributionScore: 75,
    experienceLevel: 'Mid-Senior',
    stats: {
      repositories: 12,
      starsEarned: 520,
      contributions: 76,
      languages: 3,
    },
    topLanguages: ['Swift', 'Kotlin', 'JavaScript'],
    topRepos: [
      { name: 'react-native-components', stars: 200, language: 'JavaScript' },
      { name: 'ios-utils', stars: 180, language: 'Swift' },
      { name: 'android-lib', stars: 140, language: 'Kotlin' },
    ],
    availability: 'Available for hire',
    hourlyRate: '$95-125',
    contactInfo: {
      email: 'david.lee@example.com',
      linkedin: 'linkedin.com/in/davidlee',
      twitter: '@davidlee_mobile',
    },
  },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'score';
    const limit = parseInt(searchParams.get('limit') || '10');
    const location = searchParams.get('location');
    const languages = searchParams.get('languages')?.split(',');
    const experienceLevel = searchParams.get('experienceLevel');

    // Filter and sort developers
    let filteredDevelopers = [...mockTopDevelopers];

    // Apply filters
    if (location) {
      filteredDevelopers = filteredDevelopers.filter((dev) =>
        dev.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (languages && languages.length > 0) {
      filteredDevelopers = filteredDevelopers.filter((dev) =>
        dev.topLanguages.some((lang) =>
          languages.some((filterLang) =>
            lang.toLowerCase().includes(filterLang.toLowerCase())
          )
        )
      );
    }

    if (experienceLevel) {
      filteredDevelopers = filteredDevelopers.filter(
        (dev) =>
          dev.experienceLevel.toLowerCase() === experienceLevel.toLowerCase()
      );
    }

    // Sort by different criteria
    switch (sortBy) {
      case 'score':
        filteredDevelopers.sort(
          (a, b) => b.contributionScore - a.contributionScore
        );
        break;
      case 'stars':
        filteredDevelopers.sort(
          (a, b) => b.stats.starsEarned - a.stats.starsEarned
        );
        break;
      case 'repositories':
        filteredDevelopers.sort(
          (a, b) => b.stats.repositories - a.stats.repositories
        );
        break;
      case 'contributions':
        filteredDevelopers.sort(
          (a, b) => b.stats.contributions - a.stats.contributions
        );
        break;
      case 'rate':
        filteredDevelopers.sort((a, b) => {
          const aRate = parseInt(a.hourlyRate.split('-')[0].replace('$', ''));
          const bRate = parseInt(b.hourlyRate.split('-')[0].replace('$', ''));
          return bRate - aRate;
        });
        break;
      default:
        filteredDevelopers.sort(
          (a, b) => b.contributionScore - a.contributionScore
        );
    }

    // Apply limit
    const limitedDevelopers = filteredDevelopers.slice(0, limit);

    return NextResponse.json({
      developers: limitedDevelopers,
      total: filteredDevelopers.length,
      filters: {
        sortBy,
        limit,
        location,
        languages,
        experienceLevel,
      },
    });
  } catch (error) {
    console.error('Error fetching top developers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
