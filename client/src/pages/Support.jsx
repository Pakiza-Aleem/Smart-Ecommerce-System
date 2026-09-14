// pages/Support.jsx - one component serving Contact / FAQ / Shipping / Returns,
// so every footer "Support" link is a real, working page instead of href="#".
import { useParams, Link } from 'react-router-dom';
import { Mail, Phone, Truck, RotateCcw, HelpCircle } from 'lucide-react';

const PAGES = {
  contact: {
    icon: Mail,
    title: 'Contact Us',
    body: (
      <>
        <p>We're happy to help with orders, products, or anything else about ZENTRO.</p>
        <p><Mail size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} /> support@zentro.example</p>
        <p><Phone size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} /> +92 300 0000000</p>
      </>
    ),
  },
  faq: {
    icon: HelpCircle,
    title: 'Help & FAQ',
    body: (
      <>
        <h3>How do I track my order?</h3>
        <p>Open Orders from your account menu to see the status of every order you've placed.</p>
        <h3>Can ZEN help me choose a product?</h3>
        <p>Yes. Open ZEN from the bottom-right corner and try Search Products, Find by Budget, or Compare Products.</p>
        <h3>How do I pay?</h3>
        <p>ZENTRO currently supports Cash on Delivery at checkout.</p>
      </>
    ),
  },
  shipping: {
    icon: Truck,
    title: 'Shipping',
    body: (
      <>
        <p>Orders are typically prepared within 1-2 business days and delivered within 3-7 business days
          depending on your city.</p>
        <p>You can review shipping details for any order from the Orders page.</p>
      </>
    ),
  },
  returns: {
    icon: RotateCcw,
    title: 'Returns',
    body: (
      <>
        <p>If a product arrives damaged or isn't what you ordered, contact support within 7 days of delivery
          for a replacement or refund.</p>
        <p>Products must be unused and in their original packaging to qualify for a return.</p>
      </>
    ),
  },
};

export default function Support() {
  const { topic } = useParams();
  const page = PAGES[topic] || PAGES.faq;
  const Icon = page.icon;

  return (
    <div className="support-page">
      <div className="support-card card">
        <Icon size={28} />
        <h1>{page.title}</h1>
        {page.body}
        <Link to="/" className="btn btn-outline">Back to ZENTRO</Link>
      </div>
    </div>
  );
}
