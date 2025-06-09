import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import { useRoute } from 'vue-router';
import { standardEasing } from 'vuetify/lib/util/easing.mjs';

interface Izapato {
    modelo: string;
    talla: string;
    color: string;
    precio: number;
    // cantidad: number;
}

interface IzapatoProv {
    marca: string
    talla: string
    sexo: string
    precioUnitario: number
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
    nombreVendedor: string
    notas: string;
    total: number;
    cantidadZapatos: number;
    compradores: Icomprador[];
}
interface IpedidoProv {
    personRealizoPedido: string
    proveedorId: string
    fechaPedido: string;
    estado: string,
    direccionEnvio: string,
    notas: string,
    cantidadZapatos: number,
    zapatos: IzapatoProv[]
    subtotal: number,
    costoEnvio: number,
    total: number,
    historialEstados: Iestados[]

}

interface Iestados {
    estado: string
    fecha: string
}
interface IState {
    pedidoObj: Ipedido;
    mensaje: string;
    idVendedor: string;
    nombreVendedor: string
    pedidoProvObj: IpedidoProv


}

export const usePedidosStore = defineStore('Pedidos', {
    state: (): IState => ({
        pedidoObj: {
            vendedorId: "ASD",
            fechaPedido: new Date().toISOString(),
            notas: "",
            cantidadZapatos: 0,
            nombreVendedor: "",
            total: 0,
            compradores: [],
        },
        pedidoProvObj: {
            personRealizoPedido: "",
            proveedorId: "",
            fechaPedido: "",
            estado: "Realizado - por enviar",
            direccionEnvio: "Calle 32 #12-32",
            notas: "",
            cantidadZapatos: 0,
            zapatos: [],
            subtotal: 0,
            costoEnvio: 0,
            total: 0,
            historialEstados: []
        },
        mensaje: "",
        idVendedor: "",
        nombreVendedor: ""
    }),
    actions: {
        async crearPedido(nombre: string, id: string, path: string) {


            if (path == "/RealizarPedido") {
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

            }

            console.log(nombre, id)
            this.pedidoProvObj.personRealizoPedido = nombre
            this.pedidoProvObj.proveedorId = id


            try {
                const response = await axios.post("http://localhost:8000/pedidos/proveedor", this.pedidoProvObj)
                this.mensaje = "Pedido realizado correctamente";
                console.log(response.data)
                return response.data

            } catch (error: any) {
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

        agregarZapato(index: number | null, path: string) {
            console.log("path que llega: ", path)
            if (path == "/RealizarPedido") {
                if (index === null || index === undefined) {
                    this.mensaje = "No se puede agregar zapato: index no definido";
                    return;
                }
                let cantidad = this.pedidoObj.compradores[index].cantidadZapatos;
                let nombreCliente = this.pedidoObj.compradores[index].nombre;
                if (cantidad === 0) {
                    this.mensaje = `te faltan la cantidad de zapatos para el cliente ${nombreCliente}`;
                    console.log(this.mensaje);
                    return;
                }
                this.pedidoObj.compradores[index].zapatos = [];
                for (let i = 0; i < cantidad; i++) {
                    this.pedidoObj.compradores[index].zapatos.push({
                        modelo: "",
                        talla: "",
                        color: "",
                        precio: 0,
                    });
                }
                return;
            }

            let cantidad = this.pedidoProvObj.cantidadZapatos;
            if (cantidad === 0) {
                this.mensaje = `te faltan la cantidad de zapatos del pedido`;
                console.log(this.mensaje);
                return;
            }
            try {
                this.pedidoProvObj.zapatos = [];
                for (let i = 0; i < cantidad; i++) {
                    this.pedidoProvObj.zapatos.push({
                        marca: "",
                        talla: "",
                        sexo: "",
                        precioUnitario: 0,
                    });
                }
            } catch (error) {
                throw error;
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
    getters: {
        subtotalPedidoProveedor(state): number {
            return state.pedidoProvObj.zapatos.reduce(
                (sum, zapato) => sum + (zapato.precioUnitario || 0),
                0
            );
        },
        totalPedidoProveedor(state): number {
            const subtotalZapatos = state.pedidoProvObj.zapatos.reduce(
                (sum, zapato) => sum + (zapato.precioUnitario || 0),
                0
            );
            return subtotalZapatos + (state.pedidoProvObj.costoEnvio || 0);
        },
    },
    persist: true,

})
