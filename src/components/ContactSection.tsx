import { Mail, MessageCircle, Phone } from 'lucide-react';

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const ContactSection = ({ sectionRef }: ContactSectionProps) => {
  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8" />,
      label: '邮箱',
      value: '2855785353@qq.com',
      href: 'mailto:2855785353@qq.com',
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      label: '微信',
      value: 'HEYAPENG-H',
      href: null,
    },
    {
      icon: <Phone className="w-8 h-8" />,
      label: '电话',
      value: '15184430418',
      href: 'tel:15184430418',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-12 md:py-24 min-h-[50vh] md:min-h-[60vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-card to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-24 md:w-48 h-24 md:h-48 bg-primary/10 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
              <span className="text-gradient-gold">联系方式</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg">
              期待与您的合作
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {contactInfo.map((contact, index) => (
              <div
                key={contact.label}
                className="group p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gold"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-3 md:p-4 rounded-lg md:rounded-xl bg-primary/10 text-primary mb-3 md:mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <div className="w-5 h-5 md:w-8 md:h-8 [&>svg]:w-full [&>svg]:h-full">
                    {contact.icon}
                  </div>
                </div>
                
                <h3 className="text-muted-foreground text-xs md:text-sm uppercase tracking-wider mb-1 md:mb-2">
                  {contact.label}
                </h3>
                
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="text-sm sm:text-base md:text-xl font-semibold text-foreground hover:text-primary transition-colors break-all"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-sm sm:text-base md:text-xl font-semibold text-foreground break-all">
                    {contact.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-border">
            <p className="text-muted-foreground text-xs md:text-base">
              © 2024 何亚鹏 · 作品集
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
