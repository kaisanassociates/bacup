import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Download, ArrowLeft, Calendar, MapPin, Mail, Phone, User, Building, CheckCircle, Clock, DollarSign, ShieldCheck, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Attendee } from "@/lib/api";
import kaisanLogo from "@/assets/kaisan-logo.png";
import tagTemplate from "@/assets/TAG_Template.jpg";
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

  const handleDownload = () => {
    const qrSvgEl = document.querySelector('#qr-svg') as SVGElement | null;
    const templateImgEl = document.querySelector('#ticket-template-img') as HTMLImageElement | null;
    let qrDataUrl = '';
    if (qrSvgEl) {
      try {
        const svgMarkup = new XMLSerializer().serializeToString(qrSvgEl);
        qrDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgMarkup);
      } catch (e) {
        qrDataUrl = '';
      }
    }
    const templateSrc = templateImgEl?.src || '';

    const html = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>INFLUENCIA - EDITION 2</title>
          <style>
            @page { size: A4 portrait; margin: 0; }
            * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            body { 
              margin: 0; 
              padding: 0; 
              font-family: 'Arial', 'Helvetica', sans-serif; 
              background: #fff; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh;
            }
            .ticket-container { 
              width: 100%; 
              max-width: 210mm; 
              height: 297mm; 
              background: #fff; 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center; 
            }
            .ticket { 
              position: relative;
              width: 400px; 
              height: 600px; 
              border-radius: 20px; 
              overflow: hidden; 
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .ticket-bg {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              z-index: 0;
            }
            .ticket-content {
              position: relative;
              z-index: 1;
              width: 100%;
              height: 100%;
            }
            .name-section {
              position: absolute;
              top: 58%;
              width: 100%;
              text-align: center;
              color: white;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .pending-pill {
              position: absolute;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 6px 16px;
              border-radius: 50px;
              background: rgba(220, 38, 38, 0.3);
              border: 1px solid rgba(254, 202, 202, 0.3);
              backdrop-filter: blur(4px);
              -webkit-backdrop-filter: blur(4px);
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
            }
            .pending-text {
              color: #fee2e2;
              font-size: 10px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .qr-section {
              position: absolute;
              bottom: 12%;
              right: 8%;
              background: white;
              padding: 8px;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }
            .info-section {
              position: absolute;
              bottom: 5%;
              width: 100%;
              text-align: center;
              color: rgba(255,255,255,0.8);
              font-size: 10px;
              font-family: monospace;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            <div class="ticket">
              <img src="${templateSrc}" class="ticket-bg" />
              <div class="ticket-content">
                ${attendee.paymentStatus !== 'confirmed' ? `
                    <div class="pending-pill">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fee2e2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                        <path d="M12 9v4"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span class="pending-text">Payment Pending</span>
                    </div>
                  ` : ''}
                <div class="name-section">
                  <h1 style="margin:0; font-size: 26px; text-transform: uppercase; font-weight: 800;">${attendee.fullName}</h1>
                  <p style="margin:4px 0 0; font-size: 14px; opacity: 0.9; font-weight: 600;">ID: ${attendee.qrCode}</p>
                  <p style="margin:2px 0 0; font-size: 16px; opacity: 0.9; font-weight: 600;">${attendee.designation || 'DELEGATE'}</p>
                </div>
                <div class="qr-section">
                  ${qrDataUrl ? '<img src="' + qrDataUrl + '" style="width: 120px; height: 120px; display: block;" />' : ''}
                </div>
                <div class="info-section">
                  <p style="margin: 2px 0;">STATUS: ${attendee.paymentStatus.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const win = window.open('', '_blank', 'width=900,height=1000');
    if (win) {
      win.document.open();
      win.document.write(html);
      win.document.close();
      setTimeout(() => {
        win.focus();
        win.print();
        setTimeout(() => win.close(), 800);
      }, 300);
    }
  };

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
                  <div className="relative z-10 h-full w-full">
                    {attendee.paymentStatus !== 'confirmed' && (
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/30 backdrop-blur-md border border-red-200/30 shadow-lg z-20">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-50" strokeWidth={3} />
                        <span className="text-[10px] sm:text-[11px] font-bold text-red-50 uppercase tracking-widest">Payment Pending</span>
                      </div>
                    )}

                    <div className="absolute top-[58%] w-full px-6 text-center">
                      <h2 className="text-2xl sm:text-3xl font-black text-white uppercase drop-shadow-lg leading-tight">{attendee.fullName}</h2>
                      
                      <p className="text-xs sm:text-sm text-white/90 font-bold uppercase tracking-wider mt-1 drop-shadow-md">ID: {attendee.qrCode}</p>
                      <p className="text-sm sm:text-base text-white/90 font-bold uppercase tracking-wider mt-1 drop-shadow-md">{attendee.designation || 'DELEGATE'}</p>
                    </div>

                    <div className="absolute bottom-[12%] right-[8%] bg-white p-2 rounded-xl shadow-xl">
                      <QRCodeSVG
                        id="qr-svg"
                        value={attendee.qrCode}
                        size={120}
                        level="H"
                        className="w-28 h-28 sm:w-32 sm:h-32"
                      />
                    </div>
                    
                    <div className="absolute bottom-4 w-full text-center text-white/70 text-[10px] font-mono uppercase tracking-widest">
                      <p>ID: {attendee.qrCode}</p>
                      <p>STATUS: {attendee.paymentStatus}</p>
                    </div>
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
            <Button onClick={handleDownload} size="lg" className="w-full sm:w-auto h-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base uppercase">
              <Download className="w-5 h-5 mr-2" />
              DOWNLOAD / PRINT E-PASS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
