const { BrevoClient } = require('@getbrevo/brevo');

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

module.exports = async (newUser) => {

  const otp = String(Math.floor(100000 + Math.random() * 900000));

  await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: "Busly",
      email: process.env.SMTP_USER,
    },
    to: [
      {
        email: newUser.email,
        name: newUser.first_name || "عميلنا العزيز",
      }
    ],
    subject: "رمز التحقق الخاص بك - Busly",

    htmlContent: `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @media only screen and (max-width: 600px) {
      .inner-padding { padding: 30px 20px !important; }

      .otp-box {
        width: 220px !important;
        height: 55px !important;
        line-height: 55px !important;
        font-size: 22px !important;
      }
    }
  </style>
</head>

<body style="margin:0; padding:0; background-color:#0f172a; font-family:Tahoma, Arial, sans-serif; -webkit-font-smoothing:antialiased;">

  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#0f172a; padding:40px 10px;">
    <tr>
      <td align="center">

        <table width="100%" border="0" cellpadding="0" cellspacing="0"
          style="max-width:600px; background-color:#1e293b; border-radius:24px; overflow:hidden; box-shadow:0 20px 25px -5px rgba(0,0,0,0.3);">

          <!-- Header -->
          <tr>
            <td class="inner-padding" style="padding:40px 40px 20px 40px; text-align:right;">

              <table border="0" cellpadding="0" cellspacing="0" style="display:inline-table;">
                <tr>
                  <td style="background:linear-gradient(135deg,#6366f1 0%,#4f46e5 100%); padding:12px 25px; border-radius:12px;">
                    <span style="color:#ffffff; font-size:24px; font-weight:bold; display:block;">Busly</span>
                  </td>
                </tr>
              </table>

              <div style="margin-top:12px; color:#94a3b8; font-size:14px;">
                المنصة الرائدة لحجز الحافلات
              </div>

            </td>
          </tr>

          <!-- Welcome -->
          <tr>
            <td class="inner-padding" style="padding:20px 40px; text-align:right;">

              <h1 style="color:#f8fafc; font-size:22px; font-weight:bold; margin:0;">
                مرحباً، ${newUser.first_name || 'بك'}
              </h1>

              <p style="color:#cbd5e1; font-size:15px; line-height:1.8; margin:15px 0 0 0;">
                نحن متحمسون لانضمامك إلينا! يرجى استخدام رمز التحقق أدناه لتأكيد هويتك وإتمام عملية التسجيل في منصة <strong>Busly</strong>.
              </p>

            </td>
          </tr>

          <!-- OTP -->
          <tr>
            <td align="center" style="padding:30px 40px;">

              <div style="background-color:#334155; border-radius:20px; padding:35px 15px; border:1px solid #475569;">

                <div style="margin-bottom:25px; color:#818cf8; font-weight:bold; font-size:14px; letter-spacing:1px;">
                  رمز التحقق (OTP)
                </div>

                <!-- التعديل هنا -->
                <div
                  class="otp-box"
                  style="
                    width:260px;
                    height:58px;
                    line-height:58px;
                    background-color:#1e293b;
                    color:#ffffff;
                    border:1px solid #6366f1;
                    border-radius:12px;
                    font-size:28px;
                    font-weight:bold;
                    text-align:center;
                    letter-spacing:12px;
                    direction:ltr;
                    margin:auto;
                    box-shadow:0 4px 6px rgba(0,0,0,0.2);
                    user-select:all;
                  ">
                  ${otp}
                </div>

                <div style="margin-top:25px; color:#94a3b8; font-size:13px;">
                  الرمز صالح لمدة <span style="color:#fb7185; font-weight:bold;">دقيقتين</span> فقط
                </div>

              </div>

            </td>
          </tr>

          <!-- Security -->
          <tr>
            <td class="inner-padding" style="padding:0 40px 40px 40px;">

              <table width="100%" border="0" cellpadding="0" cellspacing="0"
                style="background-color:rgba(244,63,94,0.1); border-right:4px solid #f43f5e; border-radius:8px;">

                <tr>
                  <td style="padding:16px 20px; text-align:right;">

                    <div style="color:#fb7185; font-size:14px; font-weight:bold; margin-bottom:5px;">
                      ⚠️ تنبيه أمني هام
                    </div>

                    <div style="color:#e2e8f0; font-size:13px; line-height:1.6;">
                      لا تشارك هذا الرمز مع أي شخص. فريق Busly لن يطلب منك الكود عبر الهاتف أو البريد الإلكتروني.
                    </div>

                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:35px 40px; background-color:#0f172a; text-align:center;">

              <div style="color:#f8fafc; font-size:14px; font-weight:bold; margin-bottom:8px;">
                هل تواجه مشكلة؟
              </div>

              <div style="color:#64748b; font-size:12px; margin-bottom:20px;">
                تواصل معنا عبر البريد الإلكتروني للدعم الفني
              </div>

              <div style="border-top:1px solid #1e293b; padding-top:20px;">
                <span style="color:#475569; font-size:11px; letter-spacing:0.5px;">
                  &copy; 2026 BUSLY. جميع الحقوق محفوظة.
                </span>
              </div>

            </td>
          </tr>

        </table>

        <p style="margin-top:25px; color:#475569; font-size:11px; text-align:center;">
          هذه رسالة تلقائية من نظام Busly، يرجى عدم الرد.
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
`
  });

  return otp;
};