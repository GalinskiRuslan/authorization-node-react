const nodeMailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "hiter_man@mail.ru",
        pass: "eFHs4ktQXy3Nj1kgR0vR",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  async sendActiveEmail(to, link) {
    await this.transporter.sendMail({
      from: `Mailer Test <hiter_man@mail.ru>`,
      to,
      subject: `Активация аккуанта для ресурса ${process.env.API_URL} `,
      text: "",
      html: `<div><h1>Для активации перейдите по ссылке</h1>
              <a href=${link}>ССлКА:${link}</a></div>`,
    });
    console.log(`email :${to} send`);
  }
}

module.exports = new MailService();
