import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { BASE_URL } from '@/router/baseUrl'
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
    objClienteRegister: IClienteRegister
    listClientes?: ICliente[]
    
 
}

interface IClienteRegister{
    id_vendedor: string
    nombre:string
    telefonoPersona:string
    direccionPersona:string
    documentoPersona:string
}

interface ICliente extends IClienteRegister {
    id: string
}
export const useUserLoginStore = defineStore('userLogin', {
    state: (): IState => ({
        objLogin: { username: '', password: '' },
        accessToken: undefined,
        loading: false,
        objUserRegister: { email: '', password: '', rol: 'VENDEDOR', first_name: '', last_name: '', estado: 'ACTIVO' },
        objClienteRegister: { id_vendedor: '', nombre: '', telefonoPersona: '', direccionPersona: '', documentoPersona: '' },
        listClientes: undefined,
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

                const response = await axios.post(`${BASE_URL}api/users/login`, payload, {
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
                const response = await axios.post(`${BASE_URL}api/users/signup`, this.objUserRegister, {
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
                const response = await axios.get(`${BASE_URL}api/me`, {
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

            localStorage.removeItem('userLogin');
            
            localStorage.clear(); 
            router.push('/')
        },
        async getAllUsers(): Promise<AxiosResponse> {   
            try {
                const response = await axios.get(`${BASE_URL}api/users`, {
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
        },
        async editUser(user:iDataUser){
        try{
            const response =  await axios.put(`${BASE_URL}api/users/${user.id}`, user, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.accessToken}`
                }
             
            })
            if (this.userList && response.status == 200) {
                const index = this.userList.findIndex(u => u.id === user.id)
                if (index !== -1) {
                    this.userList[index] = { ...this.userList[index], ...user }
                }
            }
        }catch (error) {
            throw error
        }
    },

    async createCliente(id: string): Promise<AxiosResponse> {
        try {
            if(id === undefined || id === null || id === '') {
                throw new Error('El ID del vendedor no puede estar vacío')
            }

            this.objClienteRegister.id_vendedor = id
            const response = await axios.post(`${BASE_URL}api/users/cliente`, this.objClienteRegister)
            console.log('Cliente creado:', response.data)
            this.objClienteRegister = { id_vendedor: '', nombre: '', telefonoPersona: '', direccionPersona: '', documentoPersona: '' }
            return response
        } catch (error) {
            throw error
        }   
    }, 
    
    async clientesByVendedor(id: string) {
        try {
            if(id === undefined || id === null || id === '') {
                throw new Error('El ID del vendedor no puede estar vacío')
            }

         
            const response = await axios.get(`${BASE_URL}api/users/clientes/vendedor/${id}`)
   
            this.listClientes = response.data
            console.log('Lista de clientes:', this.listClientes)
         
        } catch (error) {
            throw error
        }   
    }, 
    },
    
    getters: {
        totalUsersActivos: (state) => {
            return state.userList ? state.userList.filter(user => user.estado === 'ACTIVO').length : 0
        }
    },
    persist: true
})
