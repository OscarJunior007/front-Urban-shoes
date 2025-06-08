import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'


interface Izapato {
    modelo: string;
    talla: string;
    color: string;
    precio: number;
    // cantidad: number;
}

interface Icomprador {
    nombre: string;
    telefonoPersona: string;
    direccionPersona: string;
    documentoPersona: string;
    cantidadZapatos: number;
    abono: number;
    pago: boolean;
    total: number;
    zapatos: Izapato[];
}

interface Ipedido {
    vendedorId: string;
    fechaPedido: string;
    nombreVendedor:string
    notas: string;
    total:Number;
    cantidadZapatos: number;
    compradores: Icomprador[];
}

interface IState {
    pedidoObj: Ipedido;
    mensaje: string;
    idVendedor:string;
    nombreVendedor:string

}

export const usePedidosStore = defineStore('Pedidos', {
    state: (): IState => ({
        pedidoObj: {
            vendedorId: "ASD",
            fechaPedido: new Date().toISOString(),
            notas: "",
            cantidadZapatos: 0,
            nombreVendedor:"",
            total: 0,
            compradores: [],
        },
        mensaje: "",
        idVendedor:"",
        nombreVendedor:""
    }),
    actions: {
        async crearPedido(nombre:string, id:string): Promise<AxiosResponse> {
            // console.log("nombre que llego: ",nombre)
            // console.log("id que llego: ",id)

            this.pedidoObj.vendedorId = id;
            this.pedidoObj.nombreVendedor = nombre;
            this.pedidoObj.cantidadZapatos = parseFloat(String(this.getCantidadTotalZapatos()));
            this.pedidoObj.total = parseFloat(String(this.getTotalPedido()));
            this.pedidoObj.compradores.forEach(comprador => {
                comprador.abono = parseFloat(String(comprador.abono));
                comprador.zapatos.forEach(zapato => {
                    zapato.precio = parseFloat(String(zapato.precio));
                });
                const totalZapatos = comprador.zapatos.reduce((sum, zapato) => sum + (zapato.precio || 0), 0);
                comprador.total = parseFloat((totalZapatos - (comprador.abono || 0)).toFixed(2));
            });
           
            try {
                const response = await axios.post("http://localhost:8000/pedidos/vendedor", this.pedidoObj)

                this.mensaje = "Pedido realizado correctamente";
                console.log(response.data)
                return response.data

            } catch (error: any) {
                console.log(error.response.status)
                throw error

            }

        },
        agregarComprador() {
            this.pedidoObj.compradores.push({
                nombre: "",
                telefonoPersona: "",
                direccionPersona: "",
                documentoPersona: "",
                cantidadZapatos: 0,
                abono: 0,
                pago: false,
                total: 0,
                zapatos: [],
            })
        },
        agregarZapato(index: number) {
            let cantidad = this.pedidoObj.compradores[index].cantidadZapatos;
            let nombreCliente = this.pedidoObj.compradores[index].nombre;
            if (cantidad == 0) {
                this.mensaje = `te faltan la cantidad de zapatos para el cliente ${nombreCliente}`
                console.log(this.mensaje)
                return

            }
            // this.mensaje = ""
            this.pedidoObj.compradores[index].zapatos = [];
            for (let i = 0; i < cantidad; i++) {
                this.pedidoObj.compradores[index].zapatos.push({
                    modelo: "",
                    talla: "",
                    color: "",
                    precio: 0,
                    // cantidad: 1,
                });
            }
        },
        eliminarCliente(index: number) {
            this.pedidoObj.compradores.splice(index, 1)
        },
        getCantidadTotalZapatos(): number {
            return this.pedidoObj.compradores.reduce(
                (total, comprador) => total + comprador.zapatos.length,
                0
            );
        },
        getTotalPedido(): number {
            return this.pedidoObj.compradores.reduce(
                (total, comprador) =>
                    total + comprador.zapatos.reduce((sum, zapato) => sum + (zapato.precio || 0), 0),
                0
            );
        },

    },
    persist: true
})