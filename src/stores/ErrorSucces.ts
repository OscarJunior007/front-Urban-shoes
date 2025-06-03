import { defineStore } from "pinia";


interface IErrorSuccessState {
    messageError: string;
    messageSucces:string;
}
export const useErrorSuccessStore = defineStore("errorSuccess", {
    state: (): IErrorSuccessState => ({
        messageError: "",
        messageSucces: ""
    }),
actions: {
    setError(error: string) {
        this.messageError = error;
        this.messageSucces = ""; // Limpia el mensaje de éxito
    },
    setSuccess(success: string) {
        this.messageSucces = success;
        this.messageError = ""; // Limpia el mensaje de error
    },
    clearMessages() {
        this.messageError = ""
        this.messageSucces = ""
    }
},
getters: {
    hasError: (state) => !!state.messageError,
    hasSuccess: (state) => !!state.messageSucces    
}
})