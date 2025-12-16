import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Calendar, MapPin, Mail, Phone, User, Building, CheckCircle, Clock, DollarSign, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Attendee } from "@/lib/api";
import kaisanLogo from "@/assets/kaisan-logo.png";
import tagTemplate from "@/assets/TAG_Template.jpg";
import DownloadTicket from "@/components/DownloadTicket";
import { toast } from "sonner";

const Ticket = () => {
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("attendee");
    if (!stored) {
      navigate("/ticket-access");
      return;
    }
    const parsedAttendee = JSON.parse(stored);
    // Map fields explicitly to match Attendee type
    const capitalizedAttendee: Attendee = {
      fullName: parsedAttendee.fullName?.toUpperCase() || "",
      email: parsedAttendee.email?.toUpperCase() || "",
      contactNumber: parsedAttendee.contactNumber?.toUpperCase() || "",
      business: parsedAttendee.business?.toUpperCase() || "",
      designation: parsedAttendee.designation?.toUpperCase() || "",
      qrCode: parsedAttendee.qrCode?.toUpperCase() || "",
      registrationDate: parsedAttendee.registrationDate || new Date().toISOString(),
      paymentStatus: (parsedAttendee.paymentStatus ?? "pending"),
      attended: parsedAttendee.attended || false,
      checkInTime: parsedAttendee.checkInTime || null,
      dateOfBirth: parsedAttendee.dateOfBirth || "N/A", // Default value added
    };
    setAttendee(capitalizedAttendee);
  }, [navigate]);

  if (!attendee) return null;

  const handleNeedHelp = () => {
    const phoneNumber = "+918589990060";
    const message = encodeURIComponent("Hello, I need assistance with my registration.");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  const handlePayNow = () => {
    const phoneNumber = "+918589990060";
    const message = encodeURIComponent("Hello, I would like to complete my payment for the event.");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6 sm:py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors print:hidden">
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK TO HOME
        </Link>

        <div id="epass-container" className="glass-panel overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b-2 border-primary/20 p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              {/* Logo and Title Section */}
              <div className="flex items-center gap-3 sm:gap-4">
                <img src={kaisanLogo} alt="KAISAN ASSOCIATES" className="h-12 sm:h-16 md:h-20 object-contain flex-shrink-0" />
                <div className="border-l-2 border-primary/30 pl-3 sm:pl-4 min-w-0">
                  <h1 className="text-xl sm:text-3xl md:text-4xl font-bold gradient-text tracking-tight uppercase break-words leading-tight">INFLUENCIA</h1>
                  <p className="text-[10px] sm:text-sm md:text-base text-muted-foreground font-medium uppercase mt-0.5">EDITION 2.0 • 2025</p>
                </div>
              </div>
              
              {/* Status Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase self-start ${
                  attendee.attended 
                    ? 'bg-green-500/20 text-green-700 border border-green-500/30' 
                    : attendee.paymentStatus === 'confirmed'
                    ? 'bg-blue-500/20 text-blue-700 border border-blue-500/30'
                    : 'bg-yellow-500/20 text-yellow-700 border border-yellow-500/30'
                }`}>
                  {attendee.attended ? (
                    <><CheckCircle className="w-4 h-4" /> CHECKED IN</>
                  ) : attendee.paymentStatus === 'confirmed' ? (
                    <><CheckCircle className="w-4 h-4" /> CONFIRMED</>
                  ) : (
                    <><Clock className="w-4 h-4" /> PENDING</>
                  )}
                </div>
                <p className="text-xs text-muted-foreground uppercase">E-PASS #{attendee.qrCode.slice(-8).toUpperCase()}</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Payment encouragement card (shows only when payment is pending) */}
            {attendee.paymentStatus !== 'confirmed' && (
              <div className="mb-6 md:mb-8 rounded-xl border border-yellow-300/60 bg-yellow-50 p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-yellow-200 p-2 text-yellow-700">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase text-yellow-800">Payment Pending — Complete to Confirm Your Seat</h3>
                      <p className="text-xs text-yellow-700/90 mt-1">
                        Finish your payment now to unlock fast entry, priority seating, and bonus resources.
                      </p>
                      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 text-[11px] text-yellow-800/90">
                        <li className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> Guaranteed seat</li>
                        <li className="inline-flex items-center gap-2"><Zap className="w-3.5 h-3.5" /> Fast-track entry</li>
                        <li className="inline-flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5" /> Bonus resources</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Button onClick={() => window.location.href = 'upi://pay?ver=01&mode=01&pa=c0j9uodoggyh@idbi&pn=KAISAN%20ASSOCIATES%20LLP&mc=5816&qrMedium=06&am=3999&cu=INR'} className="w-full sm:w-auto h-11 px-6 font-semibold uppercase bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-full text-sm">
                        <DollarSign className="w-4 h-4 mr-2" /> Pay Now
                      </Button>
                      <Button onClick={handleNeedHelp} variant="outline" className="w-full sm:w-auto h-11 px-4 rounded-full uppercase text-sm">
                        Need Help
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="grid lg:grid-cols-[1.6fr,1fr] gap-8 md:gap-10">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">ATTENDEE INFORMATION</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight uppercase">{attendee.fullName}</h2>
                  <div className="flex items-center gap-2 text-base md:text-lg text-primary font-medium uppercase">
                    <Building className="w-5 h-5" />
                    <span>{attendee.designation || 'ATTENDEE'}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground uppercase">{attendee.business}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50">
                    <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">EMAIL</p>
                      <p className="text-sm font-medium break-all uppercase">{attendee.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50">
                    <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">PHONE</p>
                      <p className="text-sm font-medium uppercase">{attendee.contactNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50">
                    <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">EVENT DATE</p>
                      <p className="text-sm font-medium uppercase">20 DECEMBER 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">VENUE</p>
                      <p className="text-sm font-medium uppercase">NILGIRI COLLEGE OF ARTS AND SCIENCE</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4 py-2 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground uppercase">REGISTERED</span>
                    <span className="text-xs sm:text-sm font-semibold uppercase text-right">{new Date(attendee.registrationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground uppercase">PAYMENT</span>
                    <span className={`text-xs sm:text-sm font-semibold uppercase ${
                      attendee.paymentStatus === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {attendee.paymentStatus === 'confirmed' ? '✓ CONFIRMED' : '⏳ PENDING'}
                    </span>
                  </div>
                  {attendee.attended && attendee.checkInTime && (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs sm:text-sm text-muted-foreground uppercase">CHECKED IN</span>
                      <span className="text-xs sm:text-sm font-semibold text-green-600 uppercase text-right">
                        {new Date(attendee.checkInTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center row-start-1 lg:row-auto">
                <div className="relative w-full max-w-[350px] aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    id="ticket-template-img" 
                    src={tagTemplate} 
                    alt="Ticket Template" 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto mt-12">
                    <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full"></div>
                    <div className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-2xl border-4 border-primary/20">
                      <QRCodeSVG
                        id="qr-svg"
                        value={attendee.qrCode}
                        level="H"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <div className="mt-6 text-center space-y-2">
                    <p className="text-sm font-semibold text-foreground uppercase">SCAN FOR ENTRY</p>
                    <p className="text-xs text-muted-foreground max-w-xs uppercase">
                      PRESENT THIS QR CODE AT THE VENUE ENTRANCE FOR INSTANT VERIFICATION
                    </p>
                    <div className="inline-block px-3 py-1 bg-muted rounded text-xs font-mono text-muted-foreground mt-2 uppercase">{attendee.qrCode}</div>
                  </div>
                </div>
                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm font-semibold text-foreground uppercase">SCAN FOR ENTRY</p>
                  <p className="text-xs text-muted-foreground max-w-xs uppercase">
                    PRESENT THIS QR CODE AT THE VENUE ENTRANCE FOR INSTANT VERIFICATION
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-10 pt-8 border-t border-border">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 sm:p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2 uppercase">
                  <User className="w-4 h-4" />
                  IMPORTANT INSTRUCTIONS
                </h3>
                <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside uppercase">
                  <li>THIS E-PASS IS VALID FOR ONE PERSON ONLY AND NON-TRANSFERABLE</li>
                  <li>PLEASE CARRY A VALID PHOTO ID ALONG WITH THIS E-PASS</li>
                  <li>ENTRY WILL BE ALLOWED ONLY AFTER QR CODE VERIFICATION</li>
                  <li>PLEASE ARRIVE 30 MINUTES BEFORE THE EVENT STARTS</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 border-t border-border px-4 sm:px-8 py-4 sm:py-6 text-center">
            <p className="text-xs text-muted-foreground uppercase">
              © 2025 KAISAN ASSOCIATES. ALL RIGHTS RESERVED. | FOR SUPPORT: INFO@KAISANASSOCIATES.COM
            </p>
          </div>

          <div className="p-4 sm:p-6 text-center print:hidden border-t border-border">
            <DownloadTicket attendee={attendee} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
