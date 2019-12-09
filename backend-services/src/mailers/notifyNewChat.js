import transport from '../config/nodemailer';
import env from '../config/env';

const notifyNewChat = (params) => {
  // send mail with defined transport object
  const message = transport.sendMail({
    from: '"Jose from Chat System" <jose@chatsystemjose.com>', // sender address
    to: params.to, // list of receivers
    subject: 'New Chat invitation', // Subject line
    html: `<p>You have been invited to a new Chat conversation named "${params.chat_title}", Sign up or sign in through the link below to contact your friends.</p>
           <p><a href="${env.site_url}">${env.site_url}</a></p>
          `, // html body
  });
  console.log(`NotifyNewChat mail sent to ${params.to}`);
};

export default notifyNewChat;
