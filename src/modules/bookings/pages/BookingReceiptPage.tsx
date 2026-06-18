import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Share2, IndianRupee, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockBookingReceipts, mockBookings } from '../constants/mockData';

function fmtINR(num: number) {
  if (num < 0) return `−₹${Math.abs(num).toLocaleString('en-IN')}`;
  return `₹${num.toLocaleString('en-IN')}`;
}

function fmtCr(num: number) {
  if (Math.abs(num) >= 10000000) return `₹${(Math.abs(num) / 10000000).toFixed(2)} Cr`;
  return fmtINR(num);
}

export default function BookingReceiptPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const booking = mockBookings.find((b) => b.id === id) || mockBookings[0];
  const receipt = mockBookingReceipts[booking.id] || mockBookingReceipts['B-001'];

  const generatedDate = new Date(receipt.generatedAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="flex flex-col h-full bg-background">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="font-bold text-sm text-foreground font-headings">Booking Receipt</h1>
          <button className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">

        {/* Receipt Card */}
        <Card className="rounded-card border-none shadow-lg bg-card overflow-hidden">

          {/* Receipt Header */}
          <div className="bg-[#0F2E2A] p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-base font-headings">Hunt Inventory</p>
                <p className="text-white/60 text-xs">Real Estate Booking Platform</p>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-[10px] uppercase font-semibold tracking-wider">Receipt Number</p>
                <p className="text-white font-bold font-mono text-sm mt-0.5">{receipt.receiptNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-[10px] uppercase font-semibold tracking-wider">Date</p>
                <p className="text-white text-sm font-semibold mt-0.5">{generatedDate}</p>
              </div>
            </div>
          </div>

          {/* Booking info */}
          <div className="p-4 border-b border-border/40 bg-secondary/30">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Buyer</p>
                <p className="text-sm font-bold text-foreground mt-0.5">{receipt.buyerName}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Booking No.</p>
                <p className="text-sm font-bold font-mono text-foreground mt-0.5">{receipt.bookingNumber}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Unit</p>
                <p className="text-sm font-bold text-foreground mt-0.5">{receipt.unitNumber}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Project</p>
                <p className="text-sm font-bold text-foreground mt-0.5">{receipt.projectName}</p>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="p-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Cost Breakdown</p>
            <div className="space-y-0">
              {receipt.lineItems.map((item, i) => {
                const isTotal = item.type === 'total';
                const isSubtotal = item.type === 'subtotal';
                const isCredit = item.type === 'credit';
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-2.5 ${
                      i > 0 ? 'border-t border-border/40' : ''
                    } ${isTotal ? 'bg-primary/5 px-3 -mx-3 rounded-xl border-t-0 mt-1' : ''}
                    ${isSubtotal ? 'bg-secondary/40 px-3 -mx-3 rounded-xl border-t-0 mt-1' : ''}`}
                  >
                    <span className={`text-sm ${isTotal ? 'font-bold text-foreground' : isSubtotal ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                      {item.label}
                    </span>
                    <span className={`text-sm font-bold ${
                      isTotal ? 'text-primary text-base' :
                      isCredit ? 'text-primary' :
                      isSubtotal ? 'text-foreground' :
                      'text-foreground'
                    }`}>
                      {fmtINR(item.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Net Payable Hero */}
          <div className="mx-4 mb-4 p-4 bg-primary rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">Total Net Payable</p>
                <p className="text-white/70 text-[10px] mt-0.5">Balance due to builder</p>
              </div>
              <p className="text-white text-2xl font-bold font-headings">{fmtCr(receipt.totalNetPayable)}</p>
            </div>
          </div>

          {/* Payment info */}
          <div className="px-4 pb-4 pt-0 space-y-2">
            <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-xl">
              <p className="text-xs text-muted-foreground">Payment Mode</p>
              <p className="text-xs font-bold text-foreground">{receipt.paymentMode}</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-xl">
              <p className="text-xs text-muted-foreground">Reference No.</p>
              <p className="text-xs font-bold font-mono text-foreground">{receipt.paymentReference}</p>
            </div>
          </div>

          {/* QR / stamp area */}
          <div className="mx-4 mb-4 p-4 border border-border/50 rounded-2xl flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-secondary/60 flex items-center justify-center shrink-0">
              <div className="grid grid-cols-3 gap-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-sm ${[0,1,3,4,5,8].includes(i) ? 'bg-foreground/70' : 'bg-transparent'}`} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Scan to verify</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                Scan this QR to verify the authenticity of this booking receipt.
              </p>
            </div>
          </div>

          {/* Verification badge */}
          <div className="mx-4 mb-4 flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-primary">Digitally verified</span> receipt generated by Hunt Inventory platform.
            </p>
          </div>
        </Card>
      </div>

      {/* CTAs */}
      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50 space-y-2">
        <Button className="w-full h-12 rounded-button font-bold gap-2">
          <Download className="w-4 h-4" /> Download PDF Receipt
        </Button>
        <Button variant="outline" className="w-full h-11 rounded-button font-semibold gap-2">
          <Share2 className="w-4 h-4" /> Share Receipt
        </Button>
      </div>
    </div>
  );
}
