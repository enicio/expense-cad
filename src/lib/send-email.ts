import { expenseProps } from '../repository/expense-repository'
import { createUserProps } from '../repository/user-repository'
import nodemailer from 'nodemailer'
import { getMailClient } from './mail'
import { dayjs } from './dayjs'

export const sendEmail = async (
  expense: expenseProps,
  user: createUserProps,
) => {
  const transporter = await getMailClient()
  const emailData = {
    from: 'jessandro@gmail.com',
    to: user.email,
    subject: 'Despesa cadastrada com sucesso!',
    text: `Olá ${user.name},
      Sua nova despesa foi cadastrada com sucesso!
      Descrição: ${expense.description}
      Data: ${dayjs(expense.date).format('DD/MM/YYYY')}
      Valor: R$ ${expense.amount}
      Atenciosamente,
      Equipe do Sistema de Despesas`,
  }

  const info = await transporter.sendMail(emailData)
  console.log(nodemailer.getTestMessageUrl(info))
  return info
}
