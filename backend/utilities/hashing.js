import bcrypt from 'bcrypt';


const saltRounds = 10;

export const pwdHash = async (password)=>{
    const result = await bcrypt.hash(password,saltRounds);
    return result;
}

export const comparePwd = async (userPassword , dbPassword)=>{
    const result = await bcrypt.compare(userPassword,dbPassword)
    return result;

}