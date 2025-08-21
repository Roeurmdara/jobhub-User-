const Jobcategories= [
    {
      id: 1,
      title: "Web & Software Developer",
      subtitle: "Software Engineer, Web developer & more",
      jobs: 612,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#E6F0FF" />
          <path d="M12 14H28V24H12V14Z" stroke="#4285F4" strokeWidth="1.5" />
          <path
            d="M16 28H24V28C24 29.1046 23.1046 30 22 30H18C16.8954 30 16 29.1046 16 28V28Z"
            stroke="#4285F4"
            strokeWidth="1.5"
          />
          <path d="M20 24V28" stroke="#4285F4" strokeWidth="1.5" />
        </svg>
      ),
      color: "#E6F0FF",
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      subtitle: "Data Specialist, Data Analyst & more",
      jobs: 102,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#E6FFF9" />
          <circle cx="20" cy="20" r="6" stroke="#0CCE9C" strokeWidth="1.5" />
          <path d="M20 14V12" stroke="#0CCE9C" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M26 20H28" stroke="#0CCE9C" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 28V26" stroke="#0CCE9C" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 20H14" stroke="#0CCE9C" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24.5 15.5L26 14" stroke="#0CCE9C" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24.5 24.5L26 26" stroke="#0CCE9C" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15.5 24.5L14 26" stroke="#0CCE9C" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15.5 15.5L14 14" stroke="#0CCE9C" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      color: "#E6FFF9",
    },
    {
      id: 3,
      title: "Education & Training",
      subtitle: "Advisor, Coach, Coordinator & more",
      jobs: 1012,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#FFF1E6" />
          <path d="M20 12L28 16L20 20L12 16L20 12Z" stroke="#FF9966" strokeWidth="1.5" />
          <path d="M28 16V24" stroke="#FF9966" strokeWidth="1.5" />
          <path d="M15 17.5V23C15 23 17 25 20 25C23 25 25 23 25 23V17.5" stroke="#FF9966" strokeWidth="1.5" />
        </svg>
      ),
      color: "#FFF1E6",
    },
    {
      id: 4,
      title: "Graphics & Design",
      subtitle: "Graphic Designer, Art Director & more",
      jobs: 1012,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#FFE6F0" />
          <circle cx="20" cy="18" r="6" stroke="#FF66A1" strokeWidth="1.5" />
          <path d="M14 28L18 22" stroke="#FF66A1" strokeWidth="1.5" />
          <path d="M26 28L22 22" stroke="#FF66A1" strokeWidth="1.5" />
        </svg>
      ),
      color: "#FFE6F0",
    },
    {
      id: 5,
      title: "Accounting & Consulting",
      subtitle: "Financial Analyst, Accountant & more",
      jobs: 308,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#EEE6FF" />
          <rect x="14" y="14" width="12" height="4" stroke="#8866FF" strokeWidth="1.5" />
          <rect x="14" y="18" width="12" height="4" stroke="#8866FF" strokeWidth="1.5" />
          <rect x="14" y="22" width="12" height="4" stroke="#8866FF" strokeWidth="1.5" />
        </svg>
      ),
      color: "#EEE6FF",
    },
    {
      id: 6,
      title: "Writing & Translation",
      subtitle: "Content Creator, Copywriter & more",
      jobs: 802,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#E6F5FF" />
          <path d="M14 14H26V26H14V14Z" stroke="#66B2FF" strokeWidth="1.5" />
          <path d="M17 18H23" stroke="#66B2FF" strokeWidth="1.5" />
          <path d="M17 22H23" stroke="#66B2FF" strokeWidth="1.5" />
        </svg>
      ),
      color: "#E6F5FF",
    },
    {
      id: 7,
      title: "Digital Marketing",
      subtitle: "UX Designer, UI Designer & more",
      jobs: 1012,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#FFFDE6" />
          <path d="M14 20L20 14L26 20L20 26L14 20Z" stroke="#FFD966" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="2" stroke="#FFD966" strokeWidth="1.5" />
        </svg>
      ),
      color: "#FFFDE6",
    },
    {
      id: 8,
      title: "Sales & Marketing",
      subtitle: "Advisor, Coach, Coordinator & more",
      jobs: 1012,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#E6FFE8" />
          <rect x="14" y="16" width="12" height="8" rx="1" stroke="#66CC6A" strokeWidth="1.5" />
          <path d="M18 16V14" stroke="#66CC6A" strokeWidth="1.5" />
          <path d="M22 16V14" stroke="#66CC6A" strokeWidth="1.5" />
          <path d="M16 24L16 26" stroke="#66CC6A" strokeWidth="1.5" />
          <path d="M20 24L20 26" stroke="#66CC6A" strokeWidth="1.5" />
          <path d="M24 24L24 26" stroke="#66CC6A" strokeWidth="1.5" />
        </svg>
      ),
      color: "#E6FFE8",
    },
  ];
  export default Jobcategories;