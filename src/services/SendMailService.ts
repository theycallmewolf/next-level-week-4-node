import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {
  
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then(testAccount => {

      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      this.client = transporter;
    })

  }

  async execute(to: string, subject: string, body: string) {
    const message = await this.client.sendMail({
      to, 
      subject,
      html: body,
      from: 'NPS <no-reply@theycallmewolf.com>' 
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }

}
export default new SendMailService();