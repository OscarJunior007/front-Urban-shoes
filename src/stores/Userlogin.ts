import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
interface IUserLogin {
    username: string
    password: string
}
interface iDataUser {
    id: string
    email: string
    first_name: string
    last_name: string
    rol: string
    estado: string  
}

interface IUserRegister {
    email: string
    password: string
    rol: string
    first_name: string
    last_name: string
    estado: string
}
interface IState {
    objLogin: IUserLogin
    // baseUrl: string
    accessToken?: string
    loading?: boolean
    objUser?: iDataUser
    router?: typeof useRouter
    objUserRegister: IUserRegister
    userList:[iDataUser] | undefined
}



export const useUserLoginStore = defineStore('userLogin', {
    state: (): IState => ({
        objLogin: { username: '', password: '' },
        // baseUrl: '',
        accessToken: undefined,
        loading: false,
        objUserRegister: { email: '', password: '', rol: 'VENDEDOR', first_name: '', last_name: '', estado: 'ACTIVO' },
        objUser: {
            id: '',
            email: '',
            first_name: '',
            last_name: '',
            rol: '',         // o un rol por defecto, por ejemplo: 'INVITADO'
            estado: ''
        },
        userList: undefined
    }),
    actions: {
        async login(): Promise<void> {
            this.loading = true
            try {
                const payload = new URLSearchParams()
                payload.append('username', this.objLogin.username)
                payload.append('password', this.objLogin.password)

                const response = await axios.post(`http://localhost:8000/api/users/login`, payload, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                console.log('Login response:', response.data)
                this.accessToken = response.data.access_token
            } catch (error) {
                throw error
            } finally {
                this.loading = false
                this.objLogin.username = ''
                this.objLogin.password = ''
            }
        },
        async register(): Promise<AxiosResponse> {
            try {
                const response = await axios.post(`http://localhost:8000/api/users/signup`, this.objUserRegister, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.accessToken}` 
                    },
                })
                this.objUserRegister = { email: '', password: '', rol: 'VENDEDOR', first_name: '', last_name: '', estado: 'ACTIVO' }
                return response
            } catch (error) {
                throw error
            }
        },
        async getMe(): Promise<AxiosResponse> {
            try {
                const response = await axios.get(`http://localhost:8000/api/me`, {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`
                    }
                })
                this.objUser = response.data
                return response
            } catch (error) {
                throw error
            }
        },
        logout(router: any): void {
            this.accessToken = undefined
            this.objUser = undefined
            this.userList = undefined
            this.objLogin = { username: '', password: '' }

            localStorage.clear()
            router.push('/')
        },
        async getAllUsers(): Promise<AxiosResponse> {   
            try {
                const response = await axios.get(`http://localhost:8000/api/users`, {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`
                    }
                })
                this.userList = response.data.users
                console.log('User List:', this.userList)
                return response
            } catch (error) {
                throw error
            }
        }   
    },
    getters: {
        totalUsersActivos: (state) => {
            return state.userList ? state.userList.filter(user => user.estado === 'ACTIVO').length : 0
        }
    },
    persist: true
})
