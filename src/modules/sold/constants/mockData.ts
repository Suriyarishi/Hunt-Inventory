export interface SoldDeal {
  id: string;
  bookingId: string;
  projectName: string;
  tower: string;
  floor: number;
  unitNumber: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerPAN: string;
  buyerAadhaar: string;
  buyerAddress: string;
  buyerOccupation: string;
  coApplicant: {
    name: string;
    relationship: string;
    pan: string;
  } | null;
  saleValue: string;
  saleValueRaw: number; // For analytics
  commissionPercentage: number;
  commissionValue: string;
  commissionValueRaw: number;
  commissionStatus: 'Expected' | 'Released' | 'Processing' | 'Hold';
  commissionExpectedDate: string;
  commissionReleasedDate: string | null;
  registrationStatus: 'Not Started' | 'Agreement Signed' | 'Registered' | 'Possession Handed Over';
  agreementDate: string | null;
  registrationDate: string | null;
  registryNumber: string | null;
  possessionDate: string | null;
  paymentStatus: 'Fully Paid' | 'Partially Paid' | 'Token Received';
  tokenAmount: string;
  bookingAmount: string;
  paidAmount: string;
  pendingAmount: string;
  paymentMode: string;
  paymentSchedule: {
    milestone: string;
    dueDate: string;
    amount: string;
    status: 'Paid' | 'Pending' | 'Overdue';
  }[];
  dealStatus: 'Active' | 'Closed' | 'Cancelled';
  soldDate: string;
  activities: {
    id: string;
    title: string;
    timestamp: string;
    user: string;
    description: string;
  }[];
  documents: {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
  }[];
}

export const mockSoldDeals: SoldDeal[] = [
  {
    id: 'SLD-2026-001',
    bookingId: 'BKG-9921',
    projectName: 'Skyline Residences',
    tower: 'Tower A',
    floor: 14,
    unitNumber: 'A-1402',
    buyerName: 'Vikram Malhotra',
    buyerPhone: '+91 98765 43210',
    buyerEmail: 'vikram.malhotra@gmail.com',
    buyerPAN: 'ABCDE1234F',
    buyerAadhaar: '1234 5678 9012',
    buyerAddress: 'Flat 402, Landmark Heights, HSR Layout, Bengaluru',
    buyerOccupation: 'Software Architect',
    coApplicant: {
      name: 'Pooja Malhotra',
      relationship: 'Spouse',
      pan: 'FGHIJ5678K'
    },
    saleValue: '₹4.2 Cr',
    saleValueRaw: 42000000,
    commissionPercentage: 2.0,
    commissionValue: '₹8.4 L',
    commissionValueRaw: 840000,
    commissionStatus: 'Released',
    commissionExpectedDate: '2026-06-30',
    commissionReleasedDate: '2026-06-12',
    registrationStatus: 'Registered',
    agreementDate: '2026-06-02',
    registrationDate: '2026-06-10',
    registryNumber: 'REG-KAR-8891-2026',
    possessionDate: '2026-09-15',
    paymentStatus: 'Fully Paid',
    tokenAmount: '₹5,00,000',
    bookingAmount: '₹42,00,000',
    paidAmount: '₹4.2 Cr',
    pendingAmount: '₹0',
    paymentMode: 'Net Banking (HDFC)',
    paymentSchedule: [
      { milestone: 'Token Amount', dueDate: '2026-06-01', amount: '₹5,00,000', status: 'Paid' },
      { milestone: 'Booking Amount (10%)', dueDate: '2026-06-05', amount: '₹37,00,000', status: 'Paid' },
      { milestone: 'Construction Linked Installment 1', dueDate: '2026-06-10', amount: '₹3.78 Cr', status: 'Paid' }
    ],
    dealStatus: 'Closed',
    soldDate: '2026-06-05T10:00:00Z',
    activities: [
      { id: 'act-1', title: 'Deal Marked Closed', timestamp: '2026-06-12T17:00:00Z', user: 'System', description: 'All payments verified, commission released.' },
      { id: 'act-2', title: 'Registration Completed', timestamp: '2026-06-10T11:30:00Z', user: 'Rohan (Agent)', description: 'Registry document generated: REG-KAR-8891-2026' },
      { id: 'act-3', title: 'Agreement Signed', timestamp: '2026-06-02T14:00:00Z', user: 'Rohan (Agent)', description: 'Agreement for Sale executed with buyer.' }
    ],
    documents: [
      { id: 'doc-1', name: 'Sale_Agreement_Signed.pdf', type: 'PDF', size: '4.2 MB', uploadedAt: '2026-06-02' },
      { id: 'doc-2', name: 'Registration_Receipt.pdf', type: 'PDF', size: '1.8 MB', uploadedAt: '2026-06-10' },
      { id: 'doc-3', name: 'KYC_Buyer_Documents.zip', type: 'ZIP', size: '8.5 MB', uploadedAt: '2026-06-01' }
    ]
  },
  {
    id: 'SLD-2026-002',
    bookingId: 'BKG-9922',
    projectName: 'Zenith Towers',
    tower: 'Tower B',
    floor: 21,
    unitNumber: 'B-2101',
    buyerName: 'Ananya Singh',
    buyerPhone: '+91 91234 56789',
    buyerEmail: 'ananya.s@outlook.com',
    buyerPAN: 'XYZWY9876G',
    buyerAadhaar: '9876 5432 1098',
    buyerAddress: 'Villa 14, Green Meadows, Whitefield, Bengaluru',
    buyerOccupation: 'Director, Product Management',
    coApplicant: null,
    saleValue: '₹4.3 Cr',
    saleValueRaw: 43000000,
    commissionPercentage: 2.2,
    commissionValue: '₹9.46 L',
    commissionValueRaw: 946000,
    commissionStatus: 'Processing',
    commissionExpectedDate: '2026-07-15',
    commissionReleasedDate: null,
    registrationStatus: 'Agreement Signed',
    agreementDate: '2026-06-08',
    registrationDate: null,
    registryNumber: null,
    possessionDate: '2026-12-01',
    paymentStatus: 'Partially Paid',
    tokenAmount: '₹2,00,000',
    bookingAmount: '₹43,00,000',
    paidAmount: '₹45,00,000',
    pendingAmount: '₹3.85 Cr',
    paymentMode: 'Bank Transfer (ICICI)',
    paymentSchedule: [
      { milestone: 'Token Amount', dueDate: '2026-06-03', amount: '₹2,00,000', status: 'Paid' },
      { milestone: 'Booking Amount (10%)', dueDate: '2026-06-08', amount: '₹43,00,000', status: 'Paid' },
      { milestone: 'Registry Milestone (40%)', dueDate: '2026-07-05', amount: '₹1.72 Cr', status: 'Pending' }
    ],
    dealStatus: 'Active',
    soldDate: '2026-06-04T14:30:00Z',
    activities: [
      { id: 'act-1', title: 'Agreement Signed', timestamp: '2026-06-08T15:00:00Z', user: 'Rohan (Agent)', description: 'Agreement copy uploaded.' },
      { id: 'act-2', title: 'Booking Amount Received', timestamp: '2026-06-08T11:00:00Z', user: 'Finance Bot', description: '₹43,00,000 credited & verified.' }
    ],
    documents: [
      { id: 'doc-1', name: 'Draft_Agreement_Approved.pdf', type: 'PDF', size: '3.1 MB', uploadedAt: '2026-06-06' },
      { id: 'doc-2', name: 'Booking_Receipt.pdf', type: 'PDF', size: '1.2 MB', uploadedAt: '2026-06-08' }
    ]
  },
  {
    id: 'SLD-2026-003',
    bookingId: 'BKG-8830',
    projectName: 'Oasis Greens',
    tower: 'Tower C',
    floor: 8,
    unitNumber: 'C-805',
    buyerName: 'Rajesh Kumar',
    buyerPhone: '+91 99887 76655',
    buyerEmail: 'rajesh.kumar@yahoo.com',
    buyerPAN: 'JKLMN4321P',
    buyerAadhaar: '5678 1234 9012',
    buyerAddress: 'Apt 805, Oasis Greens Tower C, Sarjapur Road, Bengaluru',
    buyerOccupation: 'Business Owner (Retail)',
    coApplicant: {
      name: 'Sunita Kumar',
      relationship: 'Spouse',
      pan: 'OPQRS8765T'
    },
    saleValue: '₹2.8 Cr',
    saleValueRaw: 28000000,
    commissionPercentage: 2.0,
    commissionValue: '₹5.6 L',
    commissionValueRaw: 560000,
    commissionStatus: 'Released',
    commissionExpectedDate: '2026-06-15',
    commissionReleasedDate: '2026-06-14',
    registrationStatus: 'Possession Handed Over',
    agreementDate: '2026-05-01',
    registrationDate: '2026-05-18',
    registryNumber: 'REG-KAR-7711-2026',
    possessionDate: '2026-05-20',
    paymentStatus: 'Fully Paid',
    tokenAmount: '₹5,00,000',
    bookingAmount: '₹28,00,000',
    paidAmount: '₹2.8 Cr',
    pendingAmount: '₹0',
    paymentMode: 'Net Banking (SBI)',
    paymentSchedule: [
      { milestone: 'Token Amount', dueDate: '2026-04-25', amount: '₹5,00,000', status: 'Paid' },
      { milestone: 'Booking Amount (10%)', dueDate: '2026-05-01', amount: '₹23,00,000', status: 'Paid' },
      { milestone: 'Final Settlement (90%)', dueDate: '2026-05-15', amount: '₹2.52 Cr', status: 'Paid' }
    ],
    dealStatus: 'Closed',
    soldDate: '2026-05-20T09:00:00Z',
    activities: [
      { id: 'act-1', title: 'Keys Handed Over', timestamp: '2026-05-20T10:00:00Z', user: 'Rohan (Agent)', description: 'Possession checklist completed and keys delivered.' },
      { id: 'act-2', title: 'Possession Certified', timestamp: '2026-05-19T16:00:00Z', user: 'Quality Assurance', description: 'Unit QA passed, handover ready.' }
    ],
    documents: [
      { id: 'doc-1', name: 'Possession_Certificate.pdf', type: 'PDF', size: '1.5 MB', uploadedAt: '2026-05-19' },
      { id: 'doc-2', name: 'Registry_Copy_Final.pdf', type: 'PDF', size: '5.6 MB', uploadedAt: '2026-05-18' }
    ]
  },
  {
    id: 'SLD-2026-004',
    bookingId: 'BKG-7712',
    projectName: 'Zenith Towers',
    tower: 'Tower B',
    floor: 22,
    unitNumber: 'B-2201',
    buyerName: 'Neha Kapoor',
    buyerPhone: '+91 98866 55443',
    buyerEmail: 'neha.k@fashion.in',
    buyerPAN: 'DFGHI6789L',
    buyerAadhaar: '2345 6789 0123',
    buyerAddress: 'Penthouse B, Zenith Towers, Outer Ring Road, Bengaluru',
    buyerOccupation: 'Fashion Designer',
    coApplicant: null,
    saleValue: '₹4.3 Cr',
    saleValueRaw: 43000000,
    commissionPercentage: 2.5,
    commissionValue: '₹10.75 L',
    commissionValueRaw: 1075000,
    commissionStatus: 'Released',
    commissionExpectedDate: '2026-05-10',
    commissionReleasedDate: '2026-05-08',
    registrationStatus: 'Registered',
    agreementDate: '2026-04-10',
    registrationDate: '2026-04-15',
    registryNumber: 'REG-KAR-6611-2026',
    possessionDate: '2026-07-01',
    paymentStatus: 'Fully Paid',
    tokenAmount: '₹10,00,000',
    bookingAmount: '₹43,00,000',
    paidAmount: '₹4.3 Cr',
    pendingAmount: '₹0',
    paymentMode: 'Net Banking (HDFC)',
    paymentSchedule: [
      { milestone: 'Token Amount', dueDate: '2026-04-05', amount: '₹10,00,000', status: 'Paid' },
      { milestone: 'Full Value Payment', dueDate: '2026-04-12', amount: '₹4.2 Cr', status: 'Paid' }
    ],
    dealStatus: 'Closed',
    soldDate: '2026-04-15T10:30:00Z',
    activities: [
      { id: 'act-1', title: 'Commission Credited', timestamp: '2026-05-08T12:00:00Z', user: 'Finance Dept', description: '₹10,75,000 paid to agent wallet.' }
    ],
    documents: [
      { id: 'doc-1', name: 'Registry_Challan_Paid.pdf', type: 'PDF', size: '2.0 MB', uploadedAt: '2026-04-14' }
    ]
  }
];

export const mockProjectPerformance = [
  { name: 'Skyline Residences', volume: '₹16.8 Cr', deals: 4, absorption: '94%', growth: '+12%' },
  { name: 'Zenith Towers', volume: '₹12.9 Cr', deals: 3, absorption: '88%', growth: '+8%' },
  { name: 'Oasis Greens', volume: '₹8.4 Cr', deals: 3, absorption: '82%', growth: '+15%' },
  { name: 'Prestige Lakeside', volume: '₹5.5 Cr', deals: 2, absorption: '78%', growth: '+4%' }
];

export const mockBuilderPerformance = [
  { name: 'Skyline Developers', volume: '₹16.8 Cr', deals: 4, rating: '4.8', projects: 2 },
  { name: 'Zenith Group', volume: '₹12.9 Cr', deals: 3, rating: '4.6', projects: 1 },
  { name: 'Greenwood Estates', volume: '₹8.4 Cr', deals: 3, rating: '4.7', projects: 2 },
  { name: 'Prestige Group', volume: '₹5.5 Cr', deals: 2, rating: '4.9', projects: 1 }
];

export const mockSoldAnalytics = {
  totalSalesValue: '₹43.6 Cr',
  avgDealSize: '₹3.35 Cr',
  conversionRate: '88.5%',
  monthlyTrend: [
    { month: 'Jan', sales: 4, revenue: 12.5 },
    { month: 'Feb', sales: 3, revenue: 9.8 },
    { month: 'Mar', sales: 5, revenue: 15.2 },
    { month: 'Apr', sales: 6, revenue: 18.4 },
    { month: 'May', sales: 7, revenue: 21.0 },
    { month: 'Jun', sales: 8, revenue: 24.5 }
  ],
  insights: [
    { title: 'Shorter Hold Cycles', text: 'Avg hold to sold cycle reduced by 4.2 days this quarter.' },
    { title: 'High Ticket Velocity', text: '3BHK+ units in Whitefield are selling 25% faster than 2BHKs.' },
    { title: 'Builder Commission Release', text: 'Skyline Developers has released commissions within an average of 7 days post registry.' }
  ]
};
