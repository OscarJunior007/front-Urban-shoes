import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import { BASE_URL } from '@/router/baseUrl'
interface Izapato {
    genero: string;
    marca: string;
    precioVenta: number;
    referencia: string
    talla: string
    color: number;
}

interface IzapatoProv {
    marca: string
    talla: string
    sexo: string
    precioUnitario: number
}
interface histoCompras {
    cantidadProductosCliente: number
    productos: Izapato[]
    fecha: string
    id_vendedor: string
    abono: number
    pago: number
    subtotal: number
    totalPagar: number
}
interface Icomprador {
    id:string
    nombre: string;
    telefonoPersona: string;
    direccionPersona: string;
    documentoPersona: string;
    productos?: Izapato[]
}

interface Ipedido {
    vendedorId: string;
    fechaPedido: string;
    nombreVendedor: string
    notas: string;
    total: number;
    cantidadProductos: number;
    compradores: Icomprador[];
    subtotal: number;

}

interface IcardPedido extends Ipedido {
    id: string;
    estado: string;

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
    allPedidos: IcardPedido[] 

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
export const usePedidosStore = defineStore('Pedidos', {
    state: (): IState => ({
        pedidoObj: {
            vendedorId: "",
            fechaPedido: new Date().toISOString(),
            notas: "",
            cantidadProductos: 0,
            nombreVendedor: "",
            total: 0,
            compradores: [],
            subtotal: 0


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
        nombreVendedor: "",
        allPedidos: []
    }),
    actions: {
        async crearPedido(nombreVendedor: string, idVendedor: string, path: string): Promise<boolean> {
            if (path == "/RealizarPedido") {
         
                this.pedidoObj.vendedorId = idVendedor;
                this.pedidoObj.nombreVendedor = nombreVendedor;
                this.pedidoObj.cantidadProductos = this.getCantidadTotalProductosVenta();
                this.pedidoObj.subtotal = this.getSubTotalPedido();

                this.pedidoObj.compradores.forEach(comprador => {
                    if (Array.isArray(comprador.productos) && comprador.productos.length > 0) {
                        comprador.productos.forEach(zapato => {
                            zapato.precioVenta = parseFloat(String(zapato.precioVenta));
                        });
                    }
                });

                try {
                    const response = await axios.post(`${BASE_URL}pedidos/vendedor`, this.pedidoObj)
                    this.mensaje = "Pedido realizado correctamente";
                    console.log(response.data)
                    if (response.data.status === 201 || response.status === 201) {
                        this.pedidoObj.subtotal = 0
                        this.pedidoObj.total = 0

                        return true;
                         
                    }
                    return false;
                } catch (error: any) {
                    console.log("cantidad de productos: ", this.pedidoObj.cantidadProductos)
                    if (error.response && error.response.status) {
                        console.log(error.response.status)
                    }
                    throw error
                }
            }
            return false;
        },
        agregarComprador(dataCliente: ICliente) {
            this.pedidoObj.compradores.forEach((cliente) =>{
                if(cliente.documentoPersona === dataCliente.documentoPersona) {
                    this.mensaje = "El cliente ya existe en el pedido";
                    return;
                }
                
          })
            this.pedidoObj.compradores.push({
                id: dataCliente.id,
                nombre: dataCliente.nombre,
                telefonoPersona: dataCliente.telefonoPersona,
                direccionPersona: dataCliente.direccionPersona,
                documentoPersona: dataCliente.documentoPersona,
                productos: []
            });
            this.mensaje = "Cliente agregado al pedido";
        },

        agregarZapato(index: number | null, path: string, obj: Izapato) {
            console.log("path que llega: ", path)
            if (path == "/RealizarPedido") {
                if (index === null || index === undefined) {
                    this.mensaje = "No se puede agregar zapato: index no definido";
                    return;
                }
                if (!Array.isArray(this.pedidoObj.compradores[index].productos)) {
                    this.pedidoObj.compradores[index].productos = [];
                }
                this.pedidoObj.compradores[index].productos.push(obj);
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
        // zapatosClientes(index: number): any[] {
        //     return Array.isArray(this.pedidoObj.compradores?.[index]?.zapatos)
        //         ? this.pedidoObj.compradores[index].zapatos
        //         : [];
        // },
        async getAllPedidos() {
            try {
                const response = await axios.get(`${BASE_URL}api/pedidos`)
                console.log(response.data)

                
                this.allPedidos = [...response.data.inventario];
                    
                console.log("array pedidos:",this.allPedidos)
                return;
                
            } catch (error: any) {
                console.error("Error al obtener los pedidos:", error);
                this.mensaje = error.response?.data?.message || "Error al obtener los pedidos";
                throw error;
            }
        },
        eliminarCliente(index: number) {
            this.pedidoObj.compradores.splice(index, 1)
        },
        eliminarZapatoCliente(index: number, indexCliente: number) {
            if (Array.isArray(this.pedidoObj.compradores[indexCliente].productos)) {
                this.pedidoObj.compradores[indexCliente].productos.splice(index, 1)
            }
        },
        getCantidadTotalProductosVenta(): number {
            return this.pedidoObj.compradores.reduce(
                (total, comprador) => total + (Array.isArray(comprador.productos) ? comprador.productos.length : 0),
                0
            );
        },
        getSubTotalPedido(): number {
            return this.pedidoObj.compradores.reduce(
                (total, comprador) =>
                    total + (Array.isArray(comprador.productos)
                        ? comprador.productos.reduce((sum, producto) => sum + (producto.precioVenta || 0), 0)
                        : 0),
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
