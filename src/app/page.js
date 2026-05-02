
  import EventCategory from "@/components/EventCategory";
  import Navbar from "@/components/Navbar";
  import Slider from "@/components/slider";
  import ThemeToggle from "@/components/ThemeToggle";
  import ListedEvent from "@/components/ListedEvent";
  import SearchContainer from "@/components/SearchContainer"

  export default function RootePage() {

    return (
      <div className="container mx-auto">
        <div className="md:grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <Slider />
          </div>

          <div className="col-span-6">
            <EventCategory />
          </div>
        </div>
    
        {/* this is product section  */}
        <div>
          <ListedEvent />
        </div>
      </div>
    );
  }
