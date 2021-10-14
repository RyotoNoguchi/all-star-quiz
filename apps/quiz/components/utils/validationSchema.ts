import * as yup from 'yup';

yup.addMethod<yup.NumberSchema>(yup.number, 'noWhitespace', function () {
  return this.transform((value, originalValue) => /\s/.test(originalValue) ? NaN : value );
});

const validationSchema = yup.object({
  questionId: yup.number().required('問題番号を入力してください。').integer('問題番号は整数を入力してください').min(1, '問題番号は1以上を入力してください').max(100, '登録できる問題数は100個までです。')?.noWhitespace(),
  // ↑ https://github.com/jquense/yup/issues/312#issuecomment-745034006（TSでのメソッドの定義追加）
  // ↑ https://github.com/jquense/yup/issues/694#issuecomment-663613804（noWhitespace()を追加するコード）
  question: yup.string().strict().trim('スペースは除いてください。').required('問題文を入力してください。'),
  answer: yup.string().required('問題の正解を入力してください。'),
  choices: yup.object({
    A: yup.string().strict().trim('スペースは除いてください。').required('Aに入力してください'),
    B: yup.string().strict().trim('スペースは除いてください。').required('Bに入力してください'),
    C: yup.string().strict().trim('スペースは除いてください。').required('Cに入力してください'),
    D: yup.string().strict().trim('スペースは除いてください。').required('Dに入力してください'),
  }),
});

export default validationSchema