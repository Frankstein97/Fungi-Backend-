// Todo esto servira para poder obtener en que directorio estamos
import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//esto sirve para el hasheo de password
import bcrypt from 'bcrypt';
export const createHash = password =>
bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => 
bcrypt.compareSync(password, user.password);

export default __dirname