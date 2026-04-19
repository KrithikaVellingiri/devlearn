export interface Lesson {
  title: string;
  duration: string;
  type: 'video' | 'reading';
}

export interface CurriculumSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  initials: string;
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface CourseInclude {
  text: string;
  iconName: 'video' | 'paper' | 'infinity' | 'terminal' | 'award';
}

export interface Instructor {
  name: string;
  title?: string;
  bio?: string;
  students?: string;
  courses?: string;
  avatar: string;
}

export interface Course {
  id: string;
  category: string;
  level: string;
  track?: string;
  title: string;
  description: string;
  instructor: Instructor;
  rating: number;
  reviewsCount: number;
  reviewsCountLabel?: string;
  enrolled?: string;
  lastUpdated?: string;
  price: string;
  numericPrice: number;
  originalPrice?: number;
  discount?: string;
  popularity: number;
  date: string;
  image: string;
  curriculum: CurriculumSection[];
  reviews: Review[];
  includes: CourseInclude[];
}
