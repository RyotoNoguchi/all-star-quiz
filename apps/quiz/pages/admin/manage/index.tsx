import firebase from "firebase/clientApp";
import 'firebase/storage';
import { useEffect, useState } from "react";
const db = firebase.firestore()

const Manage: React.FC = () => {
  const [fileUrl, setFileUrl] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.currentTarget.files[0]
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(`img/${file.name}`) // ファイルを格納するパスを指定
    await fileRef.put(file)
    const newFileUrl = await fileRef.getDownloadURL()
    setFileUrl(newFileUrl)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => { 
    e.preventDefault()
    const fileName = e.currentTarget.pictureName.value
    if (!fileName) {
      return
    }
    db.collection("images").doc(fileName).set({
      name: fileName,
      url: fileUrl
    })
  }

  useEffect(() => {
    const fetchImg = async () => {
      const imageCollection = await db.collection("images").get()
      const logoURL = imageCollection.docs.find(d => d.data().name === 'ロゴ').data().url
      setLogoUrl(logoURL)
      console.log(logoURL);
    } 
    fetchImg()
  }, [])
  
  return (
    <>
      <form action="submit" onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange}/> 
        <input type="text" name="pictureName" placeholder="picture name"/>
        <button type="submit">Submit</button>
      </form>
      <ul>
        <li>{logoUrl}</li>
      </ul>
    </>
  );
};

export default Manage;
