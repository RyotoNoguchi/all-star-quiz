import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormTextField from '../../atoms/FormTextField';
import FormPaper from '../../atoms/FormPaper';
import { Formik, Form, FastField } from 'formik';
import { ChangeEvent, useState } from 'react';
import onSubmit from '../../utils/onSubmit';
import validationSchema from '../../utils/validationSchema';
import { Answer } from "../../types/question";
import { Question } from '../../types/question'

const EditQuestion: React.FC<{q: Question}> = ({q}) => {
  const [answer, setAnswer] = useState<Answer>(q.answer as Answer);
  const choices: Answer[] = ['A', 'B', 'C', 'D'];
  const [isDisabled, setIsDisabled] = useState(true)
  const initialValues = {
    questionId: q.id,
    question: q.question,
    answer: answer,
    choices: q.choices
  };
  // TODO setIsDisabledが反映されず、編集モードに切り替わらない
  console.log('isDisabled', isDisabled);
  

  return (
    <>
      <FormPaper>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {(formik) => {
            return (
              <Form style={{ padding: '12px' }}>
                <FastField id="questionId" name="questionId" label="問題番号" disabled component={FormTextField}/>

                <FastField id="answerSelector" label="正解" name="answer" disabled={isDisabled} component={FormTextField} select 
                onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setAnswer(e.currentTarget.value as Answer)}>
                  {choices.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                </FastField>

                <FastField id="question" name="question" label="問題文" fullWidth multiline maxRows={4} disabled={isDisabled} component={FormTextField}/>

                <FastField id="choiceA" name="choices.A" label="選択肢A" fullWidth disabled={isDisabled} component={FormTextField}/>
                <FastField id="choiceB" name="choices.B" label="選択肢B" fullWidth disabled={isDisabled} component={FormTextField}/>
                <FastField id="choiceC" name="choices.C" label="選択肢C" fullWidth disabled={isDisabled} component={FormTextField}/>
                <FastField id="choiceD" name="choices.D" label="選択肢D" fullWidth disabled={isDisabled} component={FormTextField}/>

                <Button type="reset" color="secondary" variant="contained" onClick={()=>setIsDisabled(false)} style={{marginRight: '8px'}}>編集</Button>
                <Button variant="contained" type="submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting} style={{marginRight: '8px'}}>送信</Button>
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