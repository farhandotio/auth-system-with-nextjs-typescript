import CategorySlider from '@/components/home/CategorySlider';
import Hero from '../components/home/Hero';

export default function homePage() {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col pt-16 w-full">
      <Hero />
      <CategorySlider />
    </div>
  );
}
