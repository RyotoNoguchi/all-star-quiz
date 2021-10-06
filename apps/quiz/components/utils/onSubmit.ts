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

const onSubmit = (v: FormValueType, onSubmitProps: FormikProps<FormValueType>): void => {
  db.collection('questions').add({
    questionId: v.questionId,
    question: v.question,
    correctAnswer: v.answer,
    choices: v.choices
  })
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm()
};

export default onSubmit

export const handleUpdate = async (v: FormValueType, onSubmitProps: FormikProps<FormValueType>) => {
  const docs = await db.collection('questions').where('questionId', '==', v.questionId).get()

  const docId: string[] = []
  docs.forEach(doc => {
    docId.push(doc.id)
  })
  console.log(docId[0]);
    
  db.collection('questions').doc(docId[0]).set({
    questionId: v.questionId,
    question: v.question,
    correctAnswer: v.answer,
    choices: v.choices
  })
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm() 
}