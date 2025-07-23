export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  linkedin_profile_url: string;
  location_city: string;
  location_state: string;
  location_country: string;
  company_name: string;
  company_website: string;
  industry: string;
  current_role: string;
  email_address: string | null;
  buyer_persona_type: string;
  connection_date: string;
  created_at: string;
}

export interface Experience {
  id: number;
  contact_id: number;
  company_name: string;
  position: string;
  start_date: string;
  end_date: string | null;
}

export const mockContacts: Contact[] = [
  {
    id: 1,
    first_name: "Terrence",
    last_name: "McLean",
    linkedin_profile_url: "https://www.linkedin.com/in/terrencemclean",
    location_city: "Los Altos",
    location_state: "California",
    location_country: "United States",
    company_name: "No Labels",
    company_website: "nolabels.org",
    industry: "Politics",
    current_role: "Co-Chair",
    email_address: null,
    buyer_persona_type: "Executive",
    connection_date: "2025-01-15",
    created_at: "2025-01-23T00:00:00Z"
  },
  {
    id: 2,
    first_name: "Sarah",
    last_name: "Johnson",
    linkedin_profile_url: "https://www.linkedin.com/in/sarahjohnson",
    location_city: "San Francisco",
    location_state: "California",
    location_country: "United States",
    company_name: "TechCorp",
    company_website: "techcorp.com",
    industry: "Technology",
    current_role: "CTO",
    email_address: "sarah@techcorp.com",
    buyer_persona_type: "Technical Decision Maker",
    connection_date: "2025-02-10",
    created_at: "2025-02-15T00:00:00Z"
  },
  {
    id: 3,
    first_name: "Michael",
    last_name: "Chen",
    linkedin_profile_url: "https://www.linkedin.com/in/michaelchen",
    location_city: "Seattle",
    location_state: "Washington",
    location_country: "United States",
    company_name: "CloudSoft",
    company_website: "cloudsoft.io",
    industry: "Software",
    current_role: "Senior Developer",
    email_address: "m.chen@cloudsoft.io",
    buyer_persona_type: "Tech Practitioner",
    connection_date: "2025-03-05",
    created_at: "2025-03-08T00:00:00Z"
  },
  {
    id: 4,
    first_name: "Emma",
    last_name: "Rodriguez",
    linkedin_profile_url: "https://www.linkedin.com/in/emmarodriguez",
    location_city: "Austin",
    location_state: "Texas",
    location_country: "United States",
    company_name: "SalesForce Pro",
    company_website: "salesforcepro.com",
    industry: "Sales Technology",
    current_role: "VP of Sales",
    email_address: "emma@salesforcepro.com",
    buyer_persona_type: "Sales Leader",
    connection_date: "2025-01-28",
    created_at: "2025-02-01T00:00:00Z"
  },
  {
    id: 5,
    first_name: "David",
    last_name: "Kim",
    linkedin_profile_url: "https://www.linkedin.com/in/davidkim",
    location_city: "Toronto",
    location_state: "Ontario",
    location_country: "Canada",
    company_name: "DataMind",
    company_website: "datamind.ca",
    industry: "Data Analytics",
    current_role: "Data Scientist",
    email_address: "david@datamind.ca",
    buyer_persona_type: "Tech Practitioner",
    connection_date: "2025-04-12",
    created_at: "2025-04-15T00:00:00Z"
  },
  {
    id: 6,
    first_name: "Lisa",
    last_name: "Thompson",
    linkedin_profile_url: "https://www.linkedin.com/in/lisathompson",
    location_city: "London",
    location_state: "England",
    location_country: "United Kingdom",
    company_name: "FinTech Solutions",
    company_website: "fintechsolutions.co.uk",
    industry: "Financial Technology",
    current_role: "Product Manager",
    email_address: "lisa@fintechsolutions.co.uk",
    buyer_persona_type: "Budget Owner",
    connection_date: "2025-02-20",
    created_at: "2025-02-25T00:00:00Z"
  },
  {
    id: 7,
    first_name: "Carlos",
    last_name: "Martinez",
    linkedin_profile_url: "https://www.linkedin.com/in/carlosmartinez",
    location_city: "Madrid",
    location_state: "Madrid",
    location_country: "Spain",
    company_name: "EuroTech",
    company_website: "eurotech.es",
    industry: "Technology Consulting",
    current_role: "Consultant",
    email_address: "carlos@eurotech.es",
    buyer_persona_type: "Technical Decision Maker",
    connection_date: "2025-03-18",
    created_at: "2025-03-22T00:00:00Z"
  },
  {
    id: 8,
    first_name: "Jennifer",
    last_name: "Brown",
    linkedin_profile_url: "https://www.linkedin.com/in/jenniferbrown",
    location_city: "New York",
    location_state: "New York",
    location_country: "United States",
    company_name: "MediaCorp",
    company_website: "mediacorp.com",
    industry: "Media & Entertainment",
    current_role: "Creative Director",
    email_address: "jennifer@mediacorp.com",
    buyer_persona_type: "Executive",
    connection_date: "2025-01-08",
    created_at: "2025-01-12T00:00:00Z"
  }
];

export const mockExperiences: Experience[] = [
  {
    id: 1,
    contact_id: 2,
    company_name: "Accenture",
    position: "Senior Consultant",
    start_date: "2020-03-15",
    end_date: "2023-08-31"
  },
  {
    id: 2,
    contact_id: 2,
    company_name: "BetterDatadotco",
    position: "Founder & CEO",
    start_date: "2023-09-01",
    end_date: null
  },
  {
    id: 3,
    contact_id: 3,
    company_name: "Microsoft",
    position: "Software Engineer",
    start_date: "2018-06-01",
    end_date: "2021-12-15"
  },
  {
    id: 4,
    contact_id: 4,
    company_name: "Oracle",
    position: "Sales Manager",
    start_date: "2019-01-10",
    end_date: "2023-05-20"
  },
  {
    id: 5,
    contact_id: 5,
    company_name: "IBM",
    position: "Data Analyst",
    start_date: "2020-08-15",
    end_date: "2024-01-30"
  }
];