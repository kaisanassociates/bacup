import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Attendee } from "@/lib/api";
import tagTemplate from "@/assets/TAG_Template.jpg";

interface DownloadTicketProps {
  attendee: Attendee;
  qrSvgElementId?: string;
}

export const DownloadTicket: React.FC<DownloadTicketProps> = ({
  attendee,
  qrSvgElementId = "qr-svg",
}) => {
  const handleDownload = () => {
    const qrSvgEl = document.querySelector(
      `#${qrSvgElementId}`
    ) as SVGElement | null;
    let qrDataUrl = "";

    if (qrSvgEl) {
      try {
        const svgMarkup = new XMLSerializer().serializeToString(qrSvgEl);
        qrDataUrl = "data:image/svg+xml;utf8," + encodeURIComponent(svgMarkup);
      } catch (e) {
        qrDataUrl = "";
      }
    }

    const templateSrc = tagTemplate;

    const html = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>INFLUENCIA - EDITION 2</title>
          <style>
            @page { size: A4 portrait; margin: 0; }
            * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            html, body { height: 100%; }
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
              width: 450px; 
              height: 600px; 
              border-radius: 24px; 
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
            .payment-pill {
              position: absolute;
              top: 16px;
              left: 50%;
              transform: translateX(-50%);
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 8px 16px;
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.15);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              z-index: 10;
            }
            .payment-icon {
              width: 16px;
              height: 16px;
              color: #ffffff;
              font-weight: bold;
            }
            .payment-text {
              color: #ffffff;
              font-size: 10px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 1.2px;
            }
            .name {
              position: absolute;
              left: 30px;
              right: 130px;
              top: 410px;
              text-align: center;
              color: #ffffff;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 0px;
              font-size: 28px;
              line-height: 1.2;
              text-shadow: none;
              word-break: break-word;
              overflow: visible;
              white-space: normal;
            }
            .attendee-id {
              position: absolute;
              left: 30px;
              right: 130px;
              top: 460px;
              text-align: center;
              color: #ffffff;
              font-size: 13px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              text-shadow: none;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .qr-box {
              position: absolute;
              right: 20px;
              bottom: 20px;
              width: 110px;
              height: 110px;
              background: #ffffff;
              border: none;
              border-radius: 0px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 4px;
              box-sizing: border-box;
            }
            .qr-box img {
              width: 100%;
              height: 100%;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            <div class="ticket">
              <img src="${templateSrc}" class="ticket-bg" />
              <div class="ticket-content">
                <div class="payment-pill">
                  <span class="payment-icon">⚠</span>
                  <span class="payment-text">${attendee.paymentStatus === "confirmed" ? "PAYMENT CONFIRMED" : "PAYMENT PENDING"}</span>
                </div>

                <div class="name">${attendee.fullName}</div>
                <div class="attendee-id">ID: ${attendee.qrCode}</div>

                <div class="qr-box">
                  ${qrDataUrl ? '<img src="' + qrDataUrl + '" alt="QR" />' : ""}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const win = window.open("", "_blank", "width=900,height=1000");
    if (win) {
      win.document.open();
      win.document.write(html);
      win.document.close();

      const tryPrint = () => {
        try {
          const images = Array.from(win.document.images);
          const allLoaded = images.every((img) => img.complete);
          if (!allLoaded) {
            setTimeout(tryPrint, 80);
            return;
          }
          win.focus();
          win.print();
          setTimeout(() => win.close(), 800);
        } catch {
          setTimeout(tryPrint, 120);
        }
      };

      setTimeout(tryPrint, 120);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      size="lg"
      className="w-full sm:w-auto h-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base uppercase"
    >
      <Download className="w-5 h-5 mr-2" />
      DOWNLOAD / PRINT E-PASS
    </Button>
  );
};

export default DownloadTicket;
