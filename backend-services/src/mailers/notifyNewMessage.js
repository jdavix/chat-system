import transport from '../config/nodemailer';
import env from '../config/env';

const notifyNewMessage = async (params) => {
  // send mail with defined transport object
  const message = await transport.sendMail({
    from: '"Jose from Chat System" <jose@chatsystemjose.com>', // sender address
    to: params.to, // list of receivers
    subject: `New Message from ${params.from}`, // Subject line
    html: `<p>${params.text}</p>
          `, // html body
  });
  console.log(`notifyNewMessage mail sent to ${params.to}`);
  return message;
};

export default notifyNewMessage;