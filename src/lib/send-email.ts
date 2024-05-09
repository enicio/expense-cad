import { randomInt } from 'crypto'
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
    let x = true
    const random = randomInt(1, 10)
    console.log(`Random: ${random}`)
    random > 5 ? (x = true) : (x = false)

    if (x) {
      setTimeout(() => {
        resolve('Email enviado com sucesso!')
      }, 3000)
    } else {
      reject(new Error('Erro ao enviar email!'))
    }
  })
  /* console.log('----------------------------------------------------')
  console.log('Simulando envio de email:')
  console.log('----------------------------------------------------')
  console.log(`De: ${emailData.from}`)
  console.log(`Para: ${emailData.to}`)
  console.log(`Assunto: ${emailData.subject}`)
  console.log(`Conteúdo: ${emailData.text}`)
  console.log('----------------------------------------------------')
*/
  return sendMailPromisse.then((res) => {
    console.log(res)
  })
}
