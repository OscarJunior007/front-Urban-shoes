import axios from 'axios';
import { defineStore } from 'pinia';

interface Iinventario {

    precioProveedor: number
    genero: string
    talla: string[]
    marca: string
    referencia: string
    precioVenta: number
    color:string[]
    imagenes:string[]
}


interface ICarritoItem {
    genero: string;
    marca: string;
    referencia: string;
    precioVenta: number;
    talla: string;
    color?: string; 
}

interface Istate {
    inventarioObj: Iinventario
    mensaje: string
    inventario?: Iinventario[]
    carrito: ICarritoItem[]
}

export const useInventarioStore = defineStore('Inventario', {
    state: (): Istate => ({
        inventarioObj: {

            precioProveedor: 0,
            genero: "",
            talla: [],
            marca: "",
            referencia: "",
            precioVenta: 1000,
            color:[],
            imagenes:[]


        },
        mensaje: "",
        inventario: [],
        carrito:[]

       

    }),
    actions: {
        async guarInventario() {
            try {
                const response = await axios.post("http://localhost:8000/api/zapatos/inventario", this.inventarioObj)

                console.log("data del response: ", response.data)
                this.mensaje = response.data?.message ?? "Zapato ingresado exitosamente"
            }
            catch (error: any) {
                this.mensaje = error.response.detail?.message ?? "La referencia que intenta ingresar, ya existe"

                throw error.response.data
            }

        },

        async getInventario() {
            try {
                const response = await axios.get("http://localhost:8000/api/zapatos")
                console.log(response.data.inventario)
                this.inventario = response.data.inventario
                this.mensaje = response.data?.message ?? "Inventario extraido"

            } catch (error:any) {
                this.mensaje = error.response.detail?.message ?? "La referencia que intenta ingresar, ya existe"

                throw error.response.data
            }
        }
    },
    persist:true
});
