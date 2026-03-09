import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TodayBestDeals from "@/components/TodayBestDeals";
import CategoryGrid from "@/components/CategoryGrid";
import LatestDeals from "@/components/LatestDeals";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TodayBestDeals />
      <CategoryGrid />
      <LatestDeals />
      <Footer />
    </div>
  );
};

export default Index;
