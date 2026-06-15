import { Hero } from './Hero';
import { FeaturedCourses } from './FeaturedCourses';

export function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedCourses />
    </div>
  );
}
