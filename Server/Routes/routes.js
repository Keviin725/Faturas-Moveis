require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// criacao do user
router.post('/auth/register', async(req, res) =>{

    //req.body
    const{name, email, password, confirmPassword} = req.body

    //Validations
    if(!name){
        return res.status(422).json({error: 'O nome e obrigatorio'})
        
    }
    if(!email){
        return res.status(422).json({error: 'O email e obrigatorio'})
        
    }
    
    if(!password){
        return res.status(422).json({error: 'A senha e obrigatoria'})
        
    }
    if (password !== confirmPassword) {
        return res.status(422).json({error: 'As senhas devem ser iguais'})
    }

    // Verificar se o user existe
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(422).json({error: 'Este email ja existe, utilize outro'})
    }

    // Criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    console.log(passwordHash)
    
    // objeto que recebe o corpo da requisicao
    const person = new User({
        name,
        email,
        password: passwordHash,
    })

    // create
    try{
        await person.save()
        res.status(201).json({message: 'User Criado com sucesso'})

    }catch(error){
        res.status(500).json({error: error})
    }

})

//Login
router.post('/auth/login', async(req, res) =>{

    const{email, password} = req.body
    
    //validations
    if(!email){
        return res.status(422).json({error: 'O email e obrigatorio'})
        
    }
    if(!password){
        return res.status(422).json({error: 'A senha e obrigatoria'})
        
    }
    // Verificar se o user existe
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(422).json({error: 'user nao encontrado'})
    }

    // password validation
    const verifyPassword = await bcrypt.compare(password, user.password)

    if(!verifyPassword){
        return res.status(404).json({message: 'Password Incorreta'})
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id
        }, secret)

        res.status(200).json(token)
        
    } catch (error) {
       console.log(error)
       res.status(500).json({
        message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
       }) 
    }
})
