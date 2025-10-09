import { formatDistanceToNow } from 'date-fns'

// Mock data arrays
export const _id = [
  'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
  'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
  'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
  'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
  'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'
]

export const _ages = [25, 30, 35, 40, 45, 50, 55, 60]

export const _roles = ['admin', 'manager', 'user', 'guest']

export const _prices = [25.99, 50.99, 99.99, 149.99, 199.99, 299.99]

export const _emails = [
  'john@example.com',
  'jane@example.com',
  'bob@example.com',
  'alice@example.com',
  'charlie@example.com'
]

export const _ratings = [3.5, 4.0, 4.2, 4.5, 4.8, 5.0]

export const _nativeS = [11, 12, 13, 14, 15]

export const _nativeM = [16, 17, 18, 19, 20]

export const _nativeL = [21, 22, 23, 24, 25]

export const _percents = [10, 25, 50, 75, 100]

export const _booleans = [true, false, true, false, true]

export const _sentences = [
  'This is a sample sentence for testing purposes.',
  'Another example of a sentence in the mock data.',
  'This demonstrates how sentences can be generated.',
  'Mock data helps in development and testing.',
  'Various sentences for different use cases.'
]

export const _lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Williams']

export const _fullNames = [
  'John Doe',
  'Jane Smith',
  'Bob Johnson',
  'Alice Brown',
  'Charlie Williams'
]

export const _tourNames = [
  'Mountain Adventure',
  'City Explorer',
  'Beach Paradise',
  'Forest Retreat',
  'Desert Safari'
]

export const _jobTitles = [
  'Software Engineer',
  'Product Manager',
  'Designer',
  'Marketing Specialist',
  'Data Analyst'
]

export const _taskNames = [
  'Review code changes',
  'Update documentation',
  'Fix bug in login',
  'Design new feature',
  'Test application'
]

export const _fileNames = [
  'document.pdf',
  'presentation.pptx',
  'spreadsheet.xlsx',
  'image.jpg',
  'video.mp4'
]

export const _postTitles = [
  'Getting Started with Nuxt.js',
  'Vue 3 Composition API Guide',
  'Building Modern Web Apps',
  'TypeScript Best Practices',
  'UI/UX Design Trends'
]

export const _firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie']

export const _eventNames = [
  'Tech Conference 2024',
  'Design Workshop',
  'Developer Meetup',
  'Product Launch',
  'Team Building Event'
]

export const _courseNames = [
  'Introduction to Programming',
  'Advanced JavaScript',
  'UI/UX Design Fundamentals',
  'Data Science Basics',
  'Project Management'
]

export const _fullAddress = [
  '123 Main St, Anytown, USA',
  '456 Oak Ave, Somewhere, USA',
  '789 Pine Rd, Nowhere, USA',
  '321 Elm St, Everywhere, USA',
  '654 Maple Dr, Anywhere, USA'
]

export const _companyNames = [
  'TechCorp',
  'InnovateLabs',
  'DigitalSolutions',
  'FutureTech',
  'SmartSystems'
]

export const _productNames = [
  'Wireless Headphones',
  'Smart Watch',
  'Laptop Computer',
  'Mobile Phone',
  'Tablet Device'
]

export const _descriptions = [
  'A high-quality product designed for modern users.',
  'Featuring advanced technology and sleek design.',
  'Built to last with premium materials and craftsmanship.',
  'Perfect for both personal and professional use.',
  'Experience the difference with our innovative solution.'
]

export const _phoneNumbers = [
  '+1-555-0123',
  '+1-555-0124',
  '+1-555-0125',
  '+1-555-0126',
  '+1-555-0127'
]

export const _countryNames = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France'
]

// ----------------------------------------------------------------------

export const _mock = {
  id: (index: number) => _id[index] || _id[0],
  time: (index: number) => {
    const date = new Date()
    date.setDate(date.getDate() - index)
    date.setHours(date.getHours() - index)
    return formatDistanceToNow(date, { addSuffix: true })
  },
  boolean: (index: number) => _booleans[index] || false,
  role: (index: number) => _roles[index] || 'user',
  // Text
  courseNames: (index: number) => _courseNames[index] || _courseNames[0],
  fileNames: (index: number) => _fileNames[index] || _fileNames[0],
  eventNames: (index: number) => _eventNames[index] || _eventNames[0],
  taskNames: (index: number) => _taskNames[index] || _taskNames[0],
  postTitle: (index: number) => _postTitles[index] || _postTitles[0],
  jobTitle: (index: number) => _jobTitles[index] || _jobTitles[0],
  tourName: (index: number) => _tourNames[index] || _tourNames[0],
  productName: (index: number) => _productNames[index] || _productNames[0],
  sentence: (index: number) => _sentences[index] || _sentences[0],
  description: (index: number) => _descriptions[index] || _descriptions[0],
  // Contact
  email: (index: number) => _emails[index] || _emails[0],
  phoneNumber: (index: number) => _phoneNumbers[index] || _phoneNumbers[0],
  fullAddress: (index: number) => _fullAddress[index] || _fullAddress[0],
  // Name
  firstName: (index: number) => _firstNames[index] || _firstNames[0],
  lastName: (index: number) => _lastNames[index] || _lastNames[0],
  fullName: (index: number) => _fullNames[index] || _fullNames[0],
  companyNames: (index: number) => _companyNames[index] || _companyNames[0],
  countryNames: (index: number) => _countryNames[index] || _countryNames[0],
  // Number
  number: {
    percent: (index: number) => _percents[index] || 0,
    rating: (index: number) => _ratings[index] || 0,
    age: (index: number) => _ages[index] || 25,
    price: (index: number) => _prices[index] || 0,
    nativeS: (index: number) => _nativeS[index] || 11,
    nativeM: (index: number) => _nativeM[index] || 16,
    nativeL: (index: number) => _nativeL[index] || 21,
  },
  // Image
  image: {
    cover: (index: number) => `/assets/images/cover/cover-${(index % 5) + 1}.webp`,
    avatar: (index: number) => `/assets/images/avatar/avatar-${(index % 5) + 1}.webp`,
    travel: (index: number) => `/assets/images/travel/travel-${(index % 5) + 1}.webp`,
    course: (index: number) => `/assets/images/course/course-${(index % 5) + 1}.webp`,
    company: (index: number) => `/assets/images/company/company-${(index % 5) + 1}.webp`,
    product: (index: number) => `/assets/images/m-product/product-${(index % 5) + 1}.webp`,
    portrait: (index: number) => `/assets/images/portrait/portrait-${(index % 5) + 1}.webp`,
  },
}
