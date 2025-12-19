import {userData} from '../config/user-data'
import {createUrlCommand} from '../utils/create-url-command'

export const blogCommand = createUrlCommand('blog', userData.blog, 'development blog')
