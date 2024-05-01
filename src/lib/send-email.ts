import { expenseProps } from '../repository/expense-repository'
import { createUserProps } from '../repository/user-repository'

export const sendEmail = async (
  expense: expenseProps,
  user: createUserProps,
) => {
  const emailData = {
    from: 'noreply@seudominio.com.br',
    to: user.email,
    subject: 'Despesa cadastrada com sucesso!',
    text: `Olá ${user.name},

      Sua nova despesa foi cadastrada com sucesso!

      Descrição: ${expense.description}
      Data: ${expense.date}
      Valor: R$ ${expense.amount}

      Atenciosamente,

      Equipe do Sistema de Despesas`,
  }
  const sendMailPromisse = new Promise((resolve, reject) => {
    const x = true

    if (x) {
      setTimeout(() => {
        resolve('Email enviado com sucesso!')
      }, 3000)
    } else {
      reject(new Error('Erro ao enviar email!'))
    }
  })
  console.log('----------------------------------------------------')
  console.log('Simulando envio de email:')
  console.log('----------------------------------------------------')
  console.log(`De: ${emailData.from}`)
  console.log(`Para: ${emailData.to}`)
  console.log(`Assunto: ${emailData.subject}`)
  console.log(`Conteúdo: ${emailData.text}`)
  console.log('----------------------------------------------------')

  return sendMailPromisse.then((res) => {
    console.log(res)
  })
}
