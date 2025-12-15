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
    let qrDataUrl = '';
    if (qrSvgEl) {
      try {
        const svgMarkup = new XMLSerializer().serializeToString(qrSvgEl);
        qrDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgMarkup);
      } catch (e) {
        qrDataUrl = '';
      }
    }

    const html = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>E-PASS | INFLUENCIA</title>
          <style>
            @page { size: A4 portrait; margin: 0; }
            * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .ticket-container { width: 100%; max-width: 210mm; height: 297mm; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20mm; }
            .ticket { 
              width: 400px; 
              height: 600px; 
              background: linear-gradient(180deg, #a00000 0%, #600000 100%); 
              border-radius: 20px; 
              overflow: hidden; 
              display: flex; 
              flex-direction: column; 
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .top-section { 
              flex: 1; 
              padding: 30px 25px; 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              text-align: center; 
              color: white;
              justify-content: flex-start;
            }
            .logo { 
              height: 35px; 
              margin-bottom: 20px; 
              filter: brightness(0) invert(1); 
            }
            .presenter { 
              font-size: 16px; 
              font-weight: 500; 
              margin-bottom: 8px; 
            }
            .title { 
              font-size: 52px; 
              font-weight: 900; 
              line-height: 0.9; 
              margin-bottom: 8px; 
              letter-spacing: -1px; 
              font-family: 'Arial Black', sans-serif; 
              text-transform: uppercase; 
            }
            .edition { 
              font-size: 20px; 
              font-weight: 700; 
              letter-spacing: 4px; 
              margin-bottom: 20px; 
              text-transform: uppercase; 
            }
            .description { 
              font-size: 12px; 
              line-height: 1.4; 
              margin-bottom: 20px; 
              opacity: 0.95; 
              max-width: 280px; 
            }
            .date { 
              font-size: 18px; 
              font-weight: 600; 
              margin-bottom: 15px;
            }
            .name { 
              font-size: 28px; 
              font-weight: 800; 
              color: #000; 
              text-transform: uppercase;
              margin: 0;
            }
            .bottom-section { 
              background: white; 
              padding: 18px 25px; 
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              height: 110px; 
            }
            .designation { 
              font-size: 32px; 
              font-weight: 900; 
              color: #900000; 
              text-transform: uppercase; 
              letter-spacing: -0.5px;
            }
            .qr-code { 
              width: 70px; 
              height: 70px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
              border: 2px solid #ddd;
            }
            .qr-code img { 
              width: 100%; 
              height: 100%; 
            }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            <div class="ticket">
              <div class="top-section">
                <img src="${(document.querySelector('img[alt="KAISAN ASSOCIATES"]') as HTMLImageElement)?.src || ''}" class="logo" alt="KAISAN" />
                <div class="presenter">Dr. Rashid Gazzali's</div>
                <div class="title">INFLUENCIA</div>
                <div class="edition">EDITION 2</div>
                <div class="description">7-Hour Programming Workshop to Elevate Personal Life, Maintain Relationships and Professional Excellence for 250 Change Makers</div>
                <div class="date">20 December 2025</div>
                <div class="name">${attendee.fullName}</div>
              </div>
              <div class="bottom-section">
                <div class="designation">${attendee.designation || 'DELEGATE'}</div>
                <div class="qr-code">${qrDataUrl ? '<img src="' + qrDataUrl + '" alt="QR" />' : '<div style="width:70px;height:70px;"></div>'}</div>
              </div>
            </div>
          </div>
        </body>
      </html>`;

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

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative">
      <Link to="/" className="absolute top-8 left-8 text-white/50 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="w-full max-w-[400px] bg-gradient-to-b from-[#a00000] to-[#600000] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex-1 p-6 flex flex-col items-center text-center text-white">
          <img src={kaisanLogo} alt="KAISAN ASSOCIATES" className="h-9 mb-5 brightness-0 invert" />
          
          <p className="text-sm font-medium mb-1 opacity-95">Dr. Rashid Gazzali's</p>
          <h1 className="text-5xl font-black tracking-tight mb-1 uppercase leading-none">INFLUENCIA</h1>
          <h2 className="text-lg font-bold tracking-[0.15em] mb-5 uppercase">EDITION 2</h2>
          
          <p className="text-xs leading-tight opacity-90 max-w-xs mx-auto font-medium mb-5">
            7-Hour Programming Workshop to Elevate Personal Life, Maintain Relationships and Professional Excellence for 250 Change Makers
          </p>
          
          <p className="text-base font-semibold mb-3">20 December 2025</p>
          <p className="text-2xl font-black text-black uppercase tracking-tight">{attendee.fullName}</p>
        </div>

        <div className="bg-white h-28 px-6 flex items-center justify-between shrink-0">
          <h3 className="text-3xl font-black text-[#900000] uppercase tracking-tighter">
            {attendee.designation || 'DELEGATE'}
          </h3>
          <div className="w-16 h-16 bg-white border-2 border-gray-300 flex items-center justify-center rounded">
            <QRCodeSVG 
              id="qr-svg"
              value={attendee.qrCode} 
              size={60}
              level="H"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={handleDownload} className="bg-white text-black hover:bg-white/90">
          <Download className="w-4 h-4 mr-2" /> Download Ticket
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
