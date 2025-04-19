
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-agri-primary text-white py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">কিষাণ কানেক্ট</h3>
            <p className="text-sm">
              পশ্চিমবঙ্গের কৃষকদের ফসল কাটার পরের ব্যবস্থাপনা উন্নত করতে এবং সরাসরি প্রসেসরদের সাথে যোগাযোগ করতে প্রযুক্তি দিয়ে ক্ষমতায়ন।
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-agri-accent transition-colors">
                  হোম
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-sm hover:text-agri-accent transition-colors">
                  মার্কেটপ্লেস
                </Link>
              </li>
              <li>
                <Link to="/forecasting" className="text-sm hover:text-agri-accent transition-colors">
                  পূর্বাভাস
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="text-sm hover:text-agri-accent transition-colors">
                  প্রসেসিং সুবিধা
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">রিসোর্স</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm hover:text-agri-accent transition-colors">
                  সাহায্য কেন্দ্র
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-sm hover:text-agri-accent transition-colors">
                  টিউটোরিয়াল
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-agri-accent transition-colors">
                  জিজ্ঞাসা
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-agri-accent transition-colors">
                  যোগাযোগ করুন
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">যোগাযোগ</h4>
            <address className="not-italic text-sm space-y-2">
              <p>কৃষি উদ্ভাবন কেন্দ্র</p>
              <p>কলকাতা, পশ্চিমবঙ্গ, ভারত</p>
              <p>ইমেল: info@kisanconnect.in</p>
              <p>ফোন: +91 33 2345 6789</p>
            </address>
          </div>
        </div>
        <div className="border-t border-agri-dark mt-8 pt-4">
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} কিষাণ কানেক্ট। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
