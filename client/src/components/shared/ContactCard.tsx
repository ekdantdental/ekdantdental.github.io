interface ContactInfoProps {
  info: {
    id: number;
    title: string;
    content: string[];
    icon: string;
    action: {
      text: string;
      url: string;
    };
  };
}

const ContactCard = ({ info }: ContactInfoProps) => {
  return (
    <div className="bg-light rounded-lg p-4 md:p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-full mb-3 md:mb-4">
        <i className={`${info.icon} text-base md:text-xl`}></i>
      </div>
      <h3 className="font-heading font-semibold text-lg md:text-xl text-dark mb-1 md:mb-2">
        {info.title}
      </h3>
      <div className="text-gray-600 text-sm md:text-base">
        {info.content.map((line, index) => (
          <p key={index} className="leading-relaxed">{line}</p>
        ))}
      </div>
      <a
        href={info.action.url}
        target={info.action.url.startsWith("http") ? "_blank" : undefined}
        rel={info.action.url.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-primary hover:text-secondary font-medium inline-flex items-center mt-3 md:mt-4 text-sm md:text-base"
      >
        {info.action.text} <i className="fas fa-chevron-right ml-1 md:ml-2 text-xs md:text-sm"></i>
      </a>
    </div>
  );
};

export default ContactCard;
