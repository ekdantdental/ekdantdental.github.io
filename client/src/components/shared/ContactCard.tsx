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
    <div className="bg-light rounded-lg p-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
        <i className={info.icon}></i>
      </div>
      <h3 className="font-heading font-semibold text-xl text-dark mb-2">
        {info.title}
      </h3>
      <div className="text-gray-600">
        {info.content.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <a
        href={info.action.url}
        target={info.action.url.startsWith("http") ? "_blank" : undefined}
        rel={info.action.url.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-primary hover:text-secondary font-medium inline-flex items-center mt-4"
      >
        {info.action.text} <i className="fas fa-chevron-right ml-2 text-sm"></i>
      </a>
    </div>
  );
};

export default ContactCard;
