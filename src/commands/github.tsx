import {userData} from '../config/user-data'
import {createUrlCommand} from '../utils/create-url-command'

export const githubCommand = createUrlCommand('github', userData.github, 'GitHub profile')
