import * as nodemailer from "nodemailer";

export const sendEmail = async (recipient: string, url: string, linkText: string) => {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.log(err);
    }

    console.log("Credentials obtained, sending message...");
    console.log(url);
    console.log(account);

    let transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    const message = {
      from: "Sender Name <sender@example.com>",
      to: `Recipient <${recipient}>`,
      subject: "Nodemailer is unicode friendly ✔",
      text: "Hello to myself!",
      html: `
        <html>
        <body>
        <p>Testing sparkpost API</p>
        <a href="${url}">${linkText}</a>
        </body>
        </html>`
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
      }

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });
};
