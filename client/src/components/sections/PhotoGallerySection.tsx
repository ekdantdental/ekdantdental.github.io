import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the structure for gallery items
interface GalleryItem {
  id: number;
  image: string;
  alt: string;
  category: 'facility' | 'treatment' | 'team';
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "/images/gallery/consultation-room.jpg",
    alt: "Doctor Consultation Room",
    category: 'facility'
  },
  {
    id: 2,
    image: "/images/gallery/doctor-office.jpg",
    alt: "Doctor's Office",
    category: 'facility'
  },
  {
    id: 3,
    image: "/images/gallery/reception-desk.jpg",
    alt: "Reception Desk",
    category: 'facility'
  },
  {
    id: 4,
    image: "/images/gallery/certificates-wall.jpg",
    alt: "Professional Certificates",
    category: 'facility'
  },
  {
    id: 5,
    image: "/images/gallery/waiting-area.jpg",
    alt: "Patient Waiting Area",
    category: 'facility'
  },
  {
    id: 6,
    image: "/images/gallery/dental-chair-advanced.jpg",
    alt: "Advanced Dental Chair & Equipment",
    category: 'treatment'
  },
  {
    id: 7,
    image: "/images/gallery/treatment-room-1.jpg",
    alt: "Dental Treatment Room",
    category: 'treatment'
  },
  {
    id: 8,
    image: "/images/gallery/clinic-corridor.jpg",
    alt: "Clinic Corridor",
    category: 'facility'
  },
  {
    id: 9,
    image: "/images/gallery/clinic-exterior-night.jpg",
    alt: "Ekdant Clinic Exterior",
    category: 'facility'
  }
];

const PhotoGallerySection = () => {
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-dark mb-3 md:mb-4">
            Clinic Gallery
          </h2>
          <p className="text-gray-600 text-sm md:text-base px-2 md:px-0">
            Take a visual tour of our state-of-the-art facility, treatment rooms, and medical equipment.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
          <Button 
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('all')}
            className={`rounded-full px-6 ${activeCategory === 'all' ? 'bg-primary text-white' : 'text-gray-700'}`}
          >
            All
          </Button>
          <Button 
            variant={activeCategory === 'facility' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('facility')}
            className={`rounded-full px-6 ${activeCategory === 'facility' ? 'bg-primary text-white' : 'text-gray-700'}`}
          >
            Facility
          </Button>
          <Button 
            variant={activeCategory === 'treatment' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('treatment')}
            className={`rounded-full px-6 ${activeCategory === 'treatment' ? 'bg-primary text-white' : 'text-gray-700'}`}
          >
            Treatment Rooms
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.alt} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-gray-700 font-medium text-sm">{item.alt}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <a 
            href="https://g.page/ekdant-multi-speciality-implant-center" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            View More Photos on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallerySection;