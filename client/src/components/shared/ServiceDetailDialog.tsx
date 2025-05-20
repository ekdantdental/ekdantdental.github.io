import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

interface DetailedDescription {
  sections: {
    title: string;
    content: string[];
  }[];
}

interface ServiceDetailDialogProps {
  serviceId: number;
  title: string;
  detailedDescription?: DetailedDescription;
}

const ServiceDetailDialog = ({ 
  serviceId, 
  title, 
  detailedDescription 
}: ServiceDetailDialogProps) => {
  // Only render if there's detailed description available
  if (!detailedDescription) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primary hover:text-secondary font-medium text-sm md:text-base p-0 h-auto">
          Learn More <span className="ml-1 md:ml-2 text-xs md:text-sm">→</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            Detailed information about {title}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {detailedDescription.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-lg md:text-xl font-semibold text-primary">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.content.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailDialog;