import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormTextField from '../../atoms/FormTextField';
import FormPaper from '../../atoms/FormPaper';
import { Formik, Form, FastField } from 'formik';
import { ChangeEvent, useState } from 'react';
import { onSubmit } from '../../utils/onSubmit';
import validationSchema from '../../utils/validationSchema';
import { Answer } from "../../types/question";
import { Question } from '../../types/question'

const EditQuestion: React.FC<{q: Question}> = ({q}) => {
  const [answer, setAnswer] = useState<Answer>(q.answer as Answer);
  const choices: Answer[] = ['A', 'B', 'C', 'D'];
  const initialValues = {
    questionId: q.id,
    question: q.question,
    answer: answer,
    choices: q.choices
  };
  return (
    <>
      <FormPaper>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {(formik) => {
            return (
              <Form style={{ padding: '12px' }}>
                <FastField id="questionId" name="questionId" label="問題番号" disabled component={FormTextField} style={{marginRight: '20px'}}/>

                <FastField id="answerSelector" label="正解" name="answer" component={FormTextField} select 
                onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setAnswer(e.currentTarget.value as Answer)}>
                  {choices.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                </FastField>

                <FastField id="question" name="question" label="問題文" fullWidth multiline maxRows={4} component={FormTextField}/>

                <FastField id="choiceA" name="choices.A" label="選択肢A" fullWidth component={FormTextField}/>
                <FastField id="choiceB" name="choices.B" label="選択肢B" fullWidth component={FormTextField}/>
                <FastField id="choiceC" name="choices.C" label="選択肢C" fullWidth component={FormTextField}/>
                <FastField id="choiceD" name="choices.D" label="選択肢D" fullWidth component={FormTextField}/>

                <Button variant="contained" type="submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting} style={{marginRight: '8px'}}>編集</Button>
                <Button type="reset" color="secondary" variant="contained" disabled={!formik.dirty || formik.isSubmitting}>リセット</Button>
              </Form>
            );
          }}
        </Formik>
      </FormPaper>
    </>
  )
}

export default EditQuestion