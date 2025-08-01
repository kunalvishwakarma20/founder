import Faq  from "@/components/faqs/Faq";
import Feature from "@/components/features/Feature";
import HomePage  from "@/components/homepage/HomePage";
import Recommendation from "@/components/recommendation/Recommendation";
import Insight  from "@/components/insight/Insight";
import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HomePage />
      <Insight />
      <Feature />
      <Recommendation />
      <Faq />
      <Footer />
    </div>
  );
}
