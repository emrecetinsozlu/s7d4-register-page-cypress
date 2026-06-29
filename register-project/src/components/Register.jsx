



import {Form,FormGroup,Label,Input,Button,Card,CardBody, CardHeader, CardFooter,FormFeedback} from 'reactstrap'
import {useEffect, useState} from 'react'
import axios from 'axios'
const initialValues = {
  ad:"",
  soyad:"",
  email:"",
  password:"",
}

export const errorMessages = {
  ad:"Adınızı en az 3 karakter giriniz.",
  soyad:"Soyadınızı en az 3 karakter giriniz.",
  email:"Geçerli bir email adresi giriniz.",
  password:"En az 8 karakter, en az bir büyük harf, en az bir küçük harf, en az bir sembol ve rakam içermelidir."
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

//api 

export default function Register() {


  const [id,setId] = useState("");

  const [formData,setFormData] = useState(initialValues)

  const [errors,setErrors] = useState({
  ad:false,
  soyad:false,
  email:false,
  password:false,
  })

  
  /*
  const isValid = 
  formData.ad.trim().length >= 3 &&
  formData.soyad.trim().length >= 3 &&
  emailRegex.test(formData.email) &&
  strongPasswordRegex.test(formData.password);
  */

  const [isValid,setIsValid] = useState(false)
  useEffect(() => {
    if(
    formData.ad.trim().length >= 3 && 
    formData.soyad.trim().length >= 3 && 
    emailRegex.test(formData.email) &&
    strongPasswordRegex.test(formData.password)
    ){
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  },[formData])

  const handleChange = (event) => {
    const {name,value} = event.target;
    setFormData({...formData,[name]:value})
    
    
    if(name == "ad" || name =="soyad"){
      if(value.trim().length>=3){
        setErrors({...errors, [name]:false})
      } else {
        setErrors({...errors,[name]:true})
      }
    }
    if(name == "email"){
      if(emailRegex.test(value)){
        setErrors({...errors,[name]:false})
      } else {
        setErrors({...errors,[name]:true})
      }
    }
   
    if(name == "password"){
      if(strongPasswordRegex.test(value)){
        setErrors({...errors,[name]:false})
      } else {
        setErrors({...errors,[name]:true})
      }
    }



  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!isValid) return;
     axios.post(
      "https://reqres.in/api/users",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "free_user_3Fo8QELSwagBhsDUFXjtdzCdMWo",
        },
      }
    )
    .then((response) => {
      console.log(response.data)
      setId(response.data.id);
      setFormData(initialValues)

    })
    .catch((err) => {
      console.warn(err);
    })
  }

  return (
    <Card>
      <CardHeader className="text-center">Kayıt Formu</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for='exampleEmail'>Ad</Label>
          <Input
            id='ad'
            name='ad'
            placeholder='adını gir'
            type='text'
            className="text-center"
            onChange = {handleChange}
            value = {formData.ad}
            invalid={errors.ad}
            data-cy ="ad-input"
          />
          {errors.ad &&<FormFeedback data-cy="error-message">{errorMessages.ad}</FormFeedback>}
            
          
        </FormGroup>
        <FormGroup>
          <Label for='soyad'>Soyad:</Label>
          <Input
            id='soyad'
            name='soyad'
            placeholder='soyadını gir'
            type='text'
            className="text-center"
            onChange = {handleChange}
            value = {formData.soyad}
            invalid={errors.soyad}
            data-cy = "soyad-input"
          />
          {errors.soyad &&<FormFeedback data-cy="error-message">{errorMessages.soyad}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for='email'>Email:</Label>
          <Input
            id='email'
            name='email'
            placeholder='emailini gir'
            type='email'
            className="text-center"
            onChange = {handleChange}
            value = {formData.email}
            invalid={errors.email}
            data-cy = "email-input"
          />
          {errors.email &&<FormFeedback data-cy="error-message">{errorMessages.email}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password:</Label>
          <Input
            id='password'
            name='password'
            placeholder='password secin'
            type='password'
            className="text-center"
            onChange = {handleChange}
            value = {formData.password}
            invalid={errors.password}
            data-cy="password-input"
          />
          {errors.password &&<FormFeedback data-cy="error-message">{errorMessages.password}</FormFeedback>}
        </FormGroup>
     
      
        <Button className="d-block mx-auto mt-3" disabled={!isValid} data-cy="submit-button">Kayıt ol</Button>
      </Form>
    </CardBody>
     {id &&
    <CardFooter className="text-center"><p data-cy = "id-output">Kayıt başarılı! ID: {id}</p></CardFooter>}

    </Card>

  )
}
