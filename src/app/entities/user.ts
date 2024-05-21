import { Credito } from "../interfaces/credito";

export class User{

    public uid? : string;
    public email : string;
    public nombre: string;
    public apellido: string;
    public edad: number;
    public dni: string;
    public isAdmin : boolean;
    public imagenes : string[];
    public typename : string;
    public credits : {credito : Credito, veces : number}[];

    constructor(email : string, nombre: string,apellido: string,edad: number, dni : string, imagenes : string[], isAdmin : boolean = false, uid? : string, typename : 'User' | 'Admin' = "User", credits : {credito : Credito, veces : number}[] = []){
        this.uid = uid;
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.imagenes = imagenes;
        this.isAdmin = isAdmin;
        this.typename = typename;
        this.credits = credits;
    }

    static filterPrivate(user : any){
        return Object.fromEntries(
            Object.entries(user)
            .filter(([key]) => !['uid'].includes(key))
        );
    }

    cargarCredito(credito : Credito) : boolean {
        let creditoCargadoConExito = false;
        let creditoExiste = false;
        if (this.credits){
            let c = this.credits.find((c)=> c.credito.id === credito.id);
            if (c){
                creditoExiste = true;
                if ((c.veces < 1 && !this.isAdmin) || c.veces < 2 && this.isAdmin){
                    creditoCargadoConExito = true;
                    let i = this.credits.findIndex(cr => cr.credito.id === credito.id);
                    this.credits[i].veces++;
                }
            }
        }
        
        if(!creditoExiste){
            this.credits.push({credito : credito, veces : 1});
            creditoCargadoConExito = true;
        }
        return creditoCargadoConExito;
    }
}


