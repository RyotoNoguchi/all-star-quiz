import { FormikProps } from 'formik';
import firebase from "firebase/clientApp";
const db = firebase.firestore()

type FormValueType = {
  questionId: string;
  question: string;
  answer: string;
  choices: Choices;
};

type Choices = {
  A: string;
  B: string;
  C: string;
  D: string;
};

export const onSubmit = async (v: FormValueType, onSubmitProps: FormikProps<FormValueType>) => {
  const docs = await db.collection('questions').where('questionId', '==', v.questionId).get()
  const docId: string[] = []
  docs.forEach(doc => {
    docId.push(doc.id)
  })
  if (docId[0]) {
    await db.collection('questions').doc(docId[0]).set({
      questionId: v.questionId,
      question: v.question,
      correctAnswer: v.answer,
      choices: v.choices
    })
    alert(`問題${v.questionId}を編集しました。`)
  } else {
    await db.collection('questions').add({
      questionId: v.questionId,
      question: v.question,
      correctAnswer: v.answer,
      choices: v.choices
    })
    alert(`問題${v.questionId}を追加しました。`)
  }
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm() 
}

export default onSubmit