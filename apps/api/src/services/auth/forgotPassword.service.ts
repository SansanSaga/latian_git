import { BASE_URL_FE, JWT_SECRET } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';

export const forgotPasswordService = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email, provider: 'CREDENTIALS' },
    });

    if (!user) {
      throw new Error('Invalid email address');
    }

    const token = sign({ id: user.id }, JWT_SECRET!, { expiresIn: '30m' });

    const link = BASE_URL_FE + `/reset-password/${token}`;

    await transporter.sendMail({
      to: email,
      subject: 'Link reset password',
      html: `<a href="${link}" target="_blank">Reset password here</a>`,
    });

    return {
      message: "Send email success",
      token
    }

  } catch (error) {
    throw error;
  }
};
