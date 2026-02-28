import { useState } from 'react';
import { BookOpenText, CircleHelp, Mail, MessageSquareText, Phone } from 'lucide-react';
import { SurfaceCard } from '../components/common/SurfaceCard';

const faqs = [
  {
    id: 'f1',
    question: 'How do I correct missed check-in records?',
    answer: 'Go to Approve Attendance, choose Attendance Correction request, and submit reason with date.',
  },
  {
    id: 'f2',
    question: 'Can managers bulk clock in labour teams?',
    answer: 'Yes. Use Clock In page, select team and members, then click Mark Selected Clock In.',
  },
  {
    id: 'f3',
    question: 'How can I export monthly attendance?',
    answer: 'Export options will be available in the upcoming functionality phase from Staff and My Attendance pages.',
  },
];

export const HelpSupportPage = () => {
  const [openFaq, setOpenFaq] = useState(faqs[0].id);

  return (
    <section className="helpPage">
      <div className="helpCardsGrid">
        <SurfaceCard className="helpCard elevatedCard">
          <Mail size={18} />
          <h3>Email Support</h3>
          <p>support@mortgagecrm.com</p>
        </SurfaceCard>
        <SurfaceCard className="helpCard elevatedCard">
          <Phone size={18} />
          <h3>Call Support</h3>
          <p>+91 98765 43210</p>
        </SurfaceCard>
        <SurfaceCard className="helpCard elevatedCard">
          <MessageSquareText size={18} />
          <h3>Live Chat</h3>
          <p>Mon-Sat • 9 AM to 7 PM</p>
        </SurfaceCard>
      </div>

      <article className="helpPanel">
        <div className="helpPanelHead">
          <CircleHelp size={18} />
          <h3>Frequently Asked Questions</h3>
        </div>
        <div className="faqList">
          {faqs.map((faq) => (
            <article key={faq.id} className="faqItem">
              <button type="button" onClick={() => setOpenFaq((prev) => (prev === faq.id ? '' : faq.id))}>
                {faq.question}
              </button>
              {openFaq === faq.id && <p>{faq.answer}</p>}
            </article>
          ))}
        </div>
      </article>

      <article className="helpPanel">
        <div className="helpPanelHead">
          <BookOpenText size={18} />
          <h3>Guides & Release Notes</h3>
        </div>
        <div className="guideList">
          <div>
            <h4>Attendance Workflow Guide</h4>
            <p>Understand end-to-end flow from check-in to approval and reporting.</p>
          </div>
          <div>
            <h4>Role Permission Matrix</h4>
            <p>View permission boundaries for Admin, Manager, and Employee roles.</p>
          </div>
          <div>
            <h4>February 28, 2026 Release Notes</h4>
            <p>New dashboard shell and all page-level UIs are now available.</p>
          </div>
        </div>
      </article>
    </section>
  );
};
