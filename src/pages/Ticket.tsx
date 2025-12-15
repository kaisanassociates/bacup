import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Attendee } from "@/lib/api";
import kaisanLogo from "@/assets/kaisan-logo.png";

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
      dateOfBirth: parsedAttendee.dateOfBirth || "N/A",
    };
    setAttendee(capitalizedAttendee);
  }, [navigate]);

  if (!attendee) return null;

  const handleDownload = () => {
    const qrSvgEl = document.querySelector('#qr-svg') as SVGElement | null;
    let qrDataUrl = '';
    if (qrSvgEl) {
      try {
        const svgMarkup = new XMLSerializer().serializeToString(qrSvgEl);
        qrDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgMarkup);
      } catch (e) {
        qrDataUrl = '';
      }
    }

    const html = \`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>E-PASS | INFLUENCIA</title>
          <style>
            @page { size: A4 portrait; margin: 0; }
            body { margin: 0; padding: 0; font-family: sans-serif; background: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; }
            .ticket-container { width: 100%; max-width: 210mm; height: 297mm; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; }
            .ticket { 
                width: 400px; 
                height: 600px; 
                background: linear-gradient(180deg, #a00000 0%, #600000 100%); 
                border-radius: 20px; 
                overflow: hidden; 
                display: flex; 
                flex-direction: column; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                position: relative;
            }
            .top-section { flex: 1; padding: 40px 30px; display: flex; flex-direction: column; align-items: center; text-align: center; color: white; }
            .logo { height: 40px; margin-bottom: 30px; filter: brightness(0) invert(1); }
            .presenter { font-size: 18px; font-weight: 500; margin-bottom: 10px; }
            .title { font-size: 56px; font-weight: 900; line-height: 1; margin-bottom: 10px; letter-spacing: -2px; font-family: 'Arial Black', sans-serif; text-transform: uppercase; }
            .edition { font-size: 24px; font-weight: 700; letter-spacing: 5px; margin-bottom: 30px; text-transform: uppercase; }
            .description { font-size: 14px; line-height: 1.5; margin-bottom: 40px; opacity: 0.9; max-width: 280px; }
            .date { font-size: 24px; font-weight: 600; margin-top: auto; }
            .bottom-section { background: white; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; height: 120px; }
            .designation { font-size: 36px; font-weight: 800; color: #900000; text-transform: uppercase; }
            .qr-code { width: 80px; height: 80px; }
            .qr-code img { width: 100%; height: 100%; }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            <div class="ticket">
                <div class="top-section">
                    <img src="\${(document.querySelector('img[alt="KAISAN ASSOCIATES"]') as HTMLImageElement)?.src || ''}" class="logo" />
                    <div class="presenter">Dr. Rashid Gazzali's</div>
                    <div class="title">INFLUENCIA</div>
                    <div class="edition">EDITION 2</div>
                    <div class="description">7-Hour Programming Workshop to Elevate Personal Life, Maintain Relationships and Professional Excellence for 250 Change Makers</div>
                    <div class="date">20 December 2025</div>
                </div>
                <div class="bottom-section">
                    <div class="designation">\${attendee.designation || 'DELEGATE'}</div>
                    <div class="qr-code">
                      \${qrDataUrl ? '<img src="' + qrDataUrl + '" />' : ''}
                    </div>
                </div>
            </div>
          </div>
        </body>
      </html>\`;

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

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative">
        <Link to="/" className="absolute top-8 left-8 text-white/50 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="w-full max-w-[400px] aspect-[2/3] bg-gradient-to-b from-[#a00000] to-[#600000] rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
            <div className="flex-1 p-8 flex flex-col items-center text-center text-white relative">
                <img src={kaisanLogo} alt="KAISAN ASSOCIATES" className="h-10 mb-8 brightness-0 invert opacity-90" />
                
                <p className="text-lg font-medium mb-2 opacity-90">Dr. Rashid Gazzali's</p>
                <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-2 uppercase leading-none">INFLUENCIA</h1>
                <h2 className="text-xl sm:text-2xl font-bold tracking-[0.2em] mb-8 uppercase">EDITION 2</h2>
                
                <p className="text-sm leading-relaxed opacity-80 max-w-[280px] mx-auto font-medium">
                    7-Hour Programming Workshop to Elevate Personal Life, Maintain Relationships and Professional Excellence for 250 Change Makers
                </p>
                
                <div className="mt-auto pt-8">
                    <p className="text-2xl font-semibold">20 December 2025</p>
                </div>
            </div>

            <div className="bg-white h-32 px-8 flex items-center justify-between shrink-0">
                <h3 className="text-4xl font-black text-[#900000] uppercase tracking-tight">
                    {attendee.designation || 'DELEGATE'}
                </h3>
                <div className="bg-white p-1 rounded-lg">
                    <QRCodeSVG 
                        id="qr-svg"
                        value={attendee.qrCode} 
                        size={80}
                        level="H"
                    />
                </div>
            </div>
        </div>

        <div className="mt-8 flex gap-4">
            <Button onClick={handleDownload} className="bg-white text-black hover:bg-white/90">
                <Download className="w-4 h-4 mr-2" /> Download Ticket
            </Button>
        </div>
    </div>
  );
};

export default Ticket;
